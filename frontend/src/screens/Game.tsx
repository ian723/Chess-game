// export const Game = () => {
//   return (
//     <div className="flex justify-center items-center">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-4">
//         {/* Chessboard Section */}
//         <div className="col-span-2 bg-gray-800 p-4 rounded-lg flex flex-col items-center">
//           {/* Opponent Info */}
//           <div className="w-full flex justify-between text-white mb-2">
//             <div className="flex items-center space-x-2">
//               <div className="bg-gray-700 w-10 h-10 rounded-full"></div>
//               <span>Opponent</span>
//             </div>
//             <span>10:00</span>
//           </div>

//           {/* Chessboard Image */}
//           <img src="/chessboard.jpg" className="max-w-full" alt="Chessboard" />

//           {/* Player Info */}
//           <div className="w-full flex justify-between text-white mt-2">
//             <span>Guest5578250544</span>
//             <span>10:00</span>
//           </div>
//         </div>

//         {/* Control Panel */}
//         <div className="col-span-1 bg-gray-800 p-6 rounded-lg flex flex-col space-y-6">
//           {/* New Game, Games, Players Tabs */}
//           <div className="flex justify-between text-white space-x-2">
//             <button className="bg-gray-700 px-3 py-2 rounded-md">
//               New Game
//             </button>
//             <button className="bg-gray-700 px-3 py-2 rounded-md">Games</button>
//             <button className="bg-gray-700 px-3 py-2 rounded-md">
//               Players
//             </button>
//           </div>

//           {/* Timer and Play Button */}
//           <div className="bg-gray-700 p-4 rounded-md text-center text-white">
//             <p className="text-green-500 text-lg">10 min</p>
//             <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 mt-2 rounded-lg w-full">
//               Play
//             </button>
//             <p className="text-sm text-gray-400 mt-2">Custom</p>
//           </div>

//           {/* Play a Friend and Tournaments */}
//           <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center space-x-3">
//             {/* <img src="/friend-icon.png" alt="Play Friend" className="w-6 h-6" /> */}
//             <span>Play a Friend</span>
//           </button>
//           <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center space-x-3">
//             {/* <img
//               src="/tournament-icon.png"
//               alt="Tournaments"
//               className="w-6 h-6"
//             /> */}
//             <span>Tournaments</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from 'chess.js'

export const INIT_GAME = "init-game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [board, setBoard] = useState(new Chess());

  useEffect (() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message)
      switch (message.type) {
        case INIT_GAME:
          setBoard(new Chess());
          console.log("Game Initialized");
          break;
          case MOVE:
            { const move = message.payload;
            board.move(move);
            console.log("Move made");
            break; }
            case GAME_OVER:
              console.log("Game over");
              break;
      }
    }
  }, [board, socket]);

  if (!socket) return <div>Connecting...</div>

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 bg-red-200">
            <ChessBoard />
          </div>
          <div className="col-span-2 bg-green-200 w-full">
          <Button onClick={() => {
              socket.send(JSON.stringify({
                type: INIT_GAME
              }))
            }}
          > play Online
          </Button>         
           </div>
        </div>
      </div>
    </div>
  );
};
