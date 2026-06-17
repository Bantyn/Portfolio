import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const SplitText = ({
  text = '',
  className = '',
  delay = 50, // stagger delay in ms between letters
  duration = 0.8, // duration in seconds per letter
  ease = [0.22, 1, 0.36, 1],
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  animationDelay = 0, // delay before animation starts (in seconds)
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const letters = text.split('');
  
  // @ts-ignore
  const Tag = motion[tag] || motion.p;

  const containerVariants = {
    hidden: { opacity: 1 }, // Keep container visible, children will handle their own from/to
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: animationDelay,
      }
    }
  };

  const childVariants = {
    hidden: { ...from },
    visible: {
      ...to,
      transition: {
        duration: duration,
        ease: ease
      }
    }
  };

  return (
    <Tag
      ref={ref}
      style={{ textAlign, wordWrap: 'break-word', display: 'inline-block' }}
      className={`split-parent whitespace-normal ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (onLetterAnimationComplete) onLetterAnimationComplete();
      }}
    >
      {letters.map((letter: string, i: number) => (
        <motion.span
          key={i}
          variants={childVariants}
          style={{ display: 'inline-block', whiteSpace: letter === ' ' ? 'pre' : 'normal', willChange: 'transform, opacity' }}
        >
          {letter}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
