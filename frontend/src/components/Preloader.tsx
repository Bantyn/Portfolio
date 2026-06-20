import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const steps = ["001", "050", "100"];

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Transition from 001 to 050 after 1.0s
    const timer1 = setTimeout(() => {
      setStepIndex(1);
    }, 1000);

    // Transition from 050 to 100 after 2.1s
    const timer2 = setTimeout(() => {
      setStepIndex(2);
    }, 2100);

    // Start exit sequence after 3.2 seconds
    const timerExit = setTimeout(() => {
      setIsVisible(false);
      (window as any).hasPreloaderRun = true;
      window.dispatchEvent(new Event('preloaderStartExit'));
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timerExit);
      document.body.style.overflow = '';
    };
  }, []);

  // Split the current step string into three individual digits
  const digits = steps[stepIndex].split("");

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
      }}
    >
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-[#E6E2CD]"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.5,
              ease: [0.21, 1.01, 0.34, 1.02] // consistent premium easing
            }
          }}
        >
          {/* Container holding three staggered digit boxes */}
          <div className="flex items-center justify-center gap-[0.5vw]">
            {digits.map((digit, index) => (
              <div
                key={index}
                className="h-[28vw] md:h-[23vw] lg:h-[18vw] w-[12vw] md:w-[9vw] lg:w-[7.5vw] overflow-hidden relative flex items-center justify-center"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${index}-${stepIndex}`}
                    initial={{ y: "100%", opacity: 1 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1], // Snappy premium ease
                      delay: index * 0.12 // Stagger delay between digit boxes
                    }}
                    style={{ fontFamily: "'Anton', sans-serif" }}
                    className="text-[25vw] md:text-[20vw] lg:text-[16vw] font-normal select-none leading-none text-[#E6E2CD] absolute"
                  >
                    {digit}
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
