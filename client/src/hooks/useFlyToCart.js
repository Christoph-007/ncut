import { useCallback } from 'react';

/**
 * useFlyToCart — ported from assets/fly-to-cart.js
 * Calculates and runs a bezier animation bounding box from an origin element to the cart icon.
 */
export default function useFlyToCart() {
  const triggerFlyToCart = useCallback((originElement, destinationId = 'cart-icon-bubble') => {
    if (!originElement) return;
    const destElement = document.getElementById(destinationId);
    if (!destElement) return;

    const sourceRect = originElement.getBoundingClientRect();
    const destRect = destElement.getBoundingClientRect();

    // Create a clone of the origin element to fly
    const flyClone = originElement.cloneNode(true);
    
    // Setup initial styles for the clone
    Object.assign(flyClone.style, {
      position: 'fixed',
      top: `${sourceRect.top}px`,
      left: `${sourceRect.left}px`,
      width: `${sourceRect.width}px`,
      height: `${sourceRect.height}px`,
      margin: '0',
      zIndex: '9999',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: 'none',
      opacity: '1'
    });

    document.body.appendChild(flyClone);

    // Trigger reflow
    void flyClone.offsetWidth;

    // Apply destination coordinates
    Object.assign(flyClone.style, {
      top: `${destRect.top + destRect.height / 2}px`,
      left: `${destRect.left + destRect.width / 2}px`,
      width: '20px',
      height: '20px',
      opacity: '0',
      transform: 'scale(0.1)'
    });

    // Cleanup after animation finishes
    setTimeout(() => {
      flyClone.remove();
      // Optional: Flash the cart icon
      destElement.style.transform = 'scale(1.2)';
      setTimeout(() => destElement.style.transform = 'scale(1)', 200);
    }, 800);
  }, []);

  return triggerFlyToCart;
}
