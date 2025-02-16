import { title } from '@/components/primitives';
import Table from './Table';
import Actions from './Actions';
import PlayersList from '@/components/PlayersList';

const players = [
    { name: 'Alice', icon: '/avatars/alice.png', premium: false },
    { name: 'Bob', icon: '/avatars/bob.png', premium: true },
    { name: 'Charlie', icon: '/avatars/charlie.png', premium: false },
    { name: 'Dave', icon: '/avatars/dave.png', premium: false },
    { name: 'Eve', icon: '/avatars/eve.png', premium: true },
];

export default async function GamePage({
    params,
}: {
    params: Promise<{ game: string }>;
}) {
    const game = (await params).game;
    return (
        <div className='flex '>
            <div className='flex justify-evenly w-full'>
                <div className='p-4'>
                    <Actions />
                </div>
                <Table />
            </div>
            <PlayersList players={players} />
        </div>
    );
}
