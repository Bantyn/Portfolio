import { useState, useRef } from 'react';

interface HoverCharacterProps {
  char: string;
  direction?: 'horizontal' | 'vertical';
}

export default function HoverCharacter({ char, direction = 'horizontal' }: HoverCharacterProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const mouseInside = useRef(false);
  const isTransitioning = useRef(false);

  const triggerAnimation = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setIsAnimated(true);

    setTimeout(() => {
      isTransitioning.current = false;
      if (!mouseInside.current) {
        setIsAnimated(false);
      }
    }, 900);
  };

  const handleMouseEnter = () => {
    mouseInside.current = true;
    triggerAnimation();
  };

  const handleMouseLeave = () => {
    mouseInside.current = false;
    if (!isTransitioning.current) {
      setIsAnimated(false);
    }
  };

  if (char === " ") {
    return <span className="inline-block w-[0.25em]">&nbsp;</span>;
  }

  const isHorizontal = direction === 'horizontal';

  const defaultTransform = isAnimated
    ? (isHorizontal ? 'translateX(-100%)' : 'translateY(-100%)')
    : 'none';

  const hoverTransform = isAnimated
    ? 'none'
    : (isHorizontal ? 'translateX(100%)' : 'translateY(calc(100% + 50px))');

  const transitionEasing = 'cubic-bezier(0.496, 0.004, 0, 1)';

  return (
    <span
      className="inline-block relative cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default state */}
      <span
        className="inline-block transition-transform"
        style={{
          transform: defaultTransform,
          transitionDuration: isAnimated ? '550ms' : '0ms',
          transitionTimingFunction: transitionEasing,
        }}
      >
        {char}
      </span>

      {/* Hover state */}
      <span
        className="absolute inset-0 inline-block transition-transform"
        style={{
          transform: hoverTransform,
          transitionDuration: isAnimated ? '900ms' : '0ms',
          transitionTimingFunction: transitionEasing,
        }}
      >
        {char}
      </span>
    </span>
  );
}
