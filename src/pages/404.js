import { useState, useEffect } from "react";

export default function ErrorPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const glitchText = "404";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-400 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-300/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Glitch 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-black text-white drop-shadow-2xl select-none relative">
            {glitchText}
            <span className="absolute inset-0 text-cyan-300 animate-pulse opacity-50 -translate-x-2 translate-y-2 blur-sm">
              {glitchText}
            </span>
            <span className="absolute inset-0 text-blue-300 animate-pulse opacity-50 translate-x-2 -translate-y-2 blur-sm">
              {glitchText}
            </span>
          </h1>

          {/* Glitch bars */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="h-2 bg-white/60 animate-pulse absolute top-1/3 left-0 right-0 transform -skew-x-12"
              style={{ animation: "glitch-bar 3s infinite" }}
            />
            <div
              className="h-1 bg-white/40 animate-pulse absolute top-2/3 left-0 right-0 transform skew-x-12 delay-150"
              style={{ animation: "glitch-bar 2s infinite reverse" }}
            />
          </div>
        </div>

        {/* Error message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-fade-in-up delay-300 drop-shadow-lg">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-white/90 max-w-md mx-auto animate-fade-in-up delay-500 drop-shadow-md">
            The page you're looking for seems to have vanished into the digital
            void. Don't worry, it happens to the best of us.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-700">
          <button
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/25"
          >
            <span className="relative z-10">Go Back</span>
            <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              Go Back
            </span>
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="group relative px-8 py-4 border-2 border-white text-white font-bold rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-sm"
          >
            <span className="relative z-10 drop-shadow-sm">Home Page</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="absolute inset-0 flex items-center justify-center text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              Home Page
            </span>
          </button>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-cyan-300/40 rounded-full animate-spin-slow" />
        <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-blue-300/40 rounded-full animate-bounce" />
        <div className="absolute top-1/4 -right-5 w-4 h-4 bg-cyan-200/60 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 -left-5 w-6 h-6 bg-blue-200/60 rounded-full animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes glitch-bar {
          0%,
          100% {
            transform: translateX(-100%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            transform: translateX(100%) skewX(-12deg);
            opacity: 0.75;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
