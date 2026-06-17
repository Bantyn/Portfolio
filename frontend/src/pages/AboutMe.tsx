import { motion, type Variants } from 'motion/react';
import HoverCharacter from '@/components/HoverCharacter';

const letterVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.95,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
    }
  }
};

function AboutMe() {
  const isFirstLoad = !(window as any).hasPreloaderRun;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: isFirstLoad ? 3.5 : 0.15,
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#EBEAE4] select-none text-theme-950">

      {/* Hero Content (scrolls up naturally with the page) */}
      <div className="relative min-h-[calc(100vh-88px)] w-full bg-[#4C5B04] flex flex-col items-center justify-center pt-28 pb-20 px-4 overflow-hidden z-10">
        
        {/* Big Animated Heading */}
        <motion.div 
          initial={{ y: "10vh", opacity: 0 }}
          animate={{ y: "0vh", opacity: 1 }}
          transition={{
            delay: isFirstLoad ? 4.8 : 0.2,
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="w-full flex justify-center items-center overflow-hidden z-0"
        >
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ fontFamily: "'Anton', sans-serif" }}
            className="text-[11vw] md:text-[12vw] lg:text-[15.5vw] font-normal tracking-wide text-center uppercase leading-none select-none text-[#EBEAE4] w-full flex justify-center flex-nowrap whitespace-nowrap"
          >
            {"ABOUT BANTY".split("").map((char, index) => (
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

        {/* Media Frame & Labels Container */}
        <motion.div 
          initial={{ y: "15vh", opacity: 0 }}
          animate={{ y: "0vh", opacity: 1 }}
          transition={{
            delay: isFirstLoad ? 5.0 : 0.4,
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="flex flex-col items-center z-10 -mt-[4vw] md:-mt-[5vw] lg:-mt-[6vw] w-[85vw] max-w-[480px]"
        >
          <div className="relative w-full">
            
            {/* Metadata labels above the image */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{
                delay: isFirstLoad ? 5.4 : 0.6,
                duration: 1,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="w-full flex justify-between items-center mb-3 text-[9px] md:text-[11px] font-bold font-sans tracking-widest text-[#EBEAE4]/80 uppercase"
            >
              <span>WHO'S THIS?</span>
              <span>HELLO, HI, HEY</span>
            </motion.div>
            
            {/* Frame Box */}
            <div className="w-full aspect-[3/4] overflow-hidden border border-[#EBEAE4]/20 bg-[#404c03] z-20 relative rounded-[4px]">
              {/* Shutter down load animation overlay */}
              <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "100%" }}
                transition={{ delay: isFirstLoad ? 5.8 : 0.8, duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-[#4C5B04] z-10"
              />
              
              <img 
                src="/banty_portrait.png" 
                alt="Banty Patel portrait"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-[1.03]"
              />
            </div>

            {/* Social CTA Button Pills below the image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: isFirstLoad ? 5.6 : 0.7,
                duration: 1.25,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="w-full flex justify-center items-center gap-4 mt-6 text-[10px] md:text-[11px] font-bold font-sans tracking-widest uppercase text-white"
            >
              <a 
                href="/Banty_Resume.pdf" 
                target="_blank"
                className="px-6 py-2.5 bg-black rounded-full transition-transform duration-300 hover:scale-[1.05]"
              >
                RESUME
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-black rounded-full transition-transform duration-300 hover:scale-[1.05]"
              >
                LINKEDIN
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator footer line */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{
            delay: isFirstLoad ? 6.0 : 1.0,
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-0"
        >
          <span className="text-[9px] md:text-[11px] font-semibold text-[#EBEAE4]/60 tracking-[0.2em] uppercase">
            SCROLL DOWN
          </span>
        </motion.div>
      </div>

      {/* About Description Scroll Section */}
      <section className="w-full bg-[#EBEAE4] px-6 md:px-12 py-24 md:py-32 flex flex-col items-center justify-center relative z-20 text-[#1C1C1C]">
        <div className="w-full max-w-[1200px] flex flex-col gap-16 md:gap-24">
          
          {/* Three columns metadata header */}
          <div className="grid grid-cols-3 gap-4 border-b border-black/10 pb-8 text-[9px] md:text-[11px] tracking-widest font-bold font-sans text-black/60">
            <div className="text-left leading-normal">
              ADVOCATE OF<br />TYPE 😉
            </div>
            <div className="text-center leading-normal">
              FUNNY?, KIND,<br />A HUMAN BEING
            </div>
            <div className="text-right leading-normal">
              SNACK + FOOD<br />GIVER
            </div>
          </div>

          {/* Large body paragraphs matching exactly the screenshot flow */}
          <div className="w-full flex flex-col items-center justify-center gap-12 font-sans font-bold text-center tracking-wide leading-[1.3] text-[20px] md:text-[34px] lg:text-[40px] uppercase text-[#1C1C1C]">
            <p className="max-w-[1000px]">
              HEYA, I’M BANTY, A MULTIDISCIPLINARY DESIGNER & CREATIVE CODER, WORKING ACROSS GRAPHIC, MOTION, AND BRAND.
            </p>
            <p className="max-w-[1000px]">
              I LOVE MIXED MEDIA, STORYTELLING, AND LETTING GOOD CONVERSATIONS AND EVERYDAY MOMENTS SNEAK INTO MY WORK.
            </p>
            <p className="max-w-[1000px]">
              WHEN I’M NOT DESIGNING, I’M USUALLY EXPLORING NEW TOOLS, WATCHING FILMS, TRAVELING (WHEN I CAN), OR HUNTING FOR GOOD FOOD.
            </p>
            <p className="max-w-[1000px]">
              FEEL FREE TO CHAT WITH ME THROUGH MY EMAIL AND LET’S EVEN TALK ABOUT FOOD 🍜 :
              <br />
              <a 
                href="mailto:hello@bantypatel.com" 
                className="mt-4 inline-block font-extrabold text-black underline underline-offset-8 decoration-4 hover:opacity-80 transition-opacity"
              >
                hello@bantypatel.com
              </a>
            </p>
          </div>

          {/* Food Gallery Section */}
          <div className="w-full flex justify-center items-center gap-12 md:gap-24 mt-8 md:mt-16 max-w-[800px] mx-auto">
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src="/cheesecake.png" 
              alt="Slice of Basque cheesecake"
              className="h-24 md:h-36 w-auto object-contain hover:scale-[1.05] transition-transform duration-300"
            />
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              src="/bubble_tea.png" 
              alt="Cup of boba milk tea"
              className="h-24 md:h-36 w-auto object-contain hover:scale-[1.05] transition-transform duration-300"
            />
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              src="/egg_tart.png" 
              alt="Portuguese egg tart"
              className="h-24 md:h-36 w-auto object-contain hover:scale-[1.05] transition-transform duration-300"
            />
          </div>

        </div>
      </section>
    </div>
  );
}

export default AboutMe;