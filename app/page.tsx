'use client';

import { useState } from 'react';
import Landing from '@/components/Landing';
import Battle from '@/components/Battle';
import Victory from '@/components/Victory';

type GamePhase = 'landing' | 'battle' | 'victory';

export default function Home() {
    const [phase, setPhase] = useState<GamePhase>('landing');
    const [player, setPlayer] = useState<'kaan' | 'kadir'>('kaan');
    const [winner, setWinner] = useState<'kaan' | 'kadir'>('kaan');

    const handlePlayerSelect = (selectedPlayer: 'kaan' | 'kadir') => {
        setPlayer(selectedPlayer);
        setPhase('battle');
    };

    const handleWin = (winningPlayer: 'kaan' | 'kadir') => {
        setWinner(winningPlayer);
        setPhase('victory');
    };

    return (
        <main className="w-screen h-screen overflow-hidden">
            {phase === 'landing' && <Landing onSelectPlayer={handlePlayerSelect} />}
            {phase === 'battle' && <Battle player={player} onWin={handleWin} />}
            {phase === 'victory' && <Victory winner={winner} />}
        </main>
    );
}
