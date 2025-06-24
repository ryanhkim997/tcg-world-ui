/* components/ui/hex-button.tsx */
"use client"
import clsx from "clsx"
import React from "react"
import HexLeftEdge from "@/public/assets/button/hex-left-edge.svg"
import HexRightEdge from "@/public/assets/button/hex-right-edge.svg"
import HexCenter from "@/public/assets/button/hex-center.svg"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string
}

export const HexButton = ({ children, className, color, ...rest }: Props) => (
  <button
    {...rest}
    className={clsx(
      "relative inline-flex h-[52px] items-stretch leading-none",
      className
    )}
  >
    <HexLeftEdge color={color} className="h-full" />
    <span className="relative flex items-center px-2">
      <HexCenter
        className="absolute inset-0 h-full w-full"
        color={color}
        preserveAspectRatio="none"
      />
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </span>
    <HexRightEdge color={color} className="h-full" />
  </button>
)
