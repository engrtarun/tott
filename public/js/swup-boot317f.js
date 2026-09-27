(function () {
  if (window.__swupBooted) return;
  window.__swupBooted = true;

  var SwupCtor = window.Swup;
  var Progress = window.SwupProgressPlugin;
  var Head = window.SwupHeadPlugin;
  var Scripts = window.SwupScriptsPlugin;
  var Preload = window.SwupPreloadPlugin;
  if (!SwupCtor) return;

  // Soft client-side guard against preload floods / failing origin.
  var preloadGuard = {
    pausedUntil: 0,
    fails: 0,
    windowStart: Date.now(),
    windowCount: 0,
    maxPerMinute: 20,
    pauseMs: 30000,
    failLimit: 3,
  };

  function preloadAllowed() {
    var now = Date.now();
    if (now < preloadGuard.pausedUntil) return false;
    if (now - preloadGuard.windowStart > 60000) {
      preloadGuard.windowStart = now;
      preloadGuard.windowCount = 0;
    }
    if (preloadGuard.windowCount >= preloadGuard.maxPerMinute) return false;
    return true;
  }

  function notePreloadStart() {
    preloadGuard.windowCount += 1;
  }

  function pausePreloads(reason) {
    preloadGuard.pausedUntil = Date.now() + preloadGuard.pauseMs;
    preloadGuard.fails = 0;
    if (window.console && console.info) {
      console.info('[swup] preloads paused:', reason || 'errors');
    }
  }

  function notePreloadFail(status) {
    preloadGuard.fails += 1;
    if (status === 429 || status === 503 || status === 502 || preloadGuard.fails >= preloadGuard.failLimit) {
      pausePreloads('http ' + (status || 'error'));
    }
  }

  function notePreloadOk() {
    preloadGuard.fails = 0;
  }

  function shouldIgnore(url, ctx) {
    var el = ctx && ctx.el;
    if (el && (el.hasAttribute('data-no-swup') || el.closest('[data-no-swup]'))) return true;
    if (el && el.getAttribute('href') === '#') return true;
    try {
      var parsed = new URL(url, window.location.origin);
      if (parsed.origin !== window.location.origin) return true;
      var path = parsed.pathname || '/';
      // Home always full-refresh so listing picks up CF/Typesense changes.
      if (path === '/' || path === '' || path === 'index-2.html') {
        if (!parsed.search || parsed.search === '') return true;
      }
      if (path.indexOf('/admin') === 0 || path.indexOf('/adminv2') === 0) return true;
    } catch (err) {
      return true;
    }
    return false;
  }

  function closeOverlays() {
    var mainNav = document.getElementById('main-nav');
    var backdrop = document.getElementById('mobile-menu-backdrop');
    var closeBtn = document.getElementById('close-mobile-menu');
    var header = document.querySelector('.header');
    if (mainNav) mainNav.classList.remove('open');
    if (backdrop) backdrop.classList.add('hidden');
    if (closeBtn) closeBtn.classList.add('hidden');
    document.body.style.overflow = '';
    if (header) header.style.backdropFilter = 'blur(16px)';
    var searchOverlay = document.getElementById('search-overlay');
    if (searchOverlay) searchOverlay.classList.add('hidden');
  }

  function refreshPersistentUi() {
    var year = document.getElementById('current-year');
    if (year) year.textContent = String(new Date().getFullYear());

    var backToTop = document.getElementById('back-to-top');
    if (backToTop && !backToTop.dataset.swupBound) {
      backToTop.dataset.swupBound = '1';
      window.addEventListener(
        'scroll',
        function () {
          if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'pointer-events-none');
            backToTop.classList.add('opacity-100');
          } else {
            backToTop.classList.remove('opacity-100');
            backToTop.classList.add('opacity-0', 'pointer-events-none');
          }
        },
        { passive: true }
      );
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (typeof window.initSitePage === 'function') {
      window.initSitePage();
    }
    document.dispatchEvent(new CustomEvent('site:page'));
  }

  var plugins = [];
  if (Progress) {
    plugins.push(
      new Progress({
        className: 'swup-progress-bar',
        transition: 80,
        delay: 0,
        initialValue: 0.28,
        finishAnimation: false,
      })
    );
  }
  if (Head) {
    plugins.push(
      new Head({
        persistAssets: true,
        awaitAssets: false,
      })
    );
  }
  if (Scripts) {
    plugins.push(
      new Scripts({
        head: false,
        body: true,
        optin: true,
      })
    );
  }
  if (Preload) {
    plugins.push(
      new Preload({
        // Prefetch only — pages are consumed on the next visit, then dropped.
        throttle: 3,
        preloadInitialPage: false,
        preloadHoveredLinks: true,
        preloadVisibleLinks: {
          threshold: 0.2,
          delay: 200,
          // Cards + logo/home; categories in nav are filtered out by isPrefetchableUrl.
          containers: ['#swup', '.card-grid', '.header'],
          ignore: function (el) {
            if (!preloadAllowed()) return true;
            if (!el || !el.href) return true;
            return !isPrefetchableUrl(el.href);
          },
        },
      })
    );
  }

  var swup = new SwupCtor({
    containers: ['#swup'],
    animateHistoryBrowsing: true,
    animationSelector: false,
    // Memory is only a one-shot prefetch buffer, not a long-lived page cache.
    cache: true,
    timeout: 10000,
    plugins: plugins,
    ignoreVisit: shouldIgnore,
  });

  // Only home + post detail pages are worth prefetching.
  function isPrefetchableUrl(url) {
    try {
      var parsed = new URL(url, window.location.origin);
      if (parsed.origin !== window.location.origin) return false;
      if (parsed.searchParams.has('s')) return false;
      var path = parsed.pathname || '/';
      if (path.length > 1 && path.charAt(path.length - 1) === '/') {
        path = path.slice(0, -1);
      }
      if (path === '' || path === '/' || path === 'index-2.html') return true;
      // Pretty post URLs: /some-title-12345
      if (/^\/[^/]+-\d+$/.test(path)) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  // Gate every preload path (visible / hover / press / plugin).
  if (typeof swup.preload === 'function') {
    var rawPreload = swup.preload.bind(swup);
    swup.preload = function (url) {
      if (!isPrefetchableUrl(url)) return Promise.resolve();
      return rawPreload(url);
    };
  }

  function clearSwupCache() {
    if (swup.cache && typeof swup.cache.clear === 'function') {
      swup.cache.clear();
    }
  }

  function deleteCachedUrl(url) {
    if (!url || !swup.cache || typeof swup.cache.delete !== 'function') return;
    try {
      swup.cache.delete(url);
    } catch (err) {
      /* ignore */
    }
  }

  function safePreload(url, forceFresh) {
    if (!isPrefetchableUrl(url)) return;
    if (!preloadAllowed() || typeof swup.preload !== 'function') return;
    if (forceFresh) deleteCachedUrl(url);
    // Unused one-shot still waiting for its first click — keep it.
    if (!forceFresh && swup.cache && typeof swup.cache.has === 'function' && swup.cache.has(url)) {
      return;
    }
    notePreloadStart();
    var timer = window.setTimeout(function () {
      notePreloadFail(408);
    }, 10000);
    Promise.resolve(swup.preload(url))
      .then(function () {
        window.clearTimeout(timer);
        notePreloadOk();
      })
      .catch(function (err) {
        window.clearTimeout(timer);
        var status = (err && (err.status || err.responseStatus)) || 0;
        notePreloadFail(status);
      });
  }

  // Press → warm one-shot from CF (no progress bar; touch ≠ navigate).
  document.addEventListener(
    'pointerdown',
    function (event) {
      if (event.button !== 0) return;
      var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if (!link) return;
      var href = link.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || link.target === '_blank') return;
      var url;
      try {
        url = new URL(link.href, window.location.origin);
      } catch (err) {
        return;
      }
      if (shouldIgnore(url.href, { el: link })) return;
      safePreload(url.pathname + url.search, false);
    },
    true
  );

  swup.hooks.on('fetch:error', function (visit, args) {
    var status = (args && args.response && args.response.status) || 0;
    notePreloadFail(status || 500);
    if (visit && visit.to && visit.to.url) {
      window.location.href = visit.to.url;
    }
  });
  swup.hooks.on('fetch:timeout', function (visit) {
    notePreloadFail(408);
    if (visit && visit.to && visit.to.url) {
      window.location.href = visit.to.url;
    }
  });

  swup.hooks.on('page:preload', function () {
    notePreloadOk();
  });

  swup.hooks.on('visit:start', closeOverlays);

  // Consume-once: after a visit, drop every memory page. Visible/hover
  // preloads refill fresh from CF for the next single click.
  swup.hooks.on('page:view', function () {
    clearSwupCache();
    refreshPersistentUi();
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') clearSwupCache();
  });

  window.__swup = swup;
  window.__swupPreloadGuard = preloadGuard;
})();
