import { useEffect, useRef, useCallback, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { isMobileBreakpoint, onAnimationEnd } from '../utils/utilities.js';

/**
 * CartDrawer — slides in from the side when items are added to cart or the
 * user opens it explicitly.
 *
 * Props:
 *   autoOpen  {boolean} — open automatically when items are added
 *   children  {ReactNode}
 */
export default function CartDrawer({ autoOpen = true, children }) {
  const { cart, isDrawerOpen, openDrawer, closeDrawer } = useCart();
  const dialogRef = useRef(null);
  const [summaryThreshold] = useState(0.5);
  const previousScrollY = useRef(0);
  const historyAbortController = useRef(null);

  // Open on cart add when autoOpen is set
  useEffect(() => {
    if (autoOpen && cart && isDrawerOpen) {
      openDrawer();
    }
  }, [autoOpen, cart, isDrawerOpen, openDrawer]);

  // Lock scroll when open
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDrawerOpen) {
      previousScrollY.current = window.scrollY;
      document.body.style.width = '100%';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${previousScrollY.current}px`;
      dialog.showModal?.();

      // Mobile back-button support
      if (isMobileBreakpoint()) {
        if (!history.state?.cartDrawerOpen) history.pushState({ cartDrawerOpen: true }, '');
        const controller = new AbortController();
        historyAbortController.current = controller;
        window.addEventListener(
          'popstate',
          () => {
            if (dialog.open) closeDrawer();
          },
          { signal: controller.signal }
        );
      }
    } else {
      historyAbortController.current?.abort();
      historyAbortController.current = null;
    }

    return () => {
      historyAbortController.current?.abort();
    };
  }, [isDrawerOpen, closeDrawer]);

  const handleClose = useCallback(async () => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;

    dialog.style.animation = 'none';
    void dialog.offsetWidth;
    dialog.classList.add('dialog-closing');
    dialog.style.animation = '';

    await onAnimationEnd(dialog, undefined, { subtree: false });

    document.body.style.width = '';
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo({ top: previousScrollY.current, behavior: 'instant' });

    dialog.classList.remove('dialog-closing');
    closeDrawer();
  }, [closeDrawer]);

  const handleBackdropClick = useCallback(
    (e) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isOutside =
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom;
      if (isOutside) handleClose();
    },
    [handleClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') { e.preventDefault(); handleClose(); }
    },
    [handleClose]
  );

  return (
    <dialog
      ref={dialogRef}
      className="cart-drawer"
      aria-label="Cart"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="cart-drawer__inner">
        <button
          className="cart-drawer__close"
          onClick={handleClose}
          aria-label="Close cart"
          type="button"
        >
          &times;
        </button>
        <div className="cart-drawer__content">
          {children}
        </div>
      </div>
    </dialog>
  );
}
