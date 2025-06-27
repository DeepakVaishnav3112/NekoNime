export default function GenreTag({ genre, color, textColor, padding }) {
  return (
    <span
      key={genre}
      className={`px-${padding[0]} py-${padding[1]} rounded-full`}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {genre}
    </span>
  );
}
