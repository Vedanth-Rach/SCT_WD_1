import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Home, 
  Sparkles, 
  Compass, 
  Layers, 
  Mail, 
  Activity, 
  Sliders, 
  Tv, 
  CheckCircle 
} from 'lucide-react';
import { HoverStylePreset, ScrollStylePreset, NavItem } from '../types';

interface NavigationProps {
  items: NavItem[];
  activeSection: string;
  onSetActiveSection: (id: string) => void;
  hoverStyle: HoverStylePreset['id'];
  scrollStyle: ScrollStylePreset['id'];
  layoutMode: 'floating' | 'full';
  showProgress: boolean;
}

// Icon mapper helper
const getIcon = (name: string, className: string) => {
  switch (name) {
    case 'home': return <Home className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'compass': return <Compass className={className} />;
    case 'layers': return <Layers className={className} />;
    case 'mail': return <Mail className={className} />;
    default: return <Activity className={className} />;
  }
};

export default function Navigation({
  items,
  activeSection,
  onSetActiveSection,
  hoverStyle,
  scrollStyle,
  layoutMode,
  showProgress,
}: NavigationProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for visual transitions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 40);

      // Calculate scroll progress percentage
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Class calculator for scroll header configurations
  const getHeaderStyleClasses = () => {
    if (!isScrolled) {
      return 'bg-transparent border-transparent py-6';
    }

    const baseTransition = 'py-3 backdrop-blur-md shadow-lg';

    switch (scrollStyle) {
      case 'neon':
        return `${baseTransition} bg-slate-950/85 border-b border-cyan-500/30 text-white`;
      case 'gradient':
        return `${baseTransition} bg-gradient-to-r from-violet-600/90 via-indigo-700/90 to-purple-800/90 border-b border-indigo-400/20 text-white`;
      case 'minimal':
        return `${baseTransition} bg-white/95 text-slate-900 border-b border-slate-100 dark:bg-slate-900/95 dark:text-slate-100 dark:border-slate-800`;
      case 'glassmorphism':
      default:
        return `${baseTransition} bg-white/70 border-b border-slate-200/40 text-slate-800 dark:bg-slate-950/60 dark:border-slate-800/40 dark:text-slate-100`;
    }
  };

  // Helper handling active section jump
  const handleNavClick = (id: string) => {
    onSetActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height offset of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Banner indicating Scroll Parameters */}
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          layoutMode === 'floating' && isScrolled
            ? 'px-4 sm:px-6 lg:px-8 mt-4'
            : 'px-0 mt-0'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            layoutMode === 'floating' && isScrolled
              ? 'max-w-5xl rounded-2xl border'
              : 'w-full'
          } ${getHeaderStyleClasses()}`}
        >
          {/* Scroll progress micro indicator */}
          {showProgress && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  scrollStyle === 'neon'
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                    : scrollStyle === 'gradient'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                    : 'bg-indigo-600'
                }`}
                style={{ width: `${scrollProgress}%` }}
                layoutId="progress-bar-slider"
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
            <div className="flex items-center justify-between">
              
              {/* BRAND LOGO AREA */}
              <button
                id="brand-logo-trigger"
                onClick={() => handleNavClick(items[0].id)}
                className="flex items-center space-x-2.5 group text-left focus:outline-none"
              >
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'scale-90 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' 
                    : 'bg-indigo-600 text-white'
                } group-hover:rotate-12`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className={`font-display font-bold tracking-tight text-lg transition-colors duration-300 ${
                    scrollStyle === 'neon' && isScrolled
                      ? 'text-cyan-400 font-mono'
                      : scrollStyle === 'gradient' && isScrolled
                      ? 'text-white'
                      : 'text-slate-900 dark:text-white'
                  }`}>
                    Aura<span className={scrollStyle === 'neon' ? 'text-white' : 'text-indigo-500'}>Nav</span>
                  </span>
                  
                  {/* Small real-time scroll metric info */}
                  <span className={`block font-mono text-[9px] -mt-1 tracking-wider opacity-60`}>
                    SCROLLY: {Math.round(scrollY)}px
                  </span>
                </div>
              </button>

              {/* DESKTOP DESIGNS */}
              <nav className="hidden md:flex items-center space-x-1">
                {items.map((item) => {
                  const isActive = activeSection === item.id;
                  const isHovered = hoveredId === item.id;

                  return (
                    <button
                      id={`nav-item-desktop-${item.id}`}
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`relative px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors duration-300 focus:outline-none cursor-pointer ${
                        isActive
                          ? scrollStyle === 'gradient' && isScrolled
                            ? 'text-yellow-300 font-bold'
                            : scrollStyle === 'neon' && isScrolled
                            ? 'text-cyan-300 font-bold'
                            : 'text-indigo-600 dark:text-indigo-400 font-bold'
                          : scrollStyle === 'gradient' && isScrolled
                          ? 'text-indigo-100 hover:text-white'
                          : scrollStyle === 'neon' && isScrolled
                          ? 'text-slate-400 hover:text-cyan-300'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                      }`}
                    >
                      {/* HOVER EFFECT RENDERING ENGINE */}
                      {/* 1. Pill Background style */}
                      {hoverStyle === 'pill' && isHovered && (
                        <motion.div
                          layoutId="hover-pill"
                          className={`absolute inset-0 rounded-lg -z-10 ${
                            scrollStyle === 'neon'
                              ? 'bg-cyan-500/10 border border-cyan-500/20'
                              : scrollStyle === 'gradient'
                              ? 'bg-white/10'
                              : 'bg-indigo-50/70 dark:bg-slate-800/50'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* 2. Micro Dot style */}
                      {hoverStyle === 'dot' && isHovered && (
                        <motion.span
                          layoutId="hover-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}

                      {/* 3. Underline Slider style */}
                      {hoverStyle === 'underline' && isHovered && (
                        <motion.div
                          layoutId="hover-underline"
                          className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                            scrollStyle === 'neon'
                              ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                              : scrollStyle === 'gradient'
                              ? 'bg-yellow-300'
                              : 'bg-indigo-600 dark:bg-indigo-400'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        />
                      )}

                      {/* 4. Active Static Marker if no hovered background */}
                      {isActive && !isHovered && (
                        <div className={`absolute -bottom-1 left-4 right-4 h-[3px] rounded-t-full ${
                          scrollStyle === 'neon' 
                            ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' 
                            : scrollStyle === 'gradient' 
                            ? 'bg-white' 
                            : 'bg-indigo-600 dark:bg-indigo-400'
                        }`} />
                      )}

                      <span className={`flex items-center space-x-1.5 transition-transform duration-200 ${
                        hoverStyle === 'scale' && isHovered ? 'scale-110 text-indigo-500' : ''
                      }`}>
                        {getIcon(item.icon, "w-4 h-4")}
                        <span>{item.label}</span>
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* STAT INDICATOR PANEL */}
              <div className="hidden lg:flex items-center space-x-3">
                <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[11px] font-mono transition-colors duration-300 ${
                  scrollStyle === 'neon' && isScrolled
                    ? 'border-cyan-500/20 bg-cyan-950/20 text-cyan-400'
                    : scrollStyle === 'gradient' && isScrolled
                    ? 'border-white/10 bg-white/15 text-white'
                    : 'border-slate-200/60 bg-slate-50 text-slate-500 dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-400'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>PRESET: {hoverStyle.toUpperCase()}</span>
                </div>
              </div>

              {/* MOBILE MENU TOGGLE */}
              <div className="md:hidden">
                <button
                  id="mobile-menu-toggle-btn"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`p-2 rounded-lg transition-colors duration-300 focus:outline-none ${
                    scrollStyle === 'gradient' && isScrolled
                      ? 'text-white hover:bg-white/10'
                      : scrollStyle === 'neon' && isScrolled
                      ? 'text-cyan-400 hover:bg-cyan-500/10'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  aria-label="Toggle Mobile Menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER FLYOUT */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`absolute top-20 left-4 right-4 rounded-2xl p-6 shadow-2xl border transition-all duration-300 ${
                scrollStyle === 'neon'
                  ? 'bg-slate-900 border-cyan-500/30 text-white'
                  : scrollStyle === 'gradient'
                  ? 'bg-gradient-to-b from-indigo-900 to-slate-950 border-indigo-500/30 text-white'
                  : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100'
              }`}
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono mb-2">
                  Navigation Menu — Active: {activeSection.toUpperCase()}
                </p>
                {items.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      id={`nav-item-mobile-${item.id}`}
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center space-x-3 w-full p-3 rounded-xl text-left font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-indigo-500'}`}>
                        {getIcon(item.icon, "w-5 h-5")}
                      </div>
                      <span className="text-base">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto">
                          <CheckCircle className="w-5 h-5 text-indigo-200" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
