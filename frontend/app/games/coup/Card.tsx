import { gameConfig } from '@/config/game';

const players = [
    { id: 1, name: 'Alice', avatar: '/avatars/alice.png' },
    { id: 2, name: 'Bob', avatar: '/avatars/bob.png' },
    { id: 3, name: 'Charlie', avatar: '/avatars/charlie.png' },
    { id: 4, name: 'Dave', avatar: '/avatars/dave.png' },
    { id: 5, name: 'Eve', avatar: '/avatars/eve.png' },
];

export default function Card({
    card,
    position,
}: {
    card: string;
    position: number;
}) {
    const cardValue =
        gameConfig.coup.cards[card as keyof typeof gameConfig.coup.cards];
    const left = position * 70 + 'px';
    return (
        <div
            className='card'
            style={{
                backgroundPosition: `0% ${cardValue}%`,
                backgroundImage: 'url(/games/coup/cards.jpg)',
                left: left,
            }}
        >
            <span className='card-name font-normal'>{card}</span>
        </div>
    );
}
