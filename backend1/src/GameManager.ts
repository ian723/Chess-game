import { WebSocket } from "ws";

export class GameManager {
    private games: Game[];
    private pendingfUser: WebSocket;
    private users: WebSocket[];

    constructor() {
        this.games = [];
    }

    addUser(socket: WebSocket) {

    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
    }

    private handleMessage() {

    }
}