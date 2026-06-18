
function Services() {
  const servicesList = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Web Development",
    "REST API Development",
    "Database Design",
    "Website Maintenance"
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#EBEAE4] text-theme-950 px-6 md:px-12 py-28 flex flex-col items-center font-sans select-none">
      <div className="w-full max-w-[1200px] flex flex-col gap-12">
        <h1 
          style={{ fontFamily: "'Anton', sans-serif" }}
          className="text-[12vw] md:text-[10vw] uppercase leading-none tracking-tight text-left"
        >
          SERVICES
        </h1>
        
        <div className="border-t border-black/10 my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {servicesList.map((service, index) => (
            <div 
              key={index}
              className="group border-b border-black/15 pb-6 flex justify-between items-end hover:border-black transition-colors duration-300"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs md:text-sm text-theme-950/40">
                  (0{index + 1})
                </span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-300">
                  {service}
                </h3>
              </div>
              <span className="text-xl md:text-2xl font-light transform group-hover:rotate-45 transition-transform duration-300">
                ↗
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services