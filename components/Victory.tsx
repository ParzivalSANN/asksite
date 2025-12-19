'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface VictoryProps {
    winner: 'kaan' | 'kadir';
}

export default function Victory({ winner }: VictoryProps) {
    const [showGlitch, setShowGlitch] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        // After 3 seconds, trigger glitch effect
        const glitchTimer = setTimeout(() => {
            setShowGlitch(true);
        }, 3000);

        // After glitch (3.5 seconds), show celebration
        const celebrationTimer = setTimeout(() => {
            setShowCelebration(true);

            // Trigger confetti explosion
            const duration = 5000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#00f0ff', '#ff00ff', '#8b5cf6', '#fbbf24', '#ec4899'],
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#00f0ff', '#ff00ff', '#8b5cf6', '#fbbf24', '#ec4899'],
                });
            }, 250);

            return () => clearInterval(interval);
        }, 3500);

        return () => {
            clearTimeout(glitchTimer);
            clearTimeout(celebrationTimer);
        };
    }, []);

    const winnerColor = winner === 'kaan' ? 'text-kaan' : 'text-kadir';
    const winnerGlow = winner === 'kaan' ? 'text-glow-kaan' : 'text-glow-kadir';

    return (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
            {/* Background transition */}
            <motion.div
                className="absolute inset-0"
                initial={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)' }}
                animate={{
                    background: showCelebration
                        ? 'radial-gradient(ellipse at center, #4338ca 0%, #7c3aed 50%, #ec4899 100%)'
                        : 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
                }}
                transition={{ duration: 1 }}
            />

            <AnimatePresence mode="wait">
                {!showCelebration ? (
                    // Initial victory announcement
                    <motion.div
                        key="victory"
                        className={`z-10 text-center ${showGlitch ? 'glitch' : ''}`}
                        data-text={`${winner.toUpperCase()} WINS THE GIFT!`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: 1,
                            scale: showGlitch ? [1, 1.2, 0.8, 1.1, 1] : 1,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className={`text-6xl md:text-9xl font-orbitron font-black ${winnerColor} ${winnerGlow}`}>
                            {winner.toUpperCase()}
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mt-4">
                            WINS THE GIFT!
                        </h2>
                    </motion.div>
                ) : (
                    // Celebration reveal
                    <motion.div
                        key="celebration"
                        className="z-10 text-center px-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <motion.h1
                            className="text-5xl md:text-8xl font-orbitron font-black mb-8"
                            style={{
                                background: 'linear-gradient(45deg, #00f0ff, #ff00ff, #fbbf24, #00f0ff)',
                                backgroundSize: '300% 300%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        >
                            İYİ Kİ DOĞDUNUZ BÜLLÜKLERİNE KURBANLAR! 🎉
                        </motion.h1>

                        <motion.div
                            className="glass-dark px-8 py-6 rounded-2xl max-w-3xl mx-auto"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <p className="text-xl md:text-2xl font-inter text-white/90 leading-relaxed">
                                Kazanan hediyeyi kapar ama kardeşlik baki kalır.
                            </p>
                            <p className="text-2xl md:text-3xl font-orbitron font-bold mt-4 bg-gradient-to-r from-kaan to-kadir bg-clip-text text-transparent">
                                Doğum gününüz kutlu olsun yavrular,Nice beraber Yıllara Kaan & Kadir! 🎂
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-8 text-6xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, rotate: [0, 10, -10, 10, 0] }}
                            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                        >
                            🎊 🎈 🎁 🎉 🎊
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
