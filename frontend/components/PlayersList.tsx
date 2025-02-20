import { Card, CardBody, CardHeader } from '@heroui/card';
import { User } from '@heroui/user';
import { PremiumIcon } from './icons';
import { Divider } from '@heroui/divider';
import { Player } from '@/types/coup.types';

export default function PlayersList({
    players,
    turn,
}: {
    players: Player[];
    turn: number;
}) {
    console.log('current turn: ', turn);
    return (
        <div className='flex flex-col w-60 gap-2'>
            {players.map(({ player_id: name, credit, player_turn }, index) => (
                <Card key={index} className='bg-background justify-start'>
                    <CardHeader className='flex w-full'>
                        <User
                            avatarProps={{
                                src:
                                    // icon ||
                                    'https://i.pravatar.cc/150?u=a04258114e29026702d',
                            }}
                            description={credit}
                            name={name || 'Jane Doe'}
                            className='flex-1 justify-start'
                        />
                        {/* <PremiumIcon
                            // style={{ color: premium ? 'yellow' : '' }}
                            className={premium ? 'text-warning-400' : ''}
                        /> */}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <span className='text-xs'>
                            {turn === player_turn &&
                                `Waiting for ${name} to play`}
                        </span>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
