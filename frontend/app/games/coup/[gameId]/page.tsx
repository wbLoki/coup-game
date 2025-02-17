import Table from '../Table';
import Actions from '../Actions';
import PlayersList from '@/components/PlayersList';
import Reactions from '../Reactions';

const players = [
    { name: 'Alice', icon: '/avatars/alice.png', premium: false },
    { name: 'Bob', icon: '/avatars/bob.png', premium: true },
    { name: 'Eve', icon: '/avatars/eve.png', premium: true },
    { name: 'Kamal', icon: '/avatars/eve.png', premium: false },
    { name: 'Loki', icon: '/avatars/eve.png', premium: true },
    { name: 'Ayoub', icon: '/avatars/eve.png', premium: false },
];

export default async function GamePage({
    params,
}: {
    params: Promise<{ gameId: string }>;
}) {
    const gameId = (await params).gameId;
    return (
        <div className='flex '>
            <div className='flex flex-col w-full'>
                <Reactions reactions={[{ id: 1, title: 'test' }]} />
                <div className='flex justify-evenly w-full'>
                    <div className='p-4'>
                        <Actions />
                    </div>
                    <Table players={players} />
                </div>
            </div>
            <div className='max-h-96 overflow-auto min-w-fit'>
                <PlayersList players={players} />
            </div>
        </div>
    );
}
