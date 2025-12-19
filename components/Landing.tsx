'use client';

import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

interface LandingProps {
    onSelectPlayer: (player: 'kaan' | 'kadir') => void;
}

export default function Landing({ onSelectPlayer }: LandingProps) {
    return (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
            <ParticleBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="z-10 text-center"
            >
                <motion.h1
                    className="text-6xl md:text-8xl font-orbitron font-black mb-4 bg-gradient-to-r from-kaan via-purple-500 to-kadir bg-clip-text text-transparent"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    THE BIRTHDAY BATTLE
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-3xl font-orbitron mb-16 text-gray-300"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Who are you?
                </motion.p>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <motion.button
                        onClick={() => onSelectPlayer('kaan')}
                        className="group relative px-12 py-6 bg-kaan/20 glass border-2 border-kaan rounded-xl font-orbitron text-2xl font-bold text-kaan hover:bg-kaan/30 hover:scale-105 neon-glow-kaan"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="absolute inset-0 bg-kaan/10 rounded-xl animate-pulse-glow" />
                        <span className="relative z-10 text-glow-kaan">I AM KAAN</span>
                    </motion.button>

                    <motion.button
                        onClick={() => onSelectPlayer('kadir')}
                        className="group relative px-12 py-6 bg-kadir/20 glass border-2 border-kadir rounded-xl font-orbitron text-2xl font-bold text-kadir hover:bg-kadir/30 hover:scale-105 neon-glow-kadir"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="absolute inset-0 bg-kadir/10 rounded-xl animate-pulse-glow" />
                        <span className="relative z-10 text-glow-kadir">I AM KADIR</span>
                    </motion.button>
                </div>

                <motion.p
                    className="mt-12 text-gray-500 font-inter text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    Press 'A' for Kaan • Press 'L' for Kadir
                </motion.p>
            </motion.div>
        </div>
    );
}
