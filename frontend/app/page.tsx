'use client';
import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { DiscordIcon, NewIcon, PopularIcon } from '@/components/icons';
import { Tab, Tabs } from '@heroui/tabs';
import { GameCard } from '@/components/GameCard';

export default function Home() {
    const popularGames = [
        {
            title: 'Coup',
            liked: true,
            genre: 'Strategy',
            players: '2-8',
            img: '/games/coup/coup.jpg',
            href: '/games/coup',
        },
        {
            title: 'Settlers of Catan',
            liked: false,
            genre: 'Strategy',
            players: '2-4',
        },
        {
            title: 'Scrabble',
            liked: false,
            genre: 'Strategy',
            players: '2-4',
        },
        {
            title: 'Risk',
            liked: false,
            genre: 'Strategy',
            players: '2-4',
        },
        {
            title: 'Monopoly',
            liked: false,
            genre: 'Strategy',
            players: '2-4',
        },
    ];
    const newGames = [
        {
            title: 'Ticket to Ride',
            liked: false,
            genre: 'Strategy',
            players: '2-5',
        },
        {
            title: 'Codenames',
            liked: true,
            genre: 'Party',
            players: '2-8',
        },
        {
            title: 'Azul',
            liked: false,
            genre: 'Abstract',
            players: '2-4',
        },
        {
            title: 'Pandemic',
            liked: false,
            genre: 'Co-op',
            players: '2-4',
        },
        {
            title: 'Carcassonne',
            liked: false,
            genre: 'Tile Placement',
            players: '2-5',
        },
    ];

    return (
        <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
            <div className='inline-block max-w-xl text-center justify-center'>
                <span className={title()}>Play&nbsp;</span>
                <span className={title({ color: 'violet' })}>
                    board games&nbsp;
                </span>
                <br />
                <span className={title()}>
                    online with friends, anytime, anywhere!
                </span>
                <div className={subtitle({ class: 'mt-4' })}>
                    Friendly, fun and engaging board games.
                </div>
            </div>

            <div className='flex gap-3'>
                <Link
                    isExternal
                    className={buttonStyles({
                        variant: 'bordered',
                        radius: 'full',
                    })}
                    href={siteConfig.links.discord}
                >
                    <DiscordIcon size={20} />
                    Visit our discord server
                </Link>
                <Link
                    isExternal
                    className={buttonStyles({
                        color: 'primary',
                        radius: 'full',
                        variant: 'shadow',
                    })}
                    href={
                        siteConfig.navItems.find(
                            (item) => item.label === 'Games'
                        )?.href
                    }
                >
                    Start playing now!
                </Link>
            </div>

            <div className='mt-8 max-w-4xl'>
                <div className='flex w-full flex-col'>
                    <Tabs aria-label='Options' size='lg' color='warning'>
                        <Tab
                            key='new'
                            title={
                                <div className='flex items-center space-x-2'>
                                    <NewIcon />
                                    <span>New</span>
                                </div>
                            }
                        >
                            <div className='grid grid-cols-1 sm:grid-cols-2 grid-rows-3 gap-4 p-2 rounded-lg bg-warning-100/30'>
                                {newGames.slice(0, 6).map((game, index) => (
                                    <GameCard key={index} game={game} />
                                ))}
                            </div>
                        </Tab>
                        <Tab
                            key='popular'
                            title={
                                <div className='flex items-center space-x-2'>
                                    <PopularIcon />
                                    <span>Popular</span>
                                </div>
                            }
                        >
                            <div className='grid grid-cols-1 sm:grid-cols-2 grid-rows-3 gap-4 p-2 rounded-lg bg-warning-100/30'>
                                {popularGames.slice(0, 6).map((game, index) => (
                                    <GameCard key={index} game={game} />
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </section>
    );
}

