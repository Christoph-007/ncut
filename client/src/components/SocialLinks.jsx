/**
 * SocialLinks — Converted from blocks/social-links.liquid
 * Renders social media icon links.
 *
 * Props: one URL prop per platform
 *   facebookUrl, instagramUrl, youtubeUrl, tiktokUrl, twitterUrl,
 *   threadsUrl, linkedinUrl, blueskyUrl, snapchatUrl, pinterestUrl,
 *   tumblrUrl, vimeoUrl, customUrl
 */

const PLATFORMS = [
  { key: 'facebookUrl', name: 'Facebook' },
  { key: 'instagramUrl', name: 'Instagram' },
  { key: 'youtubeUrl', name: 'YouTube' },
  { key: 'tiktokUrl', name: 'TikTok' },
  { key: 'twitterUrl', name: 'Twitter / X' },
  { key: 'threadsUrl', name: 'Threads' },
  { key: 'linkedinUrl', name: 'LinkedIn' },
  { key: 'blueskyUrl', name: 'Bluesky' },
  { key: 'snapchatUrl', name: 'Snapchat' },
  { key: 'pinterestUrl', name: 'Pinterest' },
  { key: 'tumblrUrl', name: 'Tumblr' },
  { key: 'vimeoUrl', name: 'Vimeo' },
  { key: 'customUrl', name: 'Website' },
];

export default function SocialLinks(props) {
  const links = PLATFORMS.filter((p) => props[p.key]);

  if (!links.length) return null;

  return (
    <div
      className="social-icons__wrapper"
      style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
    >
      {links.map(({ key, name }) => (
        <div key={key} className="social-icons__icon-wrapper">
          <a
            href={props[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.5rem',
              height: '1.5rem',
              color: 'currentColor',
            }}
          >
            <span className="social-icons__icon-label" style={{ fontSize: '0.75rem' }}>
              {name}
            </span>
          </a>
        </div>
      ))}
    </div>
  );
}
