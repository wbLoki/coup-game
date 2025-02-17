import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectWebSocket = ({
    gameId,
    userId,
}: {
    gameId: string;
    userId: string;
}) => {
    if (!socket) {
        socket = io(`ws://localhost:8001/ws/${userId}?gameId=${gameId}`);
    }
};

export const sendScore = (score: number) => {
    socket?.emit('score', score);
};

export const listenToPlayers = (callback: (players: any[]) => void) => {
    socket?.on('players', callback);
};

export const disconnectWebSocket = () => {
    socket?.disconnect();
    socket = null;
};
