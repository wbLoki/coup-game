import { sendAction } from '@/lib/websocket';
import { Button } from '@heroui/button';

const actions = [
    { id: 1, title: 'income', desc: 'Take $1. Cannot block.' },
    { id: 2, title: 'foreign aid', desc: 'Take $2. Duke can block.' },
    { id: 3, title: 'coup', desc: 'Pay $7. Choose player to lose' },
    { id: 4, title: 'tax', desc: '' },
    { id: 5, title: 'steal', desc: '' },
    { id: 6, title: 'exchange', desc: '' },
    { id: 7, title: 'assassinate', desc: '' },
];

export default function Actions() {
    const handleClick = (e: any) => {
        console.log('clicked: ', e.target.name);
        sendAction(e.target.name);
    };
    return (
        <div className='lg:flex-col flex flex-initial flex-wrap text-center gap-2'>
            <div className='flex-1 uppercase'>
                <span>Actions to take:</span>
            </div>
            <Button
                onPress={handleClick}
                name='income'
                className='action-button'
            >
                <div className='flex flex-col flex-1 text-left self-start'>
                    <span className='capitalize font-bold text-sm'>income</span>
                    <span className='text-xs'>Take $1. Cannot block.</span>
                </div>
            </Button>
            <Button onPress={handleClick} name='aid' className='action-button'>
                <div className='flex flex-col flex-1 text-left self-start'>
                    <span className='capitalize font-bold text-sm'>
                        foreign aid
                    </span>
                    <span className='text-xs'>
                        Take $2.{' '}
                        <span className='role-text bg-purple-800'>Duke</span>{' '}
                        can block.
                    </span>
                </div>
            </Button>
            <Button onPress={handleClick} name='coup' className='action-button'>
                <div className='flex flex-col flex-1 text-left self-start'>
                    <span className='capitalize font-bold text-sm'>coup</span>
                    <span className='text-xs'>
                        Pay $7. Choose player to lose influence. Cannot block.
                    </span>
                </div>
            </Button>
            <Button onPress={handleClick} name='tax' className='action-button'>
                <div className='flex flex-col flex-1 text-left self-start'>
                    <span className='capitalize font-bold text-sm'>
                        tax as{' '}
                        <span className='role-text bg-purple-800'>Duke</span>
                    </span>
                    <span className='text-xs'>Take $3. Cannot block.</span>
                </div>
            </Button>
            <Button className='action-button'>
                <div className='flex flex-col flex-1 text-left self-start'>
                    <span className='capitalize font-bold text-sm'>
                        steal as{' '}
                        <span className='role-text bg-blue-700'>Captain</span>
                    </span>
                    <span className='text-xs'>
                        Steal $2 from another player.{' '}
                        <span className='role-text bg-blue-700'>Captain</span> /{' '}
                        <span className='role-text bg-lime-700'>
                            Ambassador
                        </span>{' '}
                        can block.
                    </span>
                </div>
            </Button>
            <Button className='action-button'>
                <div className='flex flex-col flex-1 text-left self-start'>
                    <span className='capitalize font-bold text-sm'>
                        exchange as{' '}
                        <span className='role-text bg-lime-700'>
                            Ambassador
                        </span>
                    </span>
                    <span className='text-xs'>
                        Exchange 2 cards with the deck. Cannot block.
                    </span>
                </div>
            </Button>
            <Button className='action-button'>
                <div className='flex flex-col flex-1 text-left self-start'>
                    <span className='capitalize font-bold text-sm'>
                        assassinate as{' '}
                        <span className='role-text bg-yellow-900'>
                            assassin
                        </span>
                    </span>
                    <span className='text-xs'>
                        Pay $3. Choose player to lose influence.{' '}
                        <span className='role-text bg-red-800'>contessa</span>{' '}
                        can block.
                    </span>
                </div>
            </Button>
        </div>
    );
}
