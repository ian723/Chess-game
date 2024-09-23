import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Chessboard Image */}
        <div className="flex justify-center items-center">
          <img
            src="/chessboard.jpg"
            className="max-w-full md:max-w-lg"
            alt="Chessboard"
          />
        </div>

        {/* Right Section with Text and Buttons */}
        <div className="flex flex-col justify-center items-start text-white space-y-6">
          {/* Title */}
          <h1 className="text-5xl font-bold">
            Play Chess Online <br /> on the #1 Site!
          </h1>

          {/* Stats */}
          <div className="text-gray-400 text-lg flex gap-10">
            <p>
              <span className="font-bold text-white">15,064,247</span> Games
              Today
            </p>
            <p>
              <span className="font-bold text-white">132,179</span> Playing Now
            </p>
          </div>

          {/* Play Online Button */}
          <Button
            onClick={() => {
              navigate("/game");
            }}
          >
            {" "}
            play Online
          </Button>

          {/* Play Computer Button */}
          <button
            onClick={() => {
              navigate("/game");
            }}
            className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded shadow-md"
          >
            {/* <img src="/computer-icon.png" alt="Computer Icon" className="w-6 h-6" /> */}
            <div>
              <p className="text-xl">Play Computer</p>
              <p className="text-sm font-normal">
                Play vs customizable training bots
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
