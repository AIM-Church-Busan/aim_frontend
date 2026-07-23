"use client"
import React from "react";

const COLS = 16;
const ROWS = 20;

const isCircleCell = (row, col) => {
    const centerRow = (ROWS - 1) / 2;
    const centerCol = (COLS - 1) / 2;
    const radius = 0.75; // 0~1 사이, 원 크기 조절

    const dx = (col - centerCol) / (COLS / 2);
    const dy = (row - centerRow) / (ROWS / 2);

    return dx * dx + dy * dy <= radius * radius;
};

const CircleGrid = ({ className = "" }) => {
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
                const circle = isCircleCell(row, col);
                const delay = (row + col) * 20; // ms, 대각선 웨이브

                return (
                    <div
                        key={i}
                        style={{
                            transition: `transform 400ms ease ${delay}ms, background-color 0ms linear ${delay + 200}ms`,
                        }}
                        className={`rounded-xs [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] ${
                            circle
                                ? "bg-white group-hover:bg-transparent"
                                : "bg-transparent group-hover:bg-white"
                        }`}
                    />
                );
            })}
        </div>
    );
};

export default CircleGrid;