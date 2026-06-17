import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/useRoutes";
import Preloader from "@/components/Preloader";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function App() {
 
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true, // We can let Lenis handle its own requestAnimationFrame
      duration: 2, // Default is 1.2. Increase this to make scrolling take longer
      wheelMultiplier: 0.5, // Default is 1. Decrease to make each scroll wheel tick move less distance
      lerp: 0.03, // Default is 0.1. Lower values create a smoother, slower easing effect
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>
      <Preloader />
      <div>
        <RouterProvider router={router} />
      </div>
  </>;
}
export default App;