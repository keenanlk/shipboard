// Download page logic.
// On a Mac: ask GitHub for the latest release's .dmg and start the download.
// Anywhere else (iPhone, iPad, Android, Windows, Linux): never push a .dmg the visitor
// can't open. Show "ShipBoard runs on macOS" with a copy-link button instead.
(function () {
  'use strict';

  var PAGE_URL = 'https://shipboardapp.com/download.html';

  // iPadOS Safari reports a Macintosh user agent; touch support is what gives an iPad away.
  function isMacDesktop(userAgent, maxTouchPoints) {
    if (!/Macintosh|Mac OS X/.test(userAgent || '')) return false;
    if (/iPhone|iPad|iPod/.test(userAgent)) return false;
    return !(maxTouchPoints > 1);
  }

  function track(url, name, method, version) {
    if (typeof gtag !== 'function') return;
    gtag('event', 'file_download', {
      file_extension: 'dmg',
      file_name: name,
      link_url: url,
      link_text: 'ShipBoard download',
      method: method,
      app_version: version || undefined,
      transport_type: 'beacon'
    });
  }

  function showNotMac() {
    document.body.classList.add('not-mac');
    document.title = 'ShipBoard for macOS';
    document.getElementById('headline').textContent = 'ShipBoard runs on macOS';
    document.getElementById('copy-link').addEventListener('click', function () {
      var copied = document.getElementById('copied');
      function fallback() {
        // Clipboard API unavailable (e.g. http, or an older/locked-down browser) or the
        // write was rejected (denied permission): tell the visitor the link in plain text
        // instead of leaving the click looking like it did nothing.
        copied.textContent = 'Copy failed — the link is shipboardapp.com/download.html';
        copied.hidden = false;
      }
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        fallback();
        return;
      }
      navigator.clipboard.writeText(PAGE_URL).then(function () {
        copied.textContent = 'Copied.';
        copied.hidden = false;
      }, fallback);
    });
  }

  function startDownload() {
    // Ask GitHub for the latest release's .dmg and download whatever it's named.
    // Resilient to version-bumps and asset-name changes; falls back to the
    // releases page (the manual link) if the API is unavailable.
    var manual = document.getElementById('dl'); // -> /releases/latest (always works)
    fetch('https://api.github.com/repos/keenanlk/shipboard/releases/latest', {
      headers: { 'Accept': 'application/vnd.github+json' }
    })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) {
        var dmg = (d.assets || []).filter(function (a) {
          return /\.dmg$/i.test(a.name);
        })[0];
        if (dmg && dmg.browser_download_url) {
          manual.href = dmg.browser_download_url; // upgrade fallback to the direct file
          // The download starts from script, not a click, so GA's automatic
          // file_download tracking never sees it. Report it by hand, under the same
          // event name, so it counts alongside real .dmg link clicks. Beacon transport
          // lets the hit survive the navigation that follows.
          track(dmg.browser_download_url, dmg.name, 'auto', d.tag_name);
          setTimeout(function () { window.location.href = dmg.browser_download_url; }, 600);
        }
      })
      .catch(function () { /* leave the manual link pointing at the releases page */ });

    // If the API was unreachable, the manual link still points at the releases page,
    // which GA would not count as a download. (Once upgraded to the .dmg above, GA's
    // own tracking counts a click on it, so this only fires for the fallback.)
    manual.addEventListener('click', function () {
      if (!/\.dmg$/i.test(manual.href)) track(manual.href, 'releases page', 'fallback', null);
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isMacDesktop: isMacDesktop };
  } else if (isMacDesktop(navigator.userAgent, navigator.maxTouchPoints)) {
    startDownload();
  } else {
    showNotMac();
  }
})();
