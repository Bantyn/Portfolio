import { motion } from "motion/react";

export default function PageTransition() {
  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col md:block overflow-hidden">
        
        {/* Desktop Transition - Cover: Left to Right | Reveal: Down to Up */}
        <motion.div
          className="hidden md:block absolute inset-0 bg-[#2C1E16] pointer-events-auto"
          initial={{ clipPath: "inset(0 0 0% 0)" }} // Reveal starting state: fully covered
          animate={{ clipPath: "inset(0 0 100% 0)" }} // Reveal ending state: wipes up (down to up)
          exit={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }} // Cover phase: wipes left to right
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Mobile Transition - Two Divs sliding from Mid to Up/Down */}
        <motion.div
          className="md:hidden w-full h-1/2 bg-[#2C1E16] pointer-events-auto"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          exit={{ y: "0%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="md:hidden w-full h-1/2 bg-[#2C1E16] pointer-events-auto"
          initial={{ y: "0%" }}
          animate={{ y: "100%" }}
          exit={{ y: "0%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </>
  );
}
