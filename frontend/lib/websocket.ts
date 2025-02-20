import { Action, Tabla, WebSocketMessage } from '@/types/coup.types';

const userId = new URLSearchParams(window.location.search).get('userId');
const gameId = window.location.pathname.split('/')[3];
var apiDomain = 'localhost:8000/ws';
var socket = new WebSocket(`ws://${apiDomain}/${userId}?gameId=${gameId}`);

export const connectWebSocket = ({
    setMessage,
}: {
    setMessage: (message: Tabla | Action) => void;
}) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log(`ws://${apiDomain}/${gameId}`);

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const data: Tabla | Action = JSON.parse(event.data);
            console.log('Message from server:', data);
            setMessage(data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            return error;
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };
    }
};

export const sendAction = (action: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('Sending action: ', action);
        socket.send(JSON.stringify({ type: 'action', subtype: action }));
    }
};

export const sendReaction = (action: 'challenge' | 'allow') => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('Sending action: ', action);
        socket.send(JSON.stringify({ type: 'reaction', subtype: action }));
    }
};

export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
        // socket = null;
    }
};
