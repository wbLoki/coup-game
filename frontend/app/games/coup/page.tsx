'use client';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { connectWebSocket } from '@/lib/websocket';
import { useState } from 'react';

export default function GamePage() {
    const [gameData, setGameData] = useState({ userId: '', gameId: '' });
    const handleCreateGame = () => {
        console.log('creating game...');
        connectWebSocket(gameData);
    };
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col max-w-sm w-full gap-4'>
                <Input
                    label='Username'
                    placeholder='Enter your username'
                    type='text'
                    variant='underlined'
                    value={gameData.userId}
                    onChange={(e) =>
                        setGameData({ ...gameData, userId: e.target.value })
                    }
                />
                <Input
                    label='Game ID'
                    placeholder='Enter game ID'
                    type='text'
                    variant='underlined'
                    value={gameData.gameId}
                    onChange={(e) =>
                        setGameData({ ...gameData, gameId: e.target.value })
                    }
                />
                <Button onPress={handleCreateGame}>Create Game</Button>
            </div>
        </div>
    );
}
