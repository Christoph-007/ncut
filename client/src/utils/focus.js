// Store references to our event handlers so we can remove them.
const trapFocusHandlers = {};

/**
 * Get all focusable elements within a container.
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

/**
 * Trap focus within the given container.
 * @param {HTMLElement} container
 */
export function trapFocus(container) {
  removeTrapFocus();

  const focusable = getFocusableElements(container);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  trapFocusHandlers.keydown = (event) => {
    if (event.key !== 'Tab') return;
    const activeEl = document.activeElement;
    if (!event.shiftKey && activeEl === last) {
      event.preventDefault();
      first?.focus();
    } else if (event.shiftKey && (activeEl === first || activeEl === container)) {
      event.preventDefault();
      last?.focus();
    }
  };

  trapFocusHandlers.focusin = (event) => {
    if (event.target instanceof Node && !container.contains(event.target)) {
      event.stopPropagation();
      first?.focus();
    }
  };

  document.addEventListener('keydown', trapFocusHandlers.keydown, true);
  document.addEventListener('focusin', trapFocusHandlers.focusin, true);

  container.focus();
}

/**
 * Remove focus trap.
 */
export function removeTrapFocus() {
  trapFocusHandlers.keydown && document.removeEventListener('keydown', trapFocusHandlers.keydown, true);
  trapFocusHandlers.focusin && document.removeEventListener('focusin', trapFocusHandlers.focusin, true);
}

/**
 * Cycle focus to the next or previous item.
 * @param {HTMLElement[]} items
 * @param {number} increment
 */
export function cycleFocus(items, increment) {
  const currentIndex = items.findIndex((item) => item.matches(':focus'));
  let targetIndex = currentIndex + increment;

  if (targetIndex >= items.length) {
    targetIndex = 0;
  } else if (targetIndex < 0) {
    targetIndex = items.length - 1;
  }

  const targetItem = items[targetIndex];
  if (!targetItem) return;
  targetItem.focus();
}
