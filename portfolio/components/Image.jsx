// Minimal stand-in for next/image
export default function Image({ src, alt, fill, width, height, priority, sizes, unoptimized, style, ...props }) {
  const fillStyle = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", color: "transparent" } : null;
  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{ ...fillStyle, ...style }}
      {...props}
    />
  );
}
