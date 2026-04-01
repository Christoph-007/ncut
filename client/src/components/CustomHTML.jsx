/**
 * CustomHTML — ported from sections/custom-liquid.liquid
 * Safely wraps raw HTML or dynamic inputs within a bounded styling container.
 */
export default function CustomHTML({ htmlContent = "<p>Your custom HTML goes here.</p>" }) {
  if (!htmlContent) return null;

  return (
    <div className="custom-html-section container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <div 
        className="custom-html-wrapper"
        // Caution: Only use dangerouslySetInnerHTML with fully trusted/sanitized backend payloads
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
