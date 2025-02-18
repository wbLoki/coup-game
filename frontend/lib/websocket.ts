let socket: WebSocket | null = null;

export const connectWebSocket = ({
    gameId,
    userId,
}: {
    gameId: string;
    userId: string;
}) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(
            `ws://localhost:8000/ws/${userId}?gameId=${gameId}`
        );

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message from server:', data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };
    }
};

export const sendScore = (score: number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'score', score }));
    }
};

export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
};
