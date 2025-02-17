import { Button } from '@heroui/button';

type Reaction = {
    id: number;
    title: string;
};

export default function Reactions({ reactions }: { reactions: Reaction[] }) {
    return (
        <div className='p-4 bg-background/40 max-w-2xl mx-auto rounded-lg'>
            {reactions.map(({ id, title }) => (
                <Button key={id}>{title}</Button>
            ))}
        </div>
    );
}
