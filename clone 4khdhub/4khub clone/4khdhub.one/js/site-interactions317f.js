/**
 * Persistent page interactions for Swup navigations.
 * Bound once on document — survives #swup content swaps.
 */
(function () {
  if (window.__siteInteractionsBound) return;
  window.__siteInteractionsBound = true;

  function toggleCollapse(header, contentId) {
    if (!header || !contentId) return;
    var content = document.getElementById(contentId);
    if (!content) return;

    content.classList.toggle('hidden');
    var isExpanded = !content.classList.contains('hidden');
    header.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

    var chevron = header.querySelector('.chevron-icon');
    if (chevron) {
      chevron.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    if (header.classList.contains('download-header') || header.classList.contains('episode-header')) {
      header.style.backgroundColor = isExpanded ? 'hsl(213deg 69.03% 35.03% / 68%)' : '';
    }
  }

  function closeTrailer() {
    var trailerModal = document.getElementById('trailer-modal');
    var trailerContainer = document.getElementById('trailer-container');
    if (!trailerModal) return;
    trailerModal.classList.add('hidden');
    var iframe = document.getElementById('youtube-player');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
      } catch (err) {
        /* ignore */
      }
    }
    if (trailerContainer && !iframe) {
      trailerContainer.innerHTML = '';
    }
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var downloadHeader = target.closest('.download-header');
    if (downloadHeader) {
      var fileId = downloadHeader.getAttribute('data-file-id');
      if (fileId) toggleCollapse(downloadHeader, 'content-' + fileId);
      return;
    }

    var seasonHeader = target.closest('.season-header');
    if (seasonHeader) {
      var seasonId = seasonHeader.getAttribute('data-season-id');
      if (seasonId) toggleCollapse(seasonHeader, 'content-' + seasonId);
      return;
    }

    var episodeHeader = target.closest('.episode-header');
    if (episodeHeader) {
      var episodeId = episodeHeader.getAttribute('data-episode-id');
      if (episodeId) toggleCollapse(episodeHeader, 'content-' + episodeId);
      return;
    }

    var seriesTab = target.closest('.series-tab');
    if (seriesTab) {
      var tabId = seriesTab.getAttribute('data-tab');
      if (!tabId) return;
      document.querySelectorAll('.series-tab').forEach(function (tab) {
        tab.classList.toggle('active', tab === seriesTab);
      });
      document.querySelectorAll('.series-tab-content').forEach(function (panel) {
        var active = panel.id === tabId;
        panel.classList.toggle('active', active);
        if (active) panel.style.display = '';
      });
      return;
    }

    if (target.closest('#trailer-btn')) {
      var trailerBtn = document.getElementById('trailer-btn');
      var trailerModal = document.getElementById('trailer-modal');
      var trailerContainer = document.getElementById('trailer-container');
      if (!trailerBtn || !trailerModal || !trailerContainer) return;
      var trailerUrl = trailerBtn.getAttribute('data-trailer-url');
      var iframe = document.getElementById('youtube-player');
      if (!iframe && trailerUrl) {
        iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = trailerUrl;
        iframe.id = 'youtube-player';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.classList.add('rounded-md');
        trailerContainer.appendChild(iframe);
      }
      trailerModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      return;
    }

    if (target.closest('#close-trailer')) {
      closeTrailer();
      return;
    }

    var trailerModalEl = document.getElementById('trailer-modal');
    if (trailerModalEl && event.target === trailerModalEl) {
      closeTrailer();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var trailerModal = document.getElementById('trailer-modal');
    if (trailerModal && !trailerModal.classList.contains('hidden')) {
      closeTrailer();
    }
  });

  window.initSitePage = function initSitePage() {
    var seriesTabsContainer = document.getElementById('series-tabs');
    if (seriesTabsContainer) {
      var completePack = document.getElementById('complete-pack');
      var episodes = document.getElementById('episodes');
      var hasCompletePack = completePack && completePack.querySelectorAll('.download-item').length > 0;
      var hasEpisodesSection = episodes && episodes.querySelectorAll('.season-item').length > 0;
      var contentMain = document.querySelector('.content-main');

      if (!hasCompletePack || !hasEpisodesSection) {
        if (contentMain) contentMain.classList.add('single-option');
        if (hasCompletePack && completePack) {
          completePack.classList.add('active');
          if (episodes) episodes.style.display = 'none';
        } else if (hasEpisodesSection && episodes) {
          episodes.classList.add('active');
          if (completePack) completePack.style.display = 'none';
        }
      } else if (contentMain) {
        contentMain.classList.remove('single-option');
      }
    }

    if (typeof window.bootRedisgnV1 === 'function') {
      try {
        if (document.querySelector('.download-item, .episode-item, #complete-pack, #episodes, .content-main')) {
          window.setTimeout(window.bootRedisgnV1, 0);
        }
      } catch (err) {
        /* ignore */
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initSitePage);
  } else {
    window.initSitePage();
  }

  document.addEventListener('site:page', window.initSitePage);
})();
