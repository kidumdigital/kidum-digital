"use client";
import React, { useState, useEffect, useRef } from 'react';

const CARD_VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_171347_f640c30d-ec21-426a-98bc-77e07c2c60cb.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4',
];

const CARD_DETAILS = [
  { number: '4232 8908 1121 4892', name: 'ZACHARY MERCER', cvv: '382' },
  { number: '4154 7831 9904 5124', name: 'SOPHIA MARTINEZ', cvv: '109' },
  { number: '5457 4120 7733 9035', name: 'BENJAMIN CARTER', cvv: '764' },
  { number: '4441 5567 1223 2468', name: 'EMILY MORRISON', cvv: '491' },
  { number: '5375 8891 2234 7713', name: 'JACKSON REID', cvv: '255' },
];

export default function CardCarousel() {
  const cardCount = 5;
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);
  const progress = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const [metrics, setMetrics] = useState({ cardW: 336, cardH: 211 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };
    const handleMouseLeave = () => { mouse.current.targetX = 0; mouse.current.targetY = 0; };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => { window.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseleave', handleMouseLeave); };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let cardW = Math.round(w * 0.16 + 130);
      const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
      cardW = Math.round(cardW * heightFactor);
      cardW = Math.min(336, Math.max(150, cardW));
      const cardH = Math.round(cardW / 1.5925);
      setMetrics({ cardW, cardH });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderLoop = () => {
    progress.current += 0.0016;
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = window.innerHeight;
    const { cardH } = metrics;
    const continuousProgress = progress.current;
    const roundedIndex = Math.round(continuousProgress);
    const diffFromRound = continuousProgress - roundedIndex;
    const easedDiff = Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2) / 2;
    const virtualActiveIndex = roundedIndex + easedDiff;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      let offset = i - virtualActiveIndex;
      const halfCount = cardCount / 2;
      while (offset > halfCount) offset -= cardCount;
      while (offset < -halfCount) offset += cardCount;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);
      const gap = 36;
      const peekAmount = -55;
      const D = 1350;

      if (absOffset > 3.0) { card.style.visibility = 'hidden'; continue; }
      else { card.style.visibility = 'visible'; }

      let y = 0, z = 0, rot = 0;

      if (absOffset <= 1) {
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);
        y = -sign * (easedT * (cardH + gap));
        z = 400 + easedT * (220 - 400);
        rot = easedT * 132;
      } else if (absOffset <= 2) {
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);
        const zEnd = -60;
        const sEnd = D / (D - zEnd);
        const yEnd = (h / 2 - peekAmount) / sEnd - (cardH / 2);
        y = -sign * ((cardH + gap) + easedT * (yEnd - (cardH + gap)));
        z = 220 + easedT * (zEnd - 220);
        rot = 132 + easedT * (175 - 132);
      } else {
        const t = Math.min(absOffset - 2, 1);
        const easedT = t * t * (3 - 2 * t);
        const zStart = -60, zEnd3 = -250;
        const sEnd2 = D / (D - zStart);
        const yEnd2 = (h / 2 - peekAmount) / sEnd2 - (cardH / 2);
        const sEnd3 = D / (D - zEnd3);
        const yEnd3 = (h / 2 + 100) / sEnd3 + (cardH / 2);
        y = -sign * (yEnd2 + easedT * (yEnd3 - yEnd2));
        z = zStart + easedT * (zEnd3 - zStart);
        rot = 175 + easedT * (195 - 175);
      }

      const localCardRotation = -sign * rot;
      const centerFactor = Math.max(0, 1 - absOffset);
      const activeTiltX = -mouse.current.y * 12 * centerFactor;
      const activeTiltY = mouse.current.x * 15 * centerFactor;

      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = '1';
      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${(localCardRotation + activeTiltX).toFixed(2)}deg) rotateY(${activeTiltY.toFixed(2)}deg) rotateZ(-3deg)`;
    }
  };

  useEffect(() => {
    const tick = () => { renderLoop(); frameId.current = requestAnimationFrame(tick); };
    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [metrics]);

  const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
      style={{ perspective: '1350px' }}>
      <div className="absolute"
        style={{ width: `${metrics.cardW}px`, height: `${metrics.cardH}px`, transformStyle: 'preserve-3d' }}>
        {Array.from({ length: cardCount }).map((_, i) => (
          <div key={i} ref={(el) => { cardsRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ width: `${metrics.cardW}px`, height: `${metrics.cardH}px`, transformStyle: 'preserve-3d', backfaceVisibility: 'visible' }}>
            {thicknessLayers.map((zOffset, layerIdx) => {
              const isFrontFace = layerIdx === thicknessLayers.length - 1;
              const isBackFace = layerIdx === 0;
              const videoSrc = CARD_VIDEOS[i % CARD_VIDEOS.length];

              if (!isFrontFace && !isBackFace) {
                return (
                  <div key={layerIdx} className="absolute inset-0 rounded-[16px] border border-[#808080] pointer-events-none overflow-hidden"
                    style={{ backgroundColor: '#808080', transform: `translateZ(${zOffset}px)` }} />
                );
              }

              if (isFrontFace) {
                return (
                  <div key={layerIdx} className="absolute inset-0 rounded-[16px] border border-white/15 pointer-events-none overflow-hidden"
                    style={{ backgroundColor: '#0f0f0f', transform: `translateZ(${zOffset}px)`, backfaceVisibility: 'hidden', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}>
                    <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover rounded-[16px]" />
                    <div className="absolute inset-0 p-5 sm:p-6 text-white h-full w-full z-10 bg-black/15">
                      {/* Chip */}
                      <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2">
                        <svg className="w-6 h-6 sm:w-[29px] sm:h-[29px]" viewBox="0 0 60 60" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M20 8H40V14C40.0016 14.5299 40.2128 15.0377 40.5875 15.4125C40.9623 15.7872 41.4701 15.9984 42 16H59V24H42C41.4701 24.0016 40.9623 24.2128 40.5875 24.5875C40.2128 24.9623 40.0016 25.4701 40 26V52H20V8ZM18 8H8.00039C4.47435 8 1.56576 10.6083 1.08 14H18V8ZM1 16V24V26V34V36V44H18V36H1V34H18V26H1V24H18V16H1ZM1.08 46C1.56576 49.3917 4.47435 52 8.00039 52H18V46H1.08ZM42 14V8H52.0004C55.5264 8 58.4342 10.6084 58.92 14H42ZM59 26H42V34H59V26ZM59 36H42V44H59V36ZM52.0004 52H42V46H58.92C58.4342 49.3916 55.5264 52 52.0004 52Z" fill={`url(#chip_${i})`} />
                          <defs>
                            <linearGradient id={`chip_${i}`} x1="30" y1="8" x2="30" y2="52" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white" /><stop offset="1" stopColor="#999999" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      {/* Circles bottom right */}
                      <div className="absolute right-5 sm:right-6 bottom-5 sm:bottom-6 flex -space-x-3 items-center opacity-90">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 backdrop-blur-[1px] border border-white/10" />
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/35 backdrop-blur-[1px] border border-white/10" />
                      </div>
                      {/* Brand top right */}
                      <div className="absolute right-5 sm:right-6 top-5 sm:top-6">
                        <span className="text-white font-black text-xs tracking-widest opacity-80">KIDUM</span>
                      </div>
                    </div>
                  </div>
                );
              }

              if (isBackFace) {
                const details = CARD_DETAILS[i % CARD_DETAILS.length];
                return (
                  <div key={layerIdx} className="absolute inset-0 rounded-[16px] border border-white/15 pointer-events-none overflow-hidden"
                    style={{ backgroundColor: '#0f0f0f', transform: `translateZ(${zOffset}px) rotateX(180deg)`, backfaceVisibility: 'hidden', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ filter: 'blur(16px)', transform: 'scale(1.15)' }}>
                      <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="absolute left-0 right-0 top-4 sm:top-5 h-7 sm:h-9 bg-black/85 backdrop-blur-md z-10" />
                    <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-5 z-20 flex flex-col gap-0.5 sm:gap-1 text-left" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      <div className="font-mono text-[10px] sm:text-[12px] font-medium tracking-[0.14em] text-white select-none">{details.number}</div>
                      <div className="font-mono text-[7px] sm:text-[9px] font-medium text-white/70 tracking-wide flex items-center gap-2 select-none">
                        <span className="uppercase">{details.name}</span>
                        <span className="text-white/40">•</span>
                        <span>CVV: {details.cvv}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
