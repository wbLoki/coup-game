import { Card, CardBody, CardHeader } from '@heroui/card';
import { User } from '@heroui/user';
import { PremiumIcon } from './icons';
import { Divider } from '@heroui/divider';

type Player = {
    name: string;
    icon: string;
    premium: boolean;
};

export default function PlayersList({ players }: { players: Player[] }) {
    return (
        <div className='flex flex-col w-60 gap-2'>
            {players.map(({ name, icon, premium }, index) => (
                <Card key={index} className='bg-background justify-start'>
                    <CardHeader className='flex w-full'>
                        <User
                            avatarProps={{
                                src:
                                    icon ||
                                    'https://i.pravatar.cc/150?u=a04258114e29026702d',
                            }}
                            description='$2'
                            name={name || 'Jane Doe'}
                            className='flex-1 justify-start'
                        />
                        <PremiumIcon
                            // style={{ color: premium ? 'yellow' : '' }}
                            className={premium ? 'text-warning-400' : ''}
                        />
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <span className='text-xs'>
                            Player is waiting for his turn...
                        </span>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
