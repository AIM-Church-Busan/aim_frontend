"use client"
import { motion } from "framer-motion";
import { useState } from "react";

const FlipImageGrid = ({ frontSrc, backSrc, rows = 6, cols = 6, className = "" }) => {
    const [hovered, setHovered] = useState(false);

    const isCornerCell = (row, col) => {
        return (
            (row === 0 && col === 0) ||
            (row === 0 && col === COLS - 1) ||
            (row === ROWS - 1 && col === 0) ||
            (row === ROWS - 1 && col === COLS - 1)
        );
    };
    const cells = Array.from({ length: rows * cols });

    return (
        <div
            className={`relative grid gap-0 ${className}`}
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                perspective: "800px",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {cells.map((_, i) => {
                const row = Math.floor(i / cols);
                const col = i % cols;
                const bgPosition = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;
                const wave = (row + col) * 0.03; // 대각선으로 퍼지는 시차

                return (
                    <div key={i} className="relative [transform-style:preserve-3d]">
                        <motion.div
                            className="absolute inset-0 [transform-style:preserve-3d]"
                            animate={{ rotateY: hovered ? 180 : 0 }}
                            transition={{
                                duration: 0.5,
                                delay: hovered ? wave : (rows + cols) * 0.03 - wave,
                                ease: "easeInOut",
                            }}
                        >
                            {/* 앞면 조각 */}
                            <div
                                className="absolute inset-0 [backface-visibility:hidden]"
                                style={{
                                    backgroundImage: `url(${frontSrc})`,
                                    backgroundSize: `${cols * 100}% ${rows * 100}%`,
                                    backgroundPosition: bgPosition,
                                }}
                            />
                            {/* 뒷면 조각 */}
                            <div
                                className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                                style={{
                                    backgroundImage: `url(${backSrc})`,
                                    backgroundSize: `${cols * 100}% ${rows * 100}%`,
                                    backgroundPosition: bgPosition,
                                }}
                            />
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};

export default FlipImageGrid;