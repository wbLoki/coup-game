type Message = {
    type: string;
    message: string;
    player: object;
    gameId: string;
};

const gameLogic = (message: Message) => {
    if (message.type === 'init') {
    }
};
