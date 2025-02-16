import { Button } from '@heroui/button';
import { HeartIcon, PlayerIcon } from '@/components/icons';
import { Card, CardBody } from '@heroui/card';
import { useState } from 'react';
import { Image } from '@heroui/image';
import { useRouter } from 'next/navigation';

type GameType = {
    title: string;
    liked: boolean;
    genre: string;
    players: string;
    img?: string;
    href?: string;
};

export const GameCard = ({ game }: { game: GameType }) => {
    const router = useRouter();
    const { title, liked, genre, players, img, href } = game;
    const [fav, setFav] = useState(liked);
    return (
        <Card
            isBlurred
            className='border-none bg-background/60 dark:bg-default-100/50 max-w-[400px]'
            shadow='sm'
        >
            <CardBody>
                <div className='grid grid-cols-2 gap-6 md:gap-4 items-center justify-center'>
                    <div
                        className='relative cursor-pointer'
                        onClick={() => router.push(href || '/')}
                    >
                        <Image
                            alt='Album cover'
                            className='object-cover aspect-video'
                            height={150}
                            shadow='md'
                            src={
                                img ||
                                'https://heroui.com/images/album-cover.png'
                            }
                            width='100%'
                        />
                    </div>

                    <div className='flex flex-col justify-around h-full'>
                        <Button
                            isIconOnly
                            className='text-default-900/60 data-[hover]:bg-foreground/10 self-end'
                            radius='full'
                            variant='light'
                            onPress={() => setFav((v) => !v)}
                        >
                            <HeartIcon
                                className={
                                    fav ? '[&>path]:stroke-transparent' : ''
                                }
                                fill={fav ? 'currentColor' : 'none'}
                            />
                        </Button>
                        <div className='flex flex-col gap-2'>
                            <div className='flex text-sm justify-between'>
                                <span>Genre:</span>
                                <h3 className='text-foreground/90'>{genre}</h3>
                            </div>
                            <div className='flex text-sm justify-between'>
                                <span>Players:</span>
                                <p className='flex text-small items-center text-foreground/80'>
                                    <PlayerIcon />
                                    {players}
                                </p>
                            </div>
                        </div>
                        <h1 className='text-large font-medium'>{title}</h1>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
