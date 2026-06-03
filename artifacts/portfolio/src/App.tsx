import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Custom cursor component
function CustomCursor() {
  useEffect(() => {
    const dot = document.querySelector(".custom-cursor-dot") as HTMLElement;
    const ring = document.querySelector(".custom-cursor-ring") as HTMLElement;
    
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };

    const onMouseDown = () => {
      ring.style.width = "25px";
      ring.style.height = "25px";
      ring.style.backgroundColor = "rgba(255, 0, 92, 0.1)";
    };

    const onMouseUp = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.backgroundColor = "transparent";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    
    animateRing();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor-dot hidden md:block"></div>
      <div className="custom-cursor-ring hidden md:block"></div>
    </>
  );
}

// Global ambient mouse glow
function AmbientGlow() {
  useEffect(() => {
    const glow = document.getElementById("ambient-glow");
    if (!glow) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      glow.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div 
      id="ambient-glow" 
      className="fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out z-0 hidden md:block"
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="noise-overlay" />
        <CustomCursor />
        <AmbientGlow />
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
