"use client"
import React from "react"

const NOTCH_D =
    "M512.66,0v497.64H0c74.36,0,130.63-59.56,130.63-132.54l1.62-40.56c0-110.6,95.88-206.37,208.6-206.37l36.88-.8c77.91-1.99,128.16-44.93,134.92-117.38Z"
const VB_W = 512.66
const VB_H = 497.64

const POSITION_STYLE = {
    "bottom-right": { right: 0, bottom: 0, flip: "none" },
    "bottom-left": { left: 0, bottom: 0, flip: "scaleX(-1)" },
    "top-right": { right: 0, top: 0, flip: "scaleY(-1)" },
    "top-left": { left: 0, top: 0, flip: "scale(-1, -1)" },
}

const LiquidBox = ({
                       children,
                       className = "w-full h-full",
                       notchSize = 64,
                       notchColor = "fill-white-to-dark",
                       position = "bottom-right",
                       showNotch = true,
                       backgroundImage, // 새로 추가: 이미지 URL을 넘기면 배경으로 채움
                   }) => {
    const { flip, ...posOffset } = POSITION_STYLE[position] ?? POSITION_STYLE["bottom-right"]
    const radius = showNotch ? 150 : 0

    return (
        <div
            className={`${className} relative isolate overflow-hidden`}
            style={
                backgroundImage
                    ? {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }
                    : undefined
            }
        >
            <div
                className="absolute pointer-events-none"
                style={{ width: notchSize, height: notchSize, zIndex: -1, ...posOffset, transform: flip }}
            >
                <svg
                    className={`w-full h-full ${notchColor}`}
                    style={{
                        clipPath: `circle(${radius}% at 100% 100%)`,
                        transition: "clip-path 500ms cubic-bezier(0.34, 1.1, 0.64, 1)",
                    }}
                    viewBox={`0 0 ${VB_W} ${VB_H}`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path d={NOTCH_D} />
                </svg>
            </div>

            {children}
        </div>
    )
}

export default LiquidBox