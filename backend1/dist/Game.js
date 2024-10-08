"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        // validate the type of move using zod
        if (this.board.moves.length % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.board.moves.length % 2 === 0 && socket !== this.player1) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return;
        }
        if (this.board.isGameOver()) {
            // Send the game over message to both players
            this.player1.emit(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        if (this.board.moves.length % 2 === 0) {
            this.player2.emit(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.emit(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
    }
}
exports.Game = Game;
