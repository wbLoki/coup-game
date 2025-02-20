import { sendReaction } from '@/lib/websocket';
import { Action } from '@/types/coup.types';
import { Button } from '@heroui/button';

export default function Reactions({
    action: { player_id: name, subtype: action, target },
}: {
    action: Action;
}) {
    const handleClick = (e: any) => {
        console.log('clicked: ', e.target.name);
        sendReaction(e.target.name);
    };
    return (
        <div className='flex items-center gap-4 p-4 bg-background/40 max-w-2xl mx-auto rounded-lg'>
            {target ? (
                <>
                    <span>
                        {name} wants to use{' '}
                        <span className='text-danger-foreground'>{action}</span>{' '}
                        on {target}
                    </span>
                    <Button>Allow</Button>
                    <Button>Challenge</Button>
                </>
            ) : (
                <>
                    <span>
                        {name} wants to use{' '}
                        <span className='text-warning-500'>{action}</span>
                    </span>
                    <Button onPress={handleClick} name='allow' color='success'>
                        Allow
                    </Button>
                    <Button
                        onPress={handleClick}
                        name='challenge'
                        color='danger'
                    >
                        Challenge
                    </Button>
                </>
            )}
        </div>
    );
}
