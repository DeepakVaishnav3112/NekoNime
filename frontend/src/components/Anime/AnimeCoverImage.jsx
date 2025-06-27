export default function AnimeCoverImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-40 md:w-60 h-full rounded-md shadow"
    />
  );
}
