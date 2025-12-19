'use client';

import { motion } from 'framer-motion';

interface EnergyBarProps {
    position: number; // 0-100, where 0 is Kaan's side, 100 is Kadir's side
}

export default function EnergyBar({ position }: EnergyBarProps) {
    const kaanIntensity = Math.max(0, 50 - position) / 50;
    const kadirIntensity = Math.max(0, position - 50) / 50;

    return (
        <div className="relative w-full max-w-4xl h-8 glass-dark rounded-full overflow-hidden">
            {/* Background track */}
            <div className="absolute inset-0 bg-gradient-to-r from-kaan/20 via-purple-500/20 to-kadir/20" />

            {/* Energy bar fill */}
            <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-kaan to-purple-500"
                style={{
                    width: `${position}%`,
                    boxShadow: `0 0 ${Math.max(10, kaanIntensity * 30)}px ${kaanIntensity > 0.5 ? '#00f0ff' : 'transparent'}`,
                }}
                animate={{
                    width: `${position}%`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />

            <motion.div
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-kadir to-purple-500"
                style={{
                    width: `${100 - position}%`,
                    boxShadow: `0 0 ${Math.max(10, kadirIntensity * 30)}px ${kadirIntensity > 0.5 ? '#ff00ff' : 'transparent'}`,
                }}
                animate={{
                    width: `${100 - position}%`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />

            {/* Center marker */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/50 transform -translate-x-1/2" />

            {/* Position indicator */}
            <motion.div
                className="absolute top-1/2 h-12 w-2 bg-white rounded-full transform -translate-y-1/2"
                style={{
                    left: `${position}%`,
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
                }}
                animate={{
                    left: `${position}%`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
        </div>
    );
}
