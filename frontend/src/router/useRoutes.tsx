import { createBrowserRouter, useLocation, useOutlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "motion/react";
import PageTransition from "@/components/PageTransition";

const Home = lazy(() => import("@/pages/Home"));
const AboutMe = lazy(() => import("@/pages/AboutMe"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contact = lazy(() => import("@/pages/Contact"));
const Services = lazy(() => import("@/pages/Services"));

function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} className="w-full h-full">
        <PageTransition />
        <Suspense fallback={null}>
          {element}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function Layout() {
  const location = useLocation();
  const showFooter = location.pathname !== "/projects";

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="main">
        <AnimatedOutlet />
      </main>
      {showFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <AboutMe /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
      { path: "*", element: <PageNotFound /> }
    ]
  }
]);
