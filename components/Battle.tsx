'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import EnergyBar from './EnergyBar';

interface BattleProps {
    player: 'kaan' | 'kadir';
    onWin: (winner: 'kaan' | 'kadir') => void;
}

export default function Battle({ player, onWin }: BattleProps) {
    const [position, setPosition] = useState(50);
    const [shakeIntensity, setShakeIntensity] = useState(0);
    const [kaanScore, setKaanScore] = useState(0);
    const [kadirScore, setKadirScore] = useState(0);

    const handleKaanPress = useCallback(() => {
        setPosition((prev) => {
            const newPos = Math.max(0, prev - 1);
            if (newPos <= 5) {
                onWin('kaan');
            }
            return newPos;
        });
        setKaanScore((prev) => prev + 1);
        setShakeIntensity(Math.random() * 3);
    }, [onWin]);

    const handleKadirPress = useCallback(() => {
        setPosition((prev) => {
            const newPos = Math.min(100, prev + 1);
            if (newPos >= 95) {
                onWin('kadir');
            }
            return newPos;
        });
        setKadirScore((prev) => prev + 1);
        setShakeIntensity(Math.random() * 3);
    }, [onWin]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'a') {
                handleKaanPress();
            } else if (e.key.toLowerCase() === 'l') {
                handleKadirPress();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKaanPress, handleKadirPress]);

    useEffect(() => {
        if (shakeIntensity > 0) {
            const timer = setTimeout(() => setShakeIntensity(0), 100);
            return () => clearTimeout(timer);
        }
    }, [shakeIntensity]);

    return (
        <div
            className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
                transform: shakeIntensity > 0 ? `translate(${Math.random() * shakeIntensity - shakeIntensity / 2}px, ${Math.random() * shakeIntensity - shakeIntensity / 2}px)` : 'none',
            }}
        >
            <ParticleBackground />

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-6xl px-8"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-4 bg-gradient-to-r from-kaan via-purple-500 to-kadir bg-clip-text text-transparent">
                        THE BATTLE
                    </h1>
                    <p className="text-gray-400 font-inter">First to push the barrier wins!</p>
                </div>

                {/* Player Info */}
                <div className="flex justify-between items-center mb-8">
                    <motion.div
                        className="glass-dark px-6 py-4 rounded-xl border-2 border-kaan"
                        animate={{
                            scale: position < 30 ? [1, 1.05, 1] : 1,
                            boxShadow: position < 30 ? [
                                '0 0 10px #00f0ff',
                                '0 0 30px #00f0ff',
                                '0 0 10px #00f0ff'
                            ] : '0 0 10px rgba(0,240,255,0.3)',
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-kaan text-glow-kaan">
                            KAAN
                        </h2>
                        <p className="text-gray-400 text-sm">Clicks: {kaanScore}</p>
                        <p className="text-xs text-gray-500 mt-1">Press 'A'</p>
                    </motion.div>

                    <motion.div
                        className="glass-dark px-6 py-4 rounded-xl border-2 border-kadir"
                        animate={{
                            scale: position > 70 ? [1, 1.05, 1] : 1,
                            boxShadow: position > 70 ? [
                                '0 0 10px #ff00ff',
                                '0 0 30px #ff00ff',
                                '0 0 10px #ff00ff'
                            ] : '0 0 10px rgba(255,0,255,0.3)',
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-kadir text-glow-kadir text-right">
                            KADIR
                        </h2>
                        <p className="text-gray-400 text-sm text-right">Clicks: {kadirScore}</p>
                        <p className="text-xs text-gray-500 mt-1 text-right">Press 'L'</p>
                    </motion.div>
                </div>

                {/* Energy Bar */}
                <div className="mb-8">
                    <EnergyBar position={position} />
                </div>

                {/* Mobile tap zones */}
                <div className="md:hidden grid grid-cols-2 gap-4 mt-12">
                    <button
                        onClick={handleKaanPress}
                        className="h-32 glass-dark border-2 border-kaan rounded-xl font-orbitron text-xl font-bold text-kaan active:scale-95"
                    >
                        TAP FOR KAAN
                    </button>
                    <button
                        onClick={handleKadirPress}
                        className="h-32 glass-dark border-2 border-kadir rounded-xl font-orbitron text-xl font-bold text-kadir active:scale-95"
                    >
                        TAP FOR KADIR
                    </button>
                </div>

                {/* You are playing as indicator */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        You are playing as: <span className={player === 'kaan' ? 'text-kaan font-bold' : 'text-kadir font-bold'}>
                            {player.toUpperCase()}
                        </span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
