import Card from './Card';

const players = [
    { id: 1, name: 'Alice', avatar: '/avatars/alice.png' },
    { id: 2, name: 'Bob', avatar: '/avatars/bob.png' },
    { id: 3, name: 'Charlie', avatar: '/avatars/charlie.png' },
    { id: 4, name: 'Dave', avatar: '/avatars/dave.png' },
    { id: 5, name: 'Eve', avatar: '/avatars/eve.png' },
];

export default function Table() {
    return (
        <div className='relative w-96 h-96 rounded-full border-4 border-gray-300 bg-green-600 m-36'>
            {players.map((player, index) => {
                const angle = (index / players.length) * 2 * Math.PI;
                const x = 50 + 70 * Math.cos(angle);
                const y = 50 + 70 * Math.sin(angle);

                return (
                    <div
                        key={player.id}
                        className='absolute flex font-bold flex-col items-center justify-center'
                        style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <span>{player.name}</span>
                        <div className='h-32 relative w-40'>
                            <Card position={0} card='duke' />
                            <Card position={1} card='captain' />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
