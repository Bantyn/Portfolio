import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import HoverCharacter from '@/components/HoverCharacter';

const letterVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.95,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number] // Snappy premium ease
    }
  }
};

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isReady, setIsReady] = useState(() => !!(window as any).hasPreloaderRun);

  useEffect(() => {
    if (isReady) return;
    const handleStartExit = () => {
      setIsReady(true);
    };
    window.addEventListener("preloaderStartExit", handleStartExit);
    return () => {
      window.removeEventListener("preloaderStartExit", handleStartExit);
    };
  }, [isReady]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 1: [0, 0.4] texts move to join, video moves down
  // Fade out texts AFTER they join
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  // Text movement towards center
  const leftTextX = useTransform(scrollYProgress, [0, 0.4], ["0vw", "25vw"]);
  const rightTextX = useTransform(scrollYProgress, [0, 0.4], ["0vw", "-26vw"]);
  const topLeftTextX = useTransform(scrollYProgress, [0, 0.4], ["0px", "165px"]);
  const topRightTextX = useTransform(scrollYProgress, [0, 0.4], ["0px", "-165px"]);

  // Video drops down in Phase 1, then moves back to center as it scales up
  const videoYDown = useTransform(scrollYProgress, [0, 0.4, 0.85], ["0vh", "38vh", "0vh"]);

  // Calculate dynamic responsive initial width and height (aspect ratio 16:9)
  const startWidth = Math.min(windowSize.width * 0.85, 480);
  const startHeight = startWidth * (9 / 16);

  // Calculate required scale factors to cover full width while keeping 16:9 ratio
  const targetScaleX = windowSize.width / startWidth;
  const targetScaleY = (windowSize.width * (9 / 16)) / startHeight;

  // Phase 2: [0.4, 0.85] video scales up to full screen
  const scaleX = useTransform(scrollYProgress, [0.4, 0.85], [1, targetScaleX]);
  const scaleY = useTransform(scrollYProgress, [0.4, 0.85], [1, targetScaleY]);
  const videoBorderRadius = useTransform(scrollYProgress, [0.4, 0.85], [4, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] select-none">
      <div className="sticky top-[88px] h-[calc(100vh-88px)] w-full flex flex-col justify-between px-6 md:px-12 pb-6 md:pb-8 text-theme-950 font-sans overflow-hidden">
        
        {/* Huge Bold Headline */}
        <motion.div 
          initial={{ y: "30vh" }}
          animate={isReady ? { y: "0vh" } : { y: "30vh" }}
          transition={{
            delay: 0.2,
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1]
          }}
          style={{ opacity: textOpacity }}
          className="w-full flex justify-center items-center my-auto pt-6 md:pt-10 overflow-hidden z-0"
        >
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            style={{ fontFamily: "'Anton', sans-serif" }}
            className="text-[10.5vw] md:text-[12vw] lg:text-[16.5vw] font-normal tracking-wide text-center uppercase leading-none select-none text-theme-950 w-full flex justify-center flex-nowrap whitespace-nowrap"
          >
            {"BANTY PATEL".split("").map((char, index) => (
              <span 
                key={index} 
                className="overflow-hidden inline-block h-[1.15em] relative cursor-default"
              >
                <motion.span 
                  variants={letterVariants} 
                  className="inline-block relative"
                >
                  <HoverCharacter char={char} direction="horizontal" />
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Middle Grid (Left text - Center space - Right text) */}
        <motion.div 
          initial={{ y: "55vh" }}
          animate={isReady ? { y: "0vh" } : { y: "55vh" }}
          transition={{
            delay: 0.2,
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="grid grid-cols-12 items-center w-full my-auto gap-4 relative z-0"
        >
          {/* Left: Full Stack */}
          <motion.div 
            style={{ opacity: textOpacity, x: leftTextX }}
            className="col-span-3 flex justify-end items-center text-right pr-2 md:pr-8"
          >
            <h2 
              style={{ fontFamily: "'Anton', sans-serif" }}
              className="text-[4.2vw] md:text-[3.8vw] lg:text-[3.5vw] font-normal uppercase leading-none text-theme-950"
            >
              Full Stack
            </h2>
          </motion.div>

          {/* Center: Showcase Video Container */}
          <div className="col-span-6 flex flex-col items-center">
            {/* Metadata labels above the image */}
            <motion.div 
              style={{ opacity: textOpacity }}
              className="w-full max-w-[480px] flex justify-between items-center mb-2 px-1 text-[9px] md:text-[12px] font-sans text-theme-950/70 tracking-widest uppercase"
            >
              <motion.span style={{ x: topLeftTextX }}>WEB DEVELOPMENT</motion.span>
              <motion.span style={{ x: topRightTextX }}>2026</motion.span>
            </motion.div>
            
            {/* Animated Video Frame inside grid */}
            <motion.div
              style={{
                width: startWidth,
                height: startHeight,
                scaleX: scaleX,
                scaleY: scaleY,
                y: videoYDown,
                borderRadius: videoBorderRadius,
              }}
              className="overflow-hidden border border-theme-200/40 bg-theme-100 z-50 relative"
            >
              {/* Shutter down load animation overlay */}
              <motion.div
                initial={{ y: "0%" }}
                animate={isReady ? { y: "100%" } : { y: "0%" }}
                transition={{ delay: 0.8, duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-[#EBEAE4] z-10"
              />
              <video 
                src="/jgunarto_demoreel_compressed_1.mp4" 
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-[1.03] z-0 relative"
              />
            </motion.div>
          </div>

          {/* Right: Developer */}
          <motion.div 
            style={{ opacity: textOpacity, x: rightTextX }}
            className="col-span-3 flex justify-start items-center text-left pl-2 md:pl-8"
          >
            <h2 
              style={{ fontFamily: "'Anton', sans-serif" }}
              className="text-[4.2vw] md:text-[3.8vw] lg:text-[3.5vw] font-normal uppercase leading-none text-theme-950"
            >
              Developer
            </h2>
          </motion.div>
        </motion.div>

        {/* Bottom Footer Line */}
        <motion.div 
          initial={{ y: "25vh" }}
          animate={isReady ? { y: "0vh" } : { y: "25vh" }}
          transition={{
            delay: 0.2,
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1]
          }}
          style={{ opacity: textOpacity }}
          className="w-full flex justify-center items-center pt-8 z-0"
        >
          <span className="text-[10px] md:text-xs font-semibold text-theme-950/60 tracking-[0.2em] uppercase">
            SCROLL DOWN
          </span>
        </motion.div>
        
      </div>
    </div>
  );
}

function CreatingMotionSection() {
  return (
    <section className="w-full min-h-[80vh] bg-[#2C1E16] text-[#F0EADA] flex flex-col items-center justify-center py-24 md:py-32 px-4 overflow-hidden relative">
      <div className="relative w-full max-w-[1400px] flex flex-col items-center gap-6 md:gap-12 mt-8">
        
        {/* Line 1: BUILDING + small text */}
        <div className="relative flex items-center justify-center w-full">
          <div className="absolute left-2 md:left-[10%] lg:left-[15%] -top-4 md:-top-2 text-right text-[8px] md:text-sm font-sans tracking-wide text-[#F0EADA]/90">
            MODERN WEB<br/>APPLICATIONS
          </div>
          <div className="relative overflow-hidden inline-flex p-3">
            {/* Shutter sliding Right */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#2C1E16] z-10"
            />
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.15 }
                }
              }}
              style={{ fontFamily: "'Anton', sans-serif", transform: "scaleY(1.15)" }} 
              className="text-[17vw] md:text-[14vw] lg:text-[12vw] leading-none m-0 uppercase tracking-tight flex"
            >
              {"BUILDING".split("").map((char, index) => (
                <span key={index} className="overflow-hidden inline-block h-[1.15em] relative">
                  <motion.span variants={letterVariants} className="inline-block relative">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
        </div>

        {/* Line 2: DIGITAL + small text */}
        <div className="relative flex items-center justify-center w-full">
          <div className="relative overflow-hidden inline-flex p-3">
            {/* Shutter sliding Left */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "-100%" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#2C1E16] z-10"
            />
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.15 }
                }
              }}
              style={{ fontFamily: "'Anton', sans-serif", transform: "scaleY(1.15)" }} 
              className="text-[17vw] md:text-[14vw] lg:text-[12vw] leading-none m-0 uppercase tracking-tight flex"
            >
              {"DIGITAL".split("").map((char, index) => (
                <span key={index} className="overflow-hidden inline-block h-[1.15em] relative">
                  <motion.span variants={letterVariants} className="inline-block relative">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
          <div className="absolute right-2 md:right-[5%] lg:right-[15%] -bottom-4 md:-bottom-2 text-left text-[8px] md:text-sm font-sans tracking-wide text-[#F0EADA]/90">
            WITH PURPOSE &<br/>PERFORMANCE
          </div>
        </div>

        {/* Line 3: EXPERIENCES */}
        <div className="relative flex items-center justify-center w-full">
          <div className="relative overflow-hidden inline-flex p-3">
            {/* Shutter sliding Right */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#2C1E16] z-10"
            />
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.15 }
                }
              }}
              style={{ fontFamily: "'Anton', sans-serif", transform: "scaleY(1.15)" }} 
              className="text-[17vw] md:text-[14vw] lg:text-[12vw] leading-none m-0 uppercase tracking-tight flex"
            >
              {"EXPERIENCES".split("").map((char, index) => (
                <span key={index} className="overflow-hidden inline-block h-[1.15em] relative">
                  <motion.span variants={letterVariants} className="inline-block relative">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
        </div>

      </div>
    </section>
  );
}

function FeaturedWorksSection() {
  return (
    <section className="w-full min-h-[10vh] bg-[#EBEAE4] text-theme-950 flex flex-col items-center justify-center py-14 md:py-20 px-6 md:px-8 overflow-hidden relative">
      <div className="w-full max-w-full flex flex-col items-center">
        
        {/* Animated Main Text */}
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04 }
            }
          }}
          style={{ fontFamily: "'Anton', sans-serif", transform: "scaleY(1.25)" }}
          className="text-[17vw] md:text-[15vw] lg:text-[15vw] leading-none m-0 uppercase tracking-tight flex justify-center w-full"
        >
          {"FEATURED PROJECTS".split("").map((char, index) => (
            <span 
              key={index} 
              className="overflow-hidden inline-block h-[1.15em] relative cursor-default"
            >
              <motion.span 
                variants={letterVariants} 
                className="inline-block relative"
              >
                <HoverCharacter char={char} direction="vertical" />
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Divider Line */}
        <hr className="w-full border-t border-theme-950/80 my-10 md:my-12" />

        {/* Bottom Tags */}
        <div className="w-full flex justify-between items-center font-sans font-normal text-[8px] md:text-xl tracking-widest">
          <div>WEB SOLUTIONS</div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="bg-theme-950 text-[#EBEAE4] px-3 md:px-4 py-1.5 rounded-full">SCALABLE</span>
            <span className="bg-theme-950 text-[#EBEAE4] px-3 md:px-4 py-1.5 rounded-full">RESPONSIVE</span>
            <span className="bg-theme-950 text-[#EBEAE4] px-3 md:px-4 py-1.5 rounded-full">INNOVATIVE</span>
          </div>
        </div>

      </div>
    </section>
  );
}

function Home() {
  return (
    <main className="w-full bg-[#EBEAE4]">
      <HeroSection />
      <CreatingMotionSection />
      <FeaturedWorksSection />
    </main>
  );
}

export default Home;