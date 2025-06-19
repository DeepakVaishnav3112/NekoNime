export default function GenreTag({ genre, color, textColor }) {
  return (
    <span
      key={genre}
      className="text-[9px] px-2 py-1 rounded-full"
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {genre}
    </span>
  );
}
