function initMoviePage() {
  // Interactions are handled by /js/site-interactions.js (event delegation).
  // Kept as a no-op hook for Swup page:view / legacy script tags.
}

window.initMoviePage = initMoviePage;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMoviePage);
} else {
  initMoviePage();
}
