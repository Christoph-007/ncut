import { Link } from 'react-router-dom';

/**
 * MediaWithContent — ported from sections/media-with-content.liquid
 * Implements the 50/50 split ratio design block supporting both left and right media alignments.
 */
export default function MediaWithContent({
  imageSrc = '/placeholder.jpg',
  imageAlt = 'Promotional content',
  heading = 'Up The Ante',
  caption = 'Bestseller',
  text = 'Our signature collections made with care.',
  buttonLabel = 'Shop Now',
  buttonLink = '/collections',
  mediaPosition = 'left', // 'left' or 'right'
  colorScheme = 'scheme-3',
  paddingTop = '6rem',
  paddingBottom = '6rem'
}) {
  const isRight = mediaPosition === 'right';

  return (
    <section 
      className={`media-with-content color-${colorScheme}`}
      style={{
        paddingTop,
        paddingBottom,
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-foreground)',
        overflow: 'hidden'
      }}
    >
      <div 
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        {/* Media Side */}
        <div 
          className="media-block"
          style={{ 
            order: isRight ? 2 : 1,
            display: 'flex',
            justifyContent: isRight ? 'flex-end' : 'flex-start'
          }}
        >
          <img 
            src={imageSrc}
            alt={imageAlt}
            style={{
              width: '100%',
              maxWidth: '800px',
              height: 'auto',
              maxHeight: '70vh',
              objectFit: 'cover',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)'
            }}
          />
        </div>

        {/* Content Side */}
        <div 
          className="content-block"
          style={{ 
            order: isRight ? 1 : 2,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '1.5rem'
          }}
        >
          {caption && (
            <span style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--color-muted)' 
            }}>
              {caption}
            </span>
          )}
          
          {heading && (
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: '900',
              lineHeight: '1.1',
              margin: '0',
              letterSpacing: '-0.02em'
            }}>
              {heading}
            </h2>
          )}

          {text && (
            <div 
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.6',
                color: 'var(--color-muted)',
                maxWidth: '600px'
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}

          {buttonLabel && buttonLink && (
            <Link 
              to={buttonLink}
              className="btn btn--primary"
              style={{ 
                marginTop: '1rem',
                padding: '1rem 2.5rem',
                fontSize: '1.125rem',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
