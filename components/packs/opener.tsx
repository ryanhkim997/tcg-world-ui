'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

const cards = [{id: 961514, name: "Lillie (Full Art) - SM - Ultra Prism (SM05)", weight: 0.1}, {id: 2572271, name: "Misty's Favor (Full Art) - SM - Unified Minds (SM11)", weight: 0.25}, {id: 7800279, name: "Lisia's Appeal - #246 - SV08: Surging Sparks (SV08)", weight: 1}, {id: 2336171, name: "Marnie (Secret) - SWSH01: Sword & Shield Base Set (SWSH01)", weight: 5}, {id: 4637116, name: "Cynthia's Ambition #GG60 Pokemon Crown Zenith", weight: 20}, {id: 7800267, name: "Lisia's Appeal - 234/191 - SV08: Surging Sparks (SV08)", weight: 5}, {id: 8244579, name: "Eri - SV: Prismatic Evolutions (PRE)", weight: 4}, {id: 7800265, name: "Drayton - 232/191 - SV08: Surging Sparks (SV08)", weight: 7}, {id: 8244585, name: "Raifort - SV: Prismatic Evolutions (PRE)", weight: 20}, {id: 8321670, name: "Carmine (Poke Ball Pattern) - SV: Prismatic Evolutions (PRE)", weight: 15}, {id: 7418617, name: "Briar - 132/142 - SV07: Stellar Crown (SV07)", weight: 14}, {id: 5809542, name: "Erika's Invitation - #160 - SV: Scarlet & Violet 151", weight: 9.65}];

const cardWidth = 100;
const gapWidth = 16; // from gap-x-4
const cardWidthWithGap = cardWidth + gapWidth;
const repeatCount = 20;

function getRepeatedCards(cards: {id: number, name: string, weight: number}[], repeat: number) {
  return Array(repeat).fill(cards).flat();
}

function deterministicResult() {
  const total = cards.reduce((sum, card) => sum + card.weight, 0);
  let rnd = Math.random() * total;
  for (let i = 0; i < cards.length; i++) {
    if (rnd < cards[i].weight) return cards[i];
    rnd -= cards[i].weight;
  }
  return cards[0];
}

export default function CardCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const [containerWidth, setContainerWidth] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3); // default fallback
    const [resultCard, setResultCard] = useState<{id: number, name: string, weight: number} | null>(null);
  
    const repeatedCards = React.useMemo(() => getRepeatedCards(cards, repeatCount), []);
  
    // Update containerWidth on mount and window resize
    useEffect(() => {
      function updateWidth() {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.clientWidth);
        }
      }
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);
  
    // Update visibleCards when containerWidth changes
    useEffect(() => {
      if (containerWidth) {
        setVisibleCards(Math.floor(containerWidth / cardWidthWithGap));
      }
    }, [containerWidth]);
  
    // Calculate center offset for animation
    const centerOffset = ((visibleCards - 1) / 2) * cardWidthWithGap;
  
    function getStopIndex(repeatedCards: {id: number, name: string, weight: number}[], resultCard: {id: number, name: string, weight: number}) {
      const middle = Math.floor(repeatedCards.length / 2);
      let closestIndex = middle;
      let minDistance = repeatedCards.length;
  
      for (let i = 0; i < repeatedCards.length; i++) {
        if (repeatedCards[i].id === resultCard.id) {
          const distance = Math.abs(i - middle);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }
      }
      return closestIndex;
    }
  
    const spin = () => {
      const result = deterministicResult();
      setResultCard(result);
  
      const stopIndex = getStopIndex(repeatedCards, result);
      const offset = stopIndex * cardWidthWithGap - centerOffset;
  
      controls.start({
        x: -offset,
        transition: {
          duration: 3,
          ease: [0.22, 1, 0.36, 1],
        },
      });
    };

    return (
        <div className="w-full flex flex-col items-center mt-10">
          <div ref={containerRef} className="relative overflow-hidden border rounded-xl w-full max-w-full">
            <motion.div
              className="flex gap-x-4"
              animate={controls}
              initial={{ x: 0 }}
              style={{ willChange: 'transform' }}
            >
              {repeatedCards.map((card, idx) => (
                <Image
                  key={idx}
                  src={`https://trainers-paradise.s3.us-west-1.amazonaws.com/card-assets/${card.id}.png`}
                  alt={card.name}
                  width={cardWidth}
                  height={150}
                  className="object-contain"
                />
              ))}
            </motion.div>
          </div>
          <button
            onClick={spin}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Spin
          </button>
          {resultCard && (
            <div className="mt-4 text-xl font-bold text-green-600">
              You got: {resultCard.name}
            </div>
          )}
        </div>
      );
}
