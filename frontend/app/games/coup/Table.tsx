import Card from './Card';
import { Player } from '@/types/coup.types';

export default function Table({ players }: { players: Player[] }) {
    return (
        <div className='relative w-96 h-96 rounded-full border-4 border-gray-300 bg-green-600 m-36'>
            {players.map(({ player_id: name, cards }, index) => {
                const angle = (index / players.length) * 2 * Math.PI;
                const x = 50 + 70 * Math.cos(angle);
                const y = 50 + 70 * Math.sin(angle);

                return (
                    <div
                        key={index}
                        className='absolute flex font-bold flex-col items-center justify-center'
                        style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <span>{name}</span>
                        <div className='h-32 relative w-40'>
                            {cards.map((card, index) => {
                                console.log('card: ', card);
                                return (
                                    <Card
                                        key={index}
                                        position={index}
                                        card={card}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <div
                className='absolute flex font-bold flex-col items-center justify-center'
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className='flex h-32 relative justify-center'>
                    <div
                        className='card flex items-center justify-center'
                        style={{
                            backgroundPosition: '0% 0%',
                            backgroundImage: 'url(/games/coup/cards.jpg)',
                        }}
                    >
                        <span
                            style={{ color: 'black' }}
                            className='card-name font-normal -top-5 text-xs'
                        >
                            Deck (4)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
