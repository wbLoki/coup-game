import { title } from '@/components/primitives';
import Table from './Table';
import Actions from './Actions';

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
            <div className='flex flex-col'>players:</div>
        </div>
    );
}
