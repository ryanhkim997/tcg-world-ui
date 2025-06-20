"use client"

import Image from "next/image"
import Link from "next/link"
import { Pack } from "@/types/pack"
import React, { useRef, useEffect } from "react"

type PackDisplayProps = {
  pack: Pack
}

export function PackDisplay({ pack }: PackDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reverseIntervalRef = useRef<number | null>(null)

  const { featuredCards, name, price } = pack

  useEffect(() => {
    return () => {
      if (reverseIntervalRef.current) {
        clearInterval(reverseIntervalRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (reverseIntervalRef.current) {
      clearInterval(reverseIntervalRef.current)
      reverseIntervalRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = 1
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      // Step video backwards
      reverseIntervalRef.current = window.setInterval(() => {
        if (videoRef.current) {
          if (videoRef.current.currentTime <= 0.04) {
            videoRef.current.currentTime = 0
            clearInterval(reverseIntervalRef.current!)
            reverseIntervalRef.current = null
            return
          }
          videoRef.current.currentTime -= 0.04
        }
      }, 16)
    }
  }

  return (
    <Link href={`/pull/${pack.id}`}>
      <div
        className="duration-400 group relative w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-card/50 p-4 transition-shadow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shimmer Effect */}
        <div
          className="absolute inset-0 z-20 group-hover:animate-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(-40deg, transparent 40%, rgba(255, 255, 255, 0.25) 50%, transparent 60%)",
            opacity: 0,
          }}
        />
        {/* Corner Border Elements */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 rounded-tl-xl border-l-[0.5px] border-t-[0.5px] border-transparent transition-colors duration-300 group-hover:border-primary" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-4 w-4 rounded-tr-xl border-r-[0.5px] border-t-[0.5px] border-transparent transition-colors duration-300 group-hover:border-primary" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-4 w-4 rounded-bl-xl border-b-[0.5px] border-l-[0.5px] border-transparent transition-colors duration-300 group-hover:border-primary" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-4 w-4 rounded-br-xl border-b-[0.5px] border-r-[0.5px] border-transparent transition-colors duration-300 group-hover:border-primary" />
        <div className="relative aspect-square w-full overflow-visible">
          {/* Video asset, vertically below cards, partially covered */}
          <div className="pointer-events-none absolute left-1/2 top-[68%] z-10 w-[80%] -translate-x-1/2">
            <video
              ref={videoRef}
              src={`https://trainers-paradise.s3.us-west-1.amazonaws.com/pack-assets/portals/green.mp4`}
              muted
              loop
              playsInline
              className="h-auto w-full object-cover"
            />
          </div>
          {/* Cards above the video */}
          {/* Background Left Card */}
          <div className="absolute left-[30%] top-[40%] z-20 w-2/5 -translate-x-1/2 -translate-y-1/2 transform opacity-40 transition-all duration-300 group-hover:left-[25%] group-hover:-rotate-[18deg] group-hover:opacity-100">
            <Image
              src={`https://trainers-paradise.s3.us-west-1.amazonaws.com/card-assets/${featuredCards[0].id}.png`}
              alt={featuredCards[0].name}
              width={250}
              height={350}
              className="h-auto w-full rounded-md"
            />
          </div>
          {/* Background Right Card */}
          <div className="absolute left-[70%] top-[40%] z-20 w-2/5 -translate-x-1/2 -translate-y-1/2 transform opacity-40 transition-all duration-300 group-hover:left-[75%] group-hover:rotate-[18deg] group-hover:opacity-100">
            <Image
              src={`https://trainers-paradise.s3.us-west-1.amazonaws.com/card-assets/${featuredCards[2].id}.png`}
              alt={featuredCards[2].name}
              width={250}
              height={350}
              className="h-auto w-full rounded-md"
            />
          </div>
          {/* Center Card */}
          <div className="absolute left-1/2 top-[40%] z-30 w-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300 group-hover:scale-110">
            <Image
              src={`https://trainers-paradise.s3.us-west-1.amazonaws.com/card-assets/${featuredCards[1].id}.png`}
              alt={featuredCards[1].name}
              width={250}
              height={350}
              className="h-auto w-full rounded-md"
            />
          </div>
        </div>
        {/* Text info as distinct section below video */}
        <div className="mt-10 flex flex-col items-center">
          <p className="text-center">{name}</p>
          <div className="flex items-center justify-center gap-1 text-center">
            <Image
              src={`https://trainers-paradise.s3.us-west-1.amazonaws.com/misc-assets/gem.png`}
              alt="gem"
              width={14}
              height={14}
            />
            <p className="font-bold">{price}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
