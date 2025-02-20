export type GameConfig = typeof gameConfig;

export const gameConfig = {
    coup: {
        cards: {
            XX: { value: 0, name: '' },
            IN: { value: 100, name: 'Inquisitor' },
            CO: { value: 200, name: 'Contessa' },
            CP: { value: 300, name: 'Captain' },
            AM: { value: 400, name: 'Ambassador' },
            ASS: { value: 500, name: 'Assassin' },
            DU: { value: 600, name: 'Duke' },
        },
    },
};
