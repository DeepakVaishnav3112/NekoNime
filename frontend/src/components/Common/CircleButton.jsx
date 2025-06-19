export default function CircleButton({ icon: Icon, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="cursor-pointer bg-primary text-white p-2 rounded-full hover:scale-110 hover:bg-secondary hover:text-primary-hover-text transition"
    >
      <Icon className="text-lg " />
    </button>
  );
}
