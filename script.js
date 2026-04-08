// ── SOLUTION VIDEO ──
    (function() {
      var vid       = document.getElementById('ytVideo');
      var ppBtn     = document.getElementById('ytPPBtn');
      var iconPlay  = document.getElementById('ytIconPlay');
      var iconPause = document.getElementById('ytIconPause');
      var player    = document.getElementById('ytPlayer');

      if (!vid || !ppBtn) return;

      function syncIcons() {
        iconPlay.style.display  = vid.paused ? '' : 'none';
        iconPause.style.display = vid.paused ? 'none' : '';
        if (player) player.classList.toggle('playing', !vid.paused);
      }

      ppBtn.onclick = function() {
        if (vid.paused) { vid.play(); } else { vid.pause(); }
      };

      vid.addEventListener('play',  syncIcons);
      vid.addEventListener('pause', syncIcons);
      vid.addEventListener('ended', syncIcons);
      syncIcons();
    })();

    // ── NAV SCROLL SPY ──
    (function() {
      const sectionIds = ['problem','solution-video','user-journey','critical-decisions','driver-dashboard-separate','zones-section','flows-anchor','future-scope','contact'];
      const links = document.querySelectorAll('.nav-link');

      function highlight(id) {
        links.forEach(function(l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }

      function onScroll() {
        var current = sectionIds[0];
        var threshold = window.innerHeight * 0.35;
        for (var i = 0; i < sectionIds.length; i++) {
          var el = document.getElementById(sectionIds[i]);
          if (!el) continue;
          var top = el.getBoundingClientRect().top;
          if (top <= threshold) current = sectionIds[i];
        }
        highlight(current);
      }

      // Listen on every possible scroll target
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('scroll', onScroll, { passive: true });
      document.documentElement.addEventListener('scroll', onScroll, { passive: true });

      // Poll during page load until layout is stable
      var polls = 0;
      var poller = setInterval(function() {
        onScroll();
        polls++;
        if (polls > 10) clearInterval(poller);
      }, 200);
    })();

    // ── JOURNEY MINI PLAYERS ──
    function initJourneyPlayer(playerId, videoId, overlayId, playBtnId, ppBtnId,
                                 progId, fillId, thumbId, timeId, fsId,
                                 iconPlayClass, iconPauseClass) {
      const p   = document.getElementById(playerId);
      const v   = document.getElementById(videoId);
      const ov  = document.getElementById(overlayId);
      const pb  = document.getElementById(playBtnId);
      const pp  = document.getElementById(ppBtnId);
      const prg = document.getElementById(progId);
      const fil = document.getElementById(fillId);
      const thm = document.getElementById(thumbId);
      const ti  = document.getElementById(timeId);
      const fs  = document.getElementById(fsId);
      const ipl = pp.querySelector('.' + iconPlayClass);
      const ipa = pp.querySelector('.' + iconPauseClass);
      let htimer;

      function toggleV() { v.paused ? v.play() : v.pause(); }

      function setP(playing) {
        p.classList.toggle('j-playing', playing);
        ipl.style.display = playing ? 'none' : '';
        ipa.style.display = playing ? ''     : 'none';
        if (playing) {
          clearTimeout(htimer);
          htimer = setTimeout(() => p.classList.add('j-hide-ctrl'), 2500);
        } else {
          p.classList.remove('j-hide-ctrl');
        }
      }

      pb.addEventListener('click', toggleV);
      pp.addEventListener('click', toggleV);
      v.addEventListener('play',  () => setP(true));
      v.addEventListener('pause', () => setP(false));
      v.addEventListener('ended', () => setP(false));

      // Handle autoplay state on load
      v.addEventListener('loadeddata', () => {
        if (!v.paused) setP(true);
      });
      // Also check immediately in case already playing
      if (!v.paused) setP(true);

      v.addEventListener('timeupdate', () => {
        if (!v.duration) return;
        const pct = (v.currentTime / v.duration) * 100;
        fil.style.width = pct + '%';
        thm.style.left  = pct + '%';
        ti.textContent  = fmt(v.currentTime) + ' / ' + fmt(v.duration);
      });

      v.addEventListener('loadedmetadata', () => {
        ti.textContent = '0:00 / ' + fmt(v.duration);
        if (!v.paused) setP(true);
      });

      prg.addEventListener('click', e => {
        const r = prg.getBoundingClientRect();
        v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
      });

      fs.addEventListener('click', () => {
        if (!document.fullscreenElement) p.requestFullscreen();
        else document.exitFullscreen();
      });

      p.addEventListener('mousemove', () => {
        p.classList.remove('j-hide-ctrl');
        clearTimeout(htimer);
        if (!v.paused) htimer = setTimeout(() => p.classList.add('j-hide-ctrl'), 2500);
      });
      p.addEventListener('mouseleave', () => {
        if (!v.paused) p.classList.add('j-hide-ctrl');
      });
    }

    initJourneyPlayer('jPlayer1','jVid1','jOverlay1','jPlay1','jPP1',
                      'jProg1','jFill1','jThumb1','jTime1','jFs1',
                      'j-icon-play1','j-icon-pause1');

    initJourneyPlayer('jPlayer2','jVid2','jOverlay2','jPlay2','jPP2',
                      'jProg2','jFill2','jThumb2','jTime2','jFs2',
                      'j-icon-play2','j-icon-pause2');

    initJourneyPlayer('jPlayer3','jVid3','jOverlay3','jPlay3','jPP3',
                      'jProg3','jFill3','jThumb3','jTime3','jFs3',
                      'j-icon-play3','j-icon-pause3');

    initJourneyPlayer('jPlayer4','jVid4','jOverlay4','jPlay4','jPP4',
                      'jProg4','jFill4','jThumb4','jTime4','jFs4',
                      'j-icon-play4','j-icon-pause4');

    initJourneyPlayer('jPlayer5','jVid5','jOverlay5','jPlay5','jPP5',
                      'jProg5','jFill5','jThumb5','jTime5','jFs5',
                      'j-icon-play5','j-icon-pause5');

    initJourneyPlayer('jPlayer6','jVid6','jOverlay6','jPlay6','jPP6',
                      'jProg6','jFill6','jThumb6','jTime6','jFs6',
                      'j-icon-play6','j-icon-pause6');

    initJourneyPlayer('jPlayerFinal','jVidFinal','jOverlayFinal','jPlayFinal','jPPFinal',
                      'jProgFinal','jFillFinal','jThumbFinal','jTimeFinal','jFsFinal',
                      'j-icon-playfinal','j-icon-pausefinal');

    initJourneyPlayer('jPlayerFlow1','jVidFlow1','jOverlayFlow1','jPlayFlow1','jPPFlow1',
                      'jProgFlow1','jFillFlow1','jThumbFlow1','jTimeFlow1','jFsFlow1',
                      'j-icon-playflow1','j-icon-pauseflow1');

    initJourneyPlayer('jPlayerFlow2','jVidFlow2','jOverlayFlow2','jPlayFlow2','jPPFlow2',
                      'jProgFlow2','jFillFlow2','jThumbFlow2','jTimeFlow2','jFsFlow2',
                      'j-icon-playflow2','j-icon-pauseflow2');

(function() {
      var btn     = document.getElementById('hamburger');
      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('navOverlay');
      if (!btn || !sidebar) return;

      function openNav()  { sidebar.classList.add('open'); overlay.classList.add('open'); }
      function closeNav() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

      btn.addEventListener('click', function() {
        sidebar.classList.contains('open') ? closeNav() : openNav();
      });
      overlay.addEventListener('click', closeNav);

      // Close nav when a link is clicked on mobile
      document.querySelectorAll('.nav-link').forEach(function(l) {
        l.addEventListener('click', closeNav);
      });
    })();

(function() {
      var vid       = document.getElementById('ytVideo');
      var ppBtn     = document.getElementById('ytPPBtn');
      var iconPlay  = document.getElementById('ytIconPlay');
      var iconPause = document.getElementById('ytIconPause');
      var seek      = document.getElementById('ytSeek');
      var timeEl    = document.getElementById('ytTime');

      if (!vid) return;

      function fmt(s) {
        s = isNaN(s) || !isFinite(s) ? 0 : Math.floor(s);
        return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
      }

      function setUI(playing) {
        iconPlay.style.display  = playing ? 'none' : '';
        iconPause.style.display = playing ? '' : 'none';
      }

      /* Play / Pause */
      function toggle() {
        vid.paused ? vid.play() : vid.pause();
      }

      ppBtn.addEventListener('click', function(e) { e.stopPropagation(); toggle(); });
      vid.addEventListener('click', toggle);

      vid.addEventListener('play',  function() { setUI(true);  });
      vid.addEventListener('pause', function() { setUI(false); });
      vid.addEventListener('ended', function() { setUI(false); });

      /* Timeline — update as video plays */
      var dragging = false;
      vid.addEventListener('timeupdate', function() {
        if (dragging || !vid.duration) return;
        seek.value = (vid.currentTime / vid.duration) * 1000;
        if (timeEl) timeEl.textContent = fmt(vid.currentTime) + ' / ' + fmt(vid.duration);
        /* gold fill */
        var pct = (vid.currentTime / vid.duration) * 100;
        seek.style.background = 'linear-gradient(to right,#c8a96e ' + pct + '%,rgba(255,255,255,0.3) ' + pct + '%)';
      });

      vid.addEventListener('loadedmetadata', function() {
        if (timeEl) timeEl.textContent = '0:00 / ' + fmt(vid.duration);
      });

      /* Seek */
      seek.addEventListener('mousedown',  function() { dragging = true; });
      seek.addEventListener('touchstart', function() { dragging = true; }, { passive: true });
      seek.addEventListener('input', function() {
        if (!vid.duration) return;
        vid.currentTime = (seek.value / 1000) * vid.duration;
        var pct = (seek.value / 1000) * 100;
        seek.style.background = 'linear-gradient(to right,#c8a96e ' + pct + '%,rgba(255,255,255,0.3) ' + pct + '%)';
        if (timeEl) timeEl.textContent = fmt(vid.currentTime) + ' / ' + fmt(vid.duration);
      });
      seek.addEventListener('mouseup',  function() { dragging = false; });
      seek.addEventListener('touchend', function() { dragging = false; });

      setUI(false);
    })();