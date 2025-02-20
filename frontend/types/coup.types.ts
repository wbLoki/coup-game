export type Player = {
    player_id: string;
    credit: number;
    player_turn: number;
    cards: string[];
};

export type WebSocketMessage = {
    type: 'command' | 'reaction';
    subtype: string;
};

export type Tabla = WebSocketMessage & {
    type: 'command';
    players: Player[];
};

export type Action = WebSocketMessage & {
    type: 'reaction';
    player_id: string;
    next: string;
    turn: number;
    target: string | null;
};
