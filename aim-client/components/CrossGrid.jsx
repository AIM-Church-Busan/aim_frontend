"use client"
import React from "react";

const COLS = 16;
const ROWS = 20;

const isCornerCell = (row, col) => {
    return (
        (row === 0 && col === 0) ||
        (row === 0 && col === COLS - 1) ||
        (row === ROWS - 1 && col === 0) ||
        (row === ROWS - 1 && col === COLS - 1)
    );
};

const isCrossCell = (row, col) => {
    const verticalBar = col >= 6 && col <= 9 && row >= 2 && row <= 17;
    const horizontalBar = row >= 5 && row <= 8 && col >= 3 && col <= 12;
    return verticalBar || horizontalBar || isCornerCell(row, col);
};

const CrossGrid = ({ className = "" }) => {
    const cells = Array.from({ length: ROWS * COLS });

    return (
        <div
            className={`group grid gap-1 ${className}`}
            style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                perspective: "800px",
            }}
        >
            {cells.map((_, i) => {
                const row = Math.floor(i / COLS);
                const col = i % COLS;
                const cross = isCrossCell(row, col);
                const delay = (row + col) * 20; // ms, 대각선 웨이브

                return (
                    <div
                        key={i}
                        style={{
                            transition: `transform 400ms ease ${delay}ms, background-color 0ms linear ${delay + 200}ms`,
                        }}
                        className={`rounded-xs [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] ${
                            cross
                                ? "bg-transparent group-hover:bg-white"
                                : "bg-white group-hover:bg-transparent"
                        }`}
                    />
                );
            })}
        </div>
    );
};

export default CrossGrid;