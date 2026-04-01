/**
 * View transition handling for MPA-style page navigations.
 * In the React SPA this is largely a no-op wrapper, but kept for
 * completeness and any future usage.
 */
(function () {
  if (typeof window === 'undefined') return;

  const idleCallback = typeof requestIdleCallback === 'function' ? requestIdleCallback : setTimeout;

  function isLowPowerDevice() {
    return Number(navigator.hardwareConcurrency) <= 2 || Number(navigator.deviceMemory) <= 2;
  }

  function shouldSkipViewTransition(viewTransition) {
    return !(viewTransition instanceof ViewTransition) || isLowPowerDevice();
  }

  if ('onpageswap' in window) {
    window.addEventListener('pageswap', async (event) => {
      const { viewTransition } = event;
      if (shouldSkipViewTransition(viewTransition)) {
        viewTransition?.skipTransition();
        return;
      }

      ['pointerdown', 'keydown'].forEach((eventName) => {
        document.addEventListener(eventName, () => viewTransition.skipTransition(), { once: true });
      });

      document.querySelectorAll('[data-view-transition-type]:not([data-view-transition-triggered])').forEach((el) => {
        el.removeAttribute('data-view-transition-type');
      });

      const transitionTriggered = document.querySelector('[data-view-transition-triggered]');
      const transitionType = transitionTriggered?.getAttribute('data-view-transition-type');

      if (transitionType) {
        viewTransition.types.clear();
        viewTransition.types.add(transitionType);
        sessionStorage.setItem('custom-transition-type', transitionType);
      } else {
        viewTransition.types.clear();
        viewTransition.types.add('page-navigation');
        sessionStorage.removeItem('custom-transition-type');
      }
    });
  }

  if ('onpagereveal' in window) {
    window.addEventListener('pagereveal', async (event) => {
      const { viewTransition } = event;
      if (shouldSkipViewTransition(viewTransition)) {
        viewTransition?.skipTransition();
        return;
      }

      const customTransitionType = sessionStorage.getItem('custom-transition-type');

      if (customTransitionType) {
        viewTransition.types.clear();
        viewTransition.types.add(customTransitionType);
        await viewTransition.finished;
        viewTransition.types.clear();
        viewTransition.types.add('page-navigation');
        idleCallback(() => {
          sessionStorage.removeItem('custom-transition-type');
          document.querySelectorAll('[data-view-transition-type]').forEach((el) => {
            el.removeAttribute('data-view-transition-type');
          });
        });
      } else {
        viewTransition.types.clear();
        viewTransition.types.add('page-navigation');
      }
    });
  }
})();
