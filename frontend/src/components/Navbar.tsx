import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import StaggeredMenu from './ReactBits/StaggeredMenu';
export default function Navbar() {
  const [nyTime, setNyTime] = useState('');
  const isFirstLoad = !(window as any).hasPreloaderRun;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time for New York
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // Determine offset (EDT is UTC-4, EST is UTC-5) dynamically
      const nyDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      const diffMs = nyDate.getTime() - utcDate.getTime();
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const gmtString = `GMT${diffHours >= 0 ? '+' : ''}${diffHours}`;

      setNyTime(`${timeStr} ${gmtString}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  const staggeredMenuItems = [
    { label: 'HOME', ariaLabel: 'Go to home page', link: '/' },
    { label: 'WORKS', ariaLabel: 'View our projects', link: '/projects' },
    { label: 'BREAK', ariaLabel: 'View our services', link: '/services' },
    { label: 'ABOUT', ariaLabel: 'Learn about us', link: '/about' },
  ];

  const menuItems = [
    { title: 'HOME', to: '/' },
    { title: 'WORKS', to: '/projects' },
    { title: 'BREAK', to: '/services' },
    { title: 'ABOUT', to: '/about' },
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <motion.nav 
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: isFirstLoad ? 4.8 : 0.2,
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }}
      className="fixed top-0 z-50 w-full py-6 px-6 md:px-12 flex justify-between items-center text-[#EBEAE4] bg-black md:bg-transparent md:mix-blend-difference font-sans tracking-widest select-none"
    >
      {/* Left Info Group */}
      <div className="flex items-center gap-6 md:gap-8 text-[11px] md:text-sm font-bold text-[#EBEAE4]">
        {/* Pulsing indicator dot and City */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EBEAE4]" />
          <span>NEW YORK, US</span>
        </div>

        {/* Real-time Clock */}
        <div className="hidden sm:block text-[#EBEAE4]">
          {nyTime}
        </div>

        {/* Coordinates */}
        <div className="hidden lg:block text-[#EBEAE4]">
          36.7783° N, 119.4179°
        </div>
      </div>

      {/* Right Navigation Menu */}
      <div className="flex items-center gap-6 md:gap-10 text-[11px] md:text-sm font-bold text-[#EBEAE4]">
        
        {/* Desktop Menu (Original) */}
        <div className="hidden md:flex items-center gap-6 md:gap-10">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="relative overflow-hidden group block cursor-pointer py-1"
            >
              {/* Rolling letters container */}
              <span className="relative flex overflow-hidden whitespace-nowrap">
                {/* Default state: slides up on hover */}
                <span className="flex">
                  {item.title.split('').map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="inline-block transition-transform duration-500 group-hover:-translate-y-full"
                      style={{
                        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                        transitionDelay: `${charIdx * 0.025}s`,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>

                {/* Hover state: slides up from bottom */}
                <span className="absolute inset-0 flex">
                  {item.title.split('').map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                      style={{
                        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                        transitionDelay: `${charIdx * 0.025}s`,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu (Collapsible) */}
        <div className="md:hidden">
          <StaggeredMenu
            position="right"
            items={staggeredMenuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#EBEAE4"
            openMenuButtonColor="#111"
            changeMenuColorOnOpen={true}
            colors={['#1a1a1a', '#333']}
            accentColor="#5227FF"
            isFixed={true}
          />
        </div>
      </div>
    </motion.nav>
  );
}