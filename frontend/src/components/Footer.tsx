import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

// Character-by-character vertical rolling Link helper
function FooterLink({ title, to }: { title: string; to: string }) {
  return (
    <Link to={to} className="relative overflow-hidden group block cursor-pointer py-0.5">
      <span className="relative flex overflow-hidden whitespace-nowrap">
        <span className="flex">
          {title.split('').map((char, idx) => (
            <span
              key={idx}
              className="inline-block transition-transform duration-500 group-hover:-translate-y-full"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transitionDelay: `${idx * 0.02}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="absolute inset-0 flex">
          {title.split('').map((char, idx) => (
            <span
              key={idx}
              className="inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transitionDelay: `${idx * 0.02}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

// Character-by-character vertical rolling External Link helper
function FooterSocialLink({ title, href }: { title: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden group block cursor-pointer py-0.5">
      <span className="relative flex overflow-hidden whitespace-nowrap">
        <span className="flex">
          {title.split('').map((char, idx) => (
            <span
              key={idx}
              className="inline-block transition-transform duration-500 group-hover:-translate-y-full"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transitionDelay: `${idx * 0.02}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="absolute inset-0 flex">
          {title.split('').map((char, idx) => (
            <span
              key={idx}
              className="inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transitionDelay: `${idx * 0.02}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

// Smooth scroll to top button
function BackToTopButton() {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button 
      onClick={handleScroll} 
      className="relative overflow-hidden group block cursor-pointer py-0.5 text-[10px] md:text-xs font-bold text-theme-950 uppercase border-none bg-transparent outline-none"
    >
      <span className="relative flex overflow-hidden whitespace-nowrap">
        <span className="flex">
          {"BACK TO TOP".split('').map((char, idx) => (
            <span
              key={idx}
              className="inline-block transition-transform duration-500 group-hover:-translate-y-full"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transitionDelay: `${idx * 0.02}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="absolute inset-0 flex">
          {"BACK TO TOP".split('').map((char, idx) => (
            <span
              key={idx}
              className="inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transitionDelay: `${idx * 0.02}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

export default function Footer() {
  const [nyTime, setNyTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const nyDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      const diffMs = nyDate.getTime() - utcDate.getTime();
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const gmtString = `GMT${diffHours >= 0 ? '+' : ''}${diffHours}`;

      setNyTime(`${timeStr} ${gmtString}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full bg-[#EBEAE4] text-theme-950 font-sans select-none pt-12">
      {/* Top Border Line */}
      <div className="border-t border-theme-950 mx-6 md:mx-12 mb-6" />

      {/* Columns Header (FOLLOW) & (NAVIGATION) */}
      <div className="flex justify-between items-center px-6 md:px-12 text-[10px] md:text-xs font-semibold text-theme-950/70 tracking-widest uppercase mb-4">
        <span>(FOLLOW)</span>
        <span>(NAVIGATION)</span>
      </div>

      {/* Links Grid Section */}
      <div className="grid grid-cols-12 px-6 md:px-12 items-end mb-12">
        {/* Left: Social Links */}
        <div className="col-span-4 flex flex-col gap-2 text-sm md:text-base font-bold tracking-wider text-theme-950">
          <FooterSocialLink title="INSTAGRAM" href="https://instagram.com" />
          <FooterSocialLink title="LINKEDIN" href="https://linkedin.com" />
          <FooterSocialLink title="BEHANCE" href="https://behance.net" />
          <FooterSocialLink title="EMAIL" href="mailto:contact@bantypatel.com" />
        </div>

        {/* Center: Back To Top */}
        <div className="col-span-4 flex justify-center items-center">
          <BackToTopButton />
        </div>

        {/* Right: Navigation Links */}
        <div className="col-span-4 flex flex-col items-end gap-2 text-sm md:text-base font-bold tracking-wider text-theme-950">
          <FooterLink title="HOME" to="/" />
          <FooterLink title="WORKS" to="/projects" />
          <FooterLink title="BREAK" to="/services" />
          <FooterLink title="ABOUT" to="/about" />
        </div>
      </div>

      {/* Giant "LET'S TALK" Marquee Bar */}
      <div className="w-full bg-[#352213] text-[#EBEAE4] py-8 md:py-12 overflow-hidden flex items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 80, repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          <span 
            style={{ fontFamily: "'Anton', sans-serif" }}
            className="text-[12vw] font-normal uppercase leading-none tracking-tight mr-8 select-none"
          >
            LET'S TALK LET'S TALK LET'S TALK LET'S TALK LET'S TALK LET'S TALK&nbsp;
          </span>
          <span 
            style={{ fontFamily: "'Anton', sans-serif" }}
            className="text-[12vw] font-normal uppercase leading-none tracking-tight mr-8 select-none"
          >
            LET'S TALK LET'S TALK LET'S TALK LET'S TALK LET'S TALK LET'S TALK&nbsp;
          </span>
        </motion.div>
      </div>

      {/* Bottom Information Row */}
      <div className="w-full bg-[#EBEAE4] py-6 px-6 md:px-12 flex justify-between items-center text-[10px] md:text-xs font-normal text-theme-950/80 tracking-widest uppercase">
        {/* Left: Clock, Geo */}
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-theme-950 animate-pulse" />
            <span>NEW YORK, US</span>
          </div>
          <div className="hidden sm:block">
            {nyTime}
          </div>
          <div className="hidden lg:block">
            36.7783° N, 119.4179°
          </div>
        </div>

        {/* Right: Copyright info */}
        <div className="flex flex-col items-end text-right leading-relaxed font-bold">
          <span>©2026</span>
          <span className="text-[8px] md:text-[9px] text-theme-950/60 font-semibold tracking-wider">ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}