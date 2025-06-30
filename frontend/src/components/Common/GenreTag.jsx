export default function GenreTag({ genre, color, textColor, padding, textSize }) {
  return (
    <span
      key={genre}
      className={`px-${padding[0]} py-${padding[1]} rounded-full max-xs:text-[${textSize}px]`}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {genre}
    </span>
  );
}
