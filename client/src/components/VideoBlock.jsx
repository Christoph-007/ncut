/**
 * VideoBlock — Converted from blocks/video.liquid
 * Renders an uploaded video or embeds a YouTube/Vimeo URL.
 *
 * Props:
 *   source       {string}  — 'uploaded' | 'url'
 *   videoUrl     {string}  — URL for embedded video
 *   videoType    {string}  — 'youtube' | 'vimeo'
 *   videoSrc     {string}  — direct file URL for uploaded video
 *   coverImage   {string}  — poster/cover image URL
 *   alt          {string}
 *   loop         {boolean}
 *   autoplay     {boolean}
 *   aspectRatio  {string}  — 'auto' | '16/9' | '1/1' | '9/16'
 *   customWidth  {number}  — width %
 *   border       {string}
 *   borderRadius {number}
 *   padding      {object}
 */
export default function VideoBlock({
  source = 'uploaded',
  videoUrl = '',
  videoType = 'youtube',
  videoSrc = '',
  coverImage = '',
  alt = '',
  loop = true,
  autoplay = false,
  aspectRatio = '16/9',
  customWidth = 100,
  border = 'none',
  borderWidth = 1,
  borderRadius = 0,
  padding = {},
}) {
  const style = {
    width: `${customWidth}%`,
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    border: border !== 'none' ? `${borderWidth}px solid var(--color-border, #e2e8f0)` : undefined,
    overflow: 'hidden',
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  function getEmbedUrl() {
    if (!videoUrl) return '';
    const params = new URLSearchParams();
    if (autoplay) params.set('autoplay', '1');
    if (loop) params.set('loop', '1');
    params.set('mute', autoplay ? '1' : '0');

    if (videoType === 'youtube') {
      const id = videoUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      if (id) return `https://www.youtube.com/embed/${id}?${params}`;
    }
    if (videoType === 'vimeo') {
      const id = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
      if (id) return `https://player.vimeo.com/video/${id}?${params}`;
    }
    return videoUrl;
  }

  if (source === 'url') {
    const embedUrl = getEmbedUrl();
    return (
      <div className="video-block" style={style}>
        <iframe
          src={embedUrl}
          title={alt || 'Video'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none', aspectRatio: aspectRatio !== 'auto' ? aspectRatio : '16/9' }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="video-block" style={style}>
      <video
        src={videoSrc}
        poster={coverImage || undefined}
        loop={loop}
        autoPlay={autoplay}
        muted={autoplay}
        playsInline
        controls={!autoplay}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        {alt && <track kind="captions" label={alt} />}
      </video>
    </div>
  );
}
