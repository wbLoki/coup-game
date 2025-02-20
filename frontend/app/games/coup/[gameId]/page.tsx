'use client';
import Table from '../Table';
import Actions from '../Actions';
import PlayersList from '@/components/PlayersList';
import Reactions from '../Reactions';
import { useEffect, useState } from 'react';
import { connectWebSocket } from '@/lib/websocket';
import { Action, Player, Tabla } from '@/types/coup.types';

export default function GamePage() {
    const [message, setMessage] = useState<Tabla | Action>({
        type: 'command',
        subtype: '',
        players: [],
    });
    const [players, setPlayers] = useState<Player[]>([]);
    const [turn, setTurn] = useState(0);
    useEffect(() => {
        connectWebSocket({
            setMessage: (message: Tabla | Action) => setMessage(message),
        });
    }, []);
    useEffect(() => {
        setMessage(message);
        if ('turn' in message) {
            setTurn(message.turn);
        }
        if ('players' in message) {
            console.log('hello!!!!: ', message.players);
            setPlayers(message.players);
        }
    }, [message]);
    return (
        <div className='flex '>
            <div className='flex flex-col w-full'>
                {message.type === 'reaction' && <Reactions action={message} />}
                <div className='flex justify-evenly w-full'>
                    <div className='p-4'>
                        <Actions />
                    </div>
                    <Table players={players} />
                </div>
            </div>
            <div className='max-h-96 overflow-auto min-w-fit'>
                <PlayersList players={players} turn={turn} />
            </div>
        </div>
    );
}
