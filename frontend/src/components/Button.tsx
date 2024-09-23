export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded shadow-md"
    >
      {/* <img src="/play-icon.png" alt="Play Icon" className="w-6 h-6" /> */}
      <div>
        <p className="text-xl">{children}</p>
        <p className="text-sm font-normal">Play with someone at your level</p>
      </div>
    </button>
  );
};
