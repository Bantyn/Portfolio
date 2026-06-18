import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";

const projects = [
  {
    title: "Globe Gateways",
    slug: "globe-gateways",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["React", "CSS", "Frontend"],
  },
  {
    title: "Travel Booking System",
    slug: "travel-booking-system",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["Node.js", "Express", "Backend"],
  },
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["React", "Framer Motion", "Creative"],
  },
  {
    title: "Admin Dashboard",
    slug: "admin-dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["React", "Recharts", "Frontend"],
  },
  {
    title: "Package Management System",
    slug: "package-management-system",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["Node.js", "MySQL", "Backend"],
  },
  {
    title: "Authentication System",
    slug: "authentication-system",
    image: "https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["JWT", "bcrypt", "Security"],
  },
  {
    title: "MERN Blog Platform",
    slug: "mern-blog-platform",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["MongoDB", "Express", "React"],
  },
  {
    title: "E-Commerce Store",
    slug: "e-commerce-store",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["MERN Stack", "Redux", "Fullstack"],
  },
  {
    title: "Student Management System",
    slug: "student-management-system",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["React", "Node.js", "Fullstack"],
  },
  {
    title: "Weather App",
    slug: "weather-app",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["React", "API", "Frontend"],
  },
  {
    title: "Task Manager",
    slug: "task-manager",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["Node.js", "MongoDB", "Backend"],
  },
  {
    title: "API Integration Projects",
    slug: "api-integration-projects",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    video: "",
    tags: ["REST API", "Axios", "Backend"],
  }
];

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: true,
    duration: 30,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [videoTime, setVideoTime] = useState("00:00:00");
  const lastScrollTime = useRef(0);

  // Throttled mouse wheel handler to scroll embla horizontally
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!emblaApi) return;
    const now = Date.now();
    if (now - lastScrollTime.current < 450) return; // Snapping cooldown
    
    if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
      lastScrollTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollPrev();
      }
    }
  }, [emblaApi]);

  // Connect mouse wheel listener
  useEffect(() => {
    const sliderEl = document.querySelector(".card-slider") as HTMLElement | null;
    if (sliderEl) {
      sliderEl.addEventListener("wheel", handleWheel, { passive: true });
    }
    return () => {
      if (sliderEl) {
        sliderEl.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

  // Embla scroll events to update active card scaling and bracket follow tracking
  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    
    const slides = emblaApi.slideNodes();
    const snapList = emblaApi.scrollSnapList();
    const progress = emblaApi.scrollProgress();
    const engine = emblaApi.internalEngine();
    const isDragging = emblaApi.internalEngine().dragHandler.pointerDown();
    
    // 1. Calculate and apply active zoom scaling logic
    const loop = emblaApi.internalEngine().options.loop;
    const slideCount = snapList.length;
    const scaleMultiplier = 0.1406417112 * slideCount; // Snappy zoom logic
    
    snapList.forEach((snap, idx) => {
      let distance = snap - progress;
      
      if (loop) {
        engine.slideLooper.loopPoints.forEach((point) => {
          const target = point.target();
          if (idx === point.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) distance = snap - (1 + progress);
            if (sign === 1) distance = snap + (1 - progress);
          }
        });
      }
      
      const rawScale = 1 - Math.abs(distance * scaleMultiplier);
      const clampedScale = Math.min(Math.max(rawScale, 0.75), 1.0);
      
      const slideNode = slides[idx];
      const cardMedia = slideNode.querySelector(".t-card-media") as HTMLElement | null;
      if (cardMedia) {
        cardMedia.style.transform = `scale(${clampedScale})`;
      }
    });

    // 2. Track horizontal bracket position
    const activeIdx = emblaApi.selectedScrollSnap();
    setActiveIndex(activeIdx);
    
    const activeSlide = slides[activeIdx];
    const bracketsWrapper = document.querySelector(".line-ornament-container-wrapper-inner") as HTMLElement | null;
    if (activeSlide && bracketsWrapper) {
      const slideRect = activeSlide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const viewportCenter = window.innerWidth / 2;
      const offset = viewportCenter - slideCenter;
      
      if (isDragging) {
        bracketsWrapper.classList.add("is-dragging");
        bracketsWrapper.style.transform = `translateX(${-offset}px)`;
      } else {
        bracketsWrapper.classList.remove("is-dragging");
        bracketsWrapper.style.transform = `translateX(0px)`;
      }
    }
  }, [emblaApi]);

  // Set up pointer down/up scale changes for the L-brackets container
  useEffect(() => {
    if (!emblaApi) return;
    
    const onPointerDown = () => {
      const bracketsWrapper = document.querySelector(".line-ornament-container-wrapper-inner") as HTMLElement | null;
      if (bracketsWrapper) {
        bracketsWrapper.style.scale = "1.06";
      }
    };
    
    const onPointerUp = () => {
      const bracketsWrapper = document.querySelector(".line-ornament-container-wrapper-inner") as HTMLElement | null;
      if (bracketsWrapper) {
        bracketsWrapper.style.scale = "1.0";
      }
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("select", onScroll);
    
    // Run initial scroll frame alignment
    onScroll();

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("select", onScroll);
    };
  }, [emblaApi, onScroll]);

  // Active video play control and current time ticker handler
  useEffect(() => {
    const allVideos = document.querySelectorAll(".t-card-hover-media") as NodeListOf<HTMLVideoElement>;
    allVideos.forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
    setVideoTime("00:00:00");

    if (!emblaApi) return;
    const slides = emblaApi.slideNodes();
    const activeSlide = slides[activeIndex];
    if (!activeSlide) return;

    const video = activeSlide.querySelector("video") as HTMLVideoElement | null;
    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (err) {
          console.log("Autoplay failed:", err);
        }
      };
      playVideo();

      const handleTimeUpdate = () => {
        const rawTime = video.currentTime || 0;
        const hrs = Math.floor(rawTime / 3600).toString().padStart(2, "0");
        const mins = Math.floor((rawTime % 3600) / 60).toString().padStart(2, "0");
        const secs = Math.floor(rawTime % 60).toString().padStart(2, "0");
        setVideoTime(`${hrs}:${mins}:${secs}`);
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.pause();
      };
    }
  }, [activeIndex, emblaApi]);

  // Calculate sliding horizontal index loop helper
  const getLoopNum = (offset: number) => {
    const wrapped = (activeIndex + offset + 12) % 12;
    return wrapped + 1;
  };

  return (
    <div className="w-screen h-screen bg-[#090909] text-[#EBEAE4] overflow-hidden flex flex-col justify-between py-10 px-6 relative select-none font-sans">
      
      {/* 3x3 Layout Grid Borders */}
      <div className="absolute inset-y-0 left-[25vw] w-[1px] bg-[#EBEAE4]/10 pointer-events-none z-0" />
      <div className="absolute inset-y-0 left-[75vw] w-[1px] bg-[#EBEAE4]/10 pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-[15vh] h-[1px] bg-[#EBEAE4]/10 pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-[85vh] h-[1px] bg-[#EBEAE4]/10 pointer-events-none z-0" />

      {/* Row 1: Active Title & Page Info */}
      <div className="h-[15vh] w-full flex justify-between items-center px-[3vw] relative z-10">
        <div className="w-[20vw]" />
        
        {/* Slidable Center Title */}
        <div className="h-[1.5em] overflow-hidden relative text-center uppercase tracking-[0.2em] text-[#EBEAE4] text-base md:text-lg lg:text-xl font-bold flex items-center justify-center flex-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="absolute"
            >
              {projects[activeIndex].title}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="w-[20vw] flex justify-end text-[11px] font-bold tracking-widest text-[#EBEAE4]/60">
          FEATURED PROJECTS
        </div>
      </div>

      {/* Row 2: Carousel area, Prev/Next buttons, L-brackets overlay */}
      <div className="h-[70vh] flex items-center relative z-10 w-full">
        
        {/* Left Control Column (25vw width) */}
        <div className="w-[25vw] h-full flex items-center justify-center relative">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="cursor-pointer uppercase tracking-[0.2em] text-[11px] md:text-sm font-bold opacity-60 hover:opacity-100 transition-opacity"
          >
            PREV
          </button>
        </div>

        {/* Center Carousel Wrapper (50vw width) */}
        <div className="w-[50vw] h-full flex items-center justify-center relative card-slider overflow-visible">
          
          {/* Snap-to-center corner L-brackets target */}
          <div className="line-ornament-container-wrapper absolute pointer-events-none z-20 flex items-center justify-center inset-0">
            <div className="line-ornament-container-wrapper-inner relative w-[86vw] h-[54vw] md:w-[38vw] md:h-[23.5vw] ease-[cubic-bezier(0.16,1,0.3,1)] duration-500 transition-transform">
              <div className="corner-ornament-container absolute inset-0">
                
                {/* L-brackets corners SVG */}
                <div className="corner-ornament-wrapper absolute left-0 top-0 w-[16px] md:w-[24px] h-[16px] md:h-[24px]">
                  <svg className="w-full h-auto" viewBox="0 0 29 24" fill="none">
                    <path d="M28.1497 1.08252H0.76149V23.906" stroke="#EBEAE4" strokeWidth="1.5" />
                  </svg>
                </div>
                
                <div className="corner-ornament-wrapper absolute right-0 top-0 w-[16px] md:w-[24px] h-[16px] md:h-[24px] scale-x-[-1]">
                  <svg className="w-full h-auto" viewBox="0 0 29 24" fill="none">
                    <path d="M28.1497 1.08252H0.76149V23.906" stroke="#EBEAE4" strokeWidth="1.5" />
                  </svg>
                </div>
                
                <div className="corner-ornament-wrapper absolute left-0 bottom-0 w-[16px] md:w-[24px] h-[16px] md:h-[24px] scale-y-[-1]">
                  <svg className="w-full h-auto" viewBox="0 0 29 24" fill="none">
                    <path d="M28.1497 1.08252H0.76149V23.906" stroke="#EBEAE4" strokeWidth="1.5" />
                  </svg>
                </div>
                
                <div className="corner-ornament-wrapper absolute right-0 bottom-0 w-[16px] md:w-[24px] h-[16px] md:h-[24px] rotate-180">
                  <svg className="w-full h-auto" viewBox="0 0 29 24" fill="none">
                    <path d="M28.1497 1.08252H0.76149V23.906" stroke="#EBEAE4" strokeWidth="1.5" />
                  </svg>
                </div>
                
              </div>
            </div>
          </div>

          {/* Embla slider viewport */}
          <div ref={emblaRef} className="overflow-visible w-full cursor-grab active:cursor-grabbing select-none">
            <div className="flex select-none">
              {projects.map((proj, idx) => (
                <div
                  key={proj.slug + idx}
                  className={`flex-[0_0_80vw] md:flex-[0_0_36vw] flex items-center justify-center px-4 embla__slide ${
                    activeIndex === idx ? "is--active" : ""
                  }`}
                >
                  <div className="t-card-media relative w-full h-[48vw] md:h-[21.5vw] bg-neutral-900 overflow-hidden shadow-2xl transition-transform duration-300 ease-out origin-center">
                    
                    {/* Render Video if it's a video file, otherwise Image */}
                    {proj.video || proj.image.endsWith(".mp4") ? (
                      <video
                        src={proj.video || proj.image}
                        loop
                        muted
                        playsInline
                        autoPlay
                        className="t-card-hover-media absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                      />
                    ) : (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    )}
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Control Column (25vw width) */}
        <div className="w-[25vw] h-full flex items-center justify-center relative">
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="cursor-pointer uppercase tracking-[0.2em] text-[11px] md:text-sm font-bold opacity-60 hover:opacity-100 transition-opacity"
          >
            NEXT
          </button>
        </div>

      </div>

      {/* Row 3: Time duration ticker & indices */}
      <div className="h-[15vh] w-full flex justify-between items-center px-[3vw] relative z-10">
        
        {/* Left: Video Ticker */}
        <div className="w-[25vw] font-mono text-[11px] md:text-xs tracking-widest text-[#EBEAE4]/60">
          {videoTime}
        </div>

        {/* Center: Sliding numbers ticker */}
        <div className="flex flex-col items-center flex-1 justify-center gap-1 select-none">
          <div className="flex items-center gap-5 text-sm md:text-base font-mono relative py-1 text-[#EBEAE4]">
            <span className="opacity-15 scale-75 transition-all duration-300 w-6 text-center">{getLoopNum(-2)}</span>
            <span className="opacity-45 scale-90 transition-all duration-300 w-6 text-center">{getLoopNum(-1)}</span>
            <span className="opacity-100 scale-125 text-white font-bold transition-all duration-300 w-6 text-center border-b border-[#EBEAE4]/40 pb-[2px]">{getLoopNum(0)}</span>
            <span className="opacity-45 scale-90 transition-all duration-300 w-6 text-center">{getLoopNum(1)}</span>
            <span className="opacity-15 scale-75 transition-all duration-300 w-6 text-center">{getLoopNum(2)}</span>
          </div>
          
          <div className="text-[10px] md:text-[11px] font-mono tracking-widest text-[#EBEAE4]/40 mt-1">
            {activeIndex + 1} / 12
          </div>
        </div>

        {/* Right: LIVE status dot */}
        <div className="w-[25vw] flex items-center justify-end gap-2 font-mono text-[11px] md:text-xs tracking-widest text-[#EBEAE4]/60">
          <span className={`w-1.5 h-1.5 rounded-full ${activeIndex % 2 === 0 ? "bg-emerald-500 animate-pulse" : "bg-neutral-500"}`} />
          <span>{activeIndex % 2 === 0 ? "LIVE" : "ARCHIVED"}</span>
        </div>

      </div>

      {/* Custom Styles */}
      <style>{`
        /* Add class helpers for CSS Transitions */
        .line-ornament-container-wrapper-inner {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), scale 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .line-ornament-container-wrapper-inner.is-dragging {
          transition: none !important;
        }
        
        /* Make sure active Embla slides get is--active class */
        .embla__slide {
          transition: opacity 0.3s ease;
        }
      `}</style>

    </div>
  );
}