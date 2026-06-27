import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Sliders, 
  Eye, 
  Layers, 
  Compass, 
  Mail, 
  ArrowRight, 
  MousePointer, 
  Tv, 
  Code, 
  ShieldCheck, 
  Info,
  Check,
  Zap,
  ArrowUp,
  RefreshCw,
  SlidersHorizontal,
  Workflow
} from 'lucide-react';
import Navigation from './components/Navigation';
import { NavItem, HoverStylePreset, ScrollStylePreset } from './types';

export default function App() {
  // Navigation Menu Definitions
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'features', label: 'Features', icon: 'sparkles' },
    { id: 'playground', label: 'Playground', icon: 'compass' },
    { id: 'telemetry', label: 'Metrics', icon: 'layers' },
    { id: 'contact', label: 'Contact', icon: 'mail' },
  ];

  // Configurator states inside our interactive dashboard 
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoverStyle, setHoverStyle] = useState<HoverStylePreset['id']>('pill');
  const [scrollStyle, setScrollStyle] = useState<ScrollStylePreset['id']>('glassmorphism');
  const [layoutMode, setLayoutMode] = useState<'floating' | 'full'>('floating');
  const [showProgress, setShowProgress] = useState<boolean>(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Metrics states for the "scrolled" presentation logs
  const [scrollYValue, setScrollYValue] = useState<number>(0);
  const [scrollSpeed, setScrollSpeed] = useState<number>(0);
  const [lastScrollTime, setLastScrollTime] = useState<number>(Date.now());
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Monitor Scroll for Scroll-Spy (active section detection) + Metrics Log
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollYValue(currentScrollY);

      // Speed calculation (pixels per second)
      const now = Date.now();
      const timeDiff = now - lastScrollTime;
      if (timeDiff > 0) {
        const distance = Math.abs(currentScrollY - lastScrollY);
        const speed = Math.round((distance / timeDiff) * 1000);
        setScrollSpeed(speed);
      }
      setLastScrollY(currentScrollY);
      setLastScrollTime(now);

      // Section active states detection (Scroll-Spy)
      const buffer = 160; // Offset threshold
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - buffer;
          const bottom = top + el.offsetHeight;
          if (currentScrollY >= top && currentScrollY < bottom) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastScrollTime]);

  const resetConfig = () => {
    setHoverStyle('pill');
    setScrollStyle('glassmorphism');
    setLayoutMode('floating');
    setShowProgress(true);
    setThemeMode('light');
  };

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPosition = elRect - bodyRect;
      const offsetPosition = elPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      themeMode === 'dark' 
        ? 'bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200' 
        : 'bg-slate-50 text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900'
    }`}>
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 transition-colors duration-500 ${
          scrollStyle === 'neon' ? 'bg-cyan-400' : 'bg-indigo-400'
        }`} />
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-purple-400" />
      </div>

      {/* DYNAMIC SCROLLER STICKY INSTANCE */}
      <Navigation
        items={navItems}
        activeSection={activeSection}
        onSetActiveSection={setActiveSection}
        hoverStyle={hoverStyle}
        scrollStyle={scrollStyle}
        layoutMode={layoutMode}
        showProgress={showProgress}
      />

      {/* SECTION 1: HERO CONTAINER */}
      <section
        id="home"
        className="relative pt-32 pb-24 md:pt-40 md:pb-36 px-4 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden"
      >
        <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-slate-900 border border-indigo-100/60 dark:border-slate-800/80 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-6 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Interactive Floating Micro-systems</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight max-w-4xl text-slate-900 dark:text-white leading-[1.05] mb-6">
          Navigation that adapts to{' '}
          <span className={`inline-block bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500 ${
            scrollStyle === 'neon' 
              ? 'from-cyan-400 via-emerald-400 to-blue-500' 
              : scrollStyle === 'gradient'
              ? 'from-purple-400 via-pink-400 to-amber-400'
              : 'from-indigo-600 via-indigo-400 to-purple-600'
          }`}>
            your scroll context
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl balance mb-10 leading-relaxed font-sans">
          Experiment with real-time reactive headers. Scroll through our interactive space, modify presets in the Studio widget, and observe styling transitions instantly.
        </p>

        {/* HERO CALL TO ACTION TRIALS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
          <button
            id="hero-scroll-btn"
            onClick={() => jumpTo('playground')}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/20 inline-flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>Open Customizer Studio</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            id="hero-features-btn"
            onClick={() => jumpTo('features')}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 font-medium rounded-xl text-slate-800 dark:text-slate-200 transition-all inline-flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Explore Core Mechanics</span>
          </button>
        </div>

        {/* Scroll feedback state badge */}
        <div className="mt-14 p-1 rounded-full border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm flex items-center space-x-3 pr-4 pl-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            CURRENT NAV: <strong className="text-slate-800 dark:text-slate-200 font-bold uppercase">{activeSection}</strong>
          </span>
        </div>
      </section>

      {/* SECTION 2: MECHANICS & FEATURES */}
      <section
        id="features"
        className="py-24 px-4 bg-white/40 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Designed for Dynamic Interactions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Traditional bars are heavy and static. Our system uses modern physics and scroll sensors to transform gracefully as the user moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className={`p-8 rounded-2xl border transition-all duration-300 bg-white dark:bg-slate-900 hover:shadow-xl ${
              activeSection === 'features' ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/5' : 'border-slate-200/60 dark:border-slate-800'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-slate-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-2">
                Fluid Hover Slider
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                A shared Framer Motion background indicator flows seamlessly between items as you guide your mouse. No static instant swaps — just buttery smooth organic easing.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-8 rounded-2xl border transition-all duration-300 bg-white dark:bg-slate-900 hover:shadow-xl ${
              activeSection === 'features' ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/5' : 'border-slate-200/60 dark:border-slate-800'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-slate-800/80 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-2">
                Adaptive Scroll Bounds
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Cross a defined thread threshold and the navbar responds immediately: shrinking its padding, layering on high-tech backdrop filters, and projecting fine metallic shadows.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-8 rounded-2xl border transition-all duration-300 bg-white dark:bg-slate-900 hover:shadow-xl ${
              activeSection === 'features' ? 'border-purple-500/50 shadow-lg shadow-purple-500/5' : 'border-slate-200/60 dark:border-slate-800'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-slate-800/80 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-2">
                Scroll-Spy Highlight
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Never lose context of your section. The menu tracks elements in real-time, matching active sections to direct nav items accurately as you travel through pages.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE PLAYGROUND STUDIO */}
      <section
        id="playground"
        className="py-24 px-4 max-w-7xl mx-auto"
      >
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-950 dark:to-black rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Subtle decoration lines */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 pb-8 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-900 px-3 py-1 rounded-full">
                  NAV CONTROL STUDIO
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mt-3">
                  Configurator Panel
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-1.5">
                  Change state presets live, then scroll up/down to see how hover actions & colors transition.
                </p>
              </div>
              <button
                id="reset-config-button"
                onClick={resetConfig}
                className="mt-4 lg:mt-0 flex items-center space-x-2 px-4 py-2 border border-slate-700 bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-sm transition-all text-left focus:outline-none cursor-pointer self-start"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Presets</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* LEFT COLUMN: THE CONTROLS */}
              <div className="space-y-8">
                
                {/* Scroll Style Selector */}
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-slate-300 font-mono uppercase mb-4 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Scroll Mode Style (Color Change)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'glassmorphism', name: 'Glassmorphism', desc: 'Blurry backdrop, thin shadow' },
                      { id: 'neon', name: 'Cyber Neon', desc: 'Dark canvas, cyan neon' },
                      { id: 'gradient', name: 'Aesthetic Shift', desc: 'Slow purple gradient' },
                      { id: 'minimal', name: 'Classic Minimal', desc: 'Crisp outline, clean solid' },
                    ].map((style) => (
                      <button
                        id={`btn-scrollstyle-${style.id}`}
                        key={style.id}
                        onClick={() => setScrollStyle(style.id as ScrollStylePreset['id'])}
                        className={`p-4 rounded-xl text-left border transition-all text-sm focus:outline-none cursor-pointer group ${
                          scrollStyle === style.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                            : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{style.name}</span>
                          {scrollStyle === style.id && <Check className="w-4 h-4 text-indigo-200" />}
                        </div>
                        <p className="text-[11px] opacity-75 mt-1 font-sans">{style.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hover Indicator Selection */}
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-slate-300 font-mono uppercase mb-4 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Hover Style State (Micro-Interactions)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'pill', name: 'Sleek Pill Slider', desc: 'Smooth physical background' },
                      { id: 'underline', name: 'Sliding Underline', desc: 'Thin bar underneath text' },
                      { id: 'dot', name: 'Mini Glow Dot', desc: 'Cute dot indicators below' },
                      { id: 'scale', name: 'Spring Scale-Up', desc: 'Bounce physical translate' },
                    ].map((style) => (
                      <button
                        id={`btn-hoverstyle-${style.id}`}
                        key={style.id}
                        onClick={() => setHoverStyle(style.id as HoverStylePreset['id'])}
                        className={`p-4 rounded-xl text-left border transition-all text-sm focus:outline-none cursor-pointer group ${
                          hoverStyle === style.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                            : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{style.name}</span>
                          {hoverStyle === style.id && <Check className="w-4 h-4 text-indigo-200" />}
                        </div>
                        <p className="text-[11px] opacity-75 mt-1 font-sans">{style.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secondary Toggles (Layout & Progress bar) */}
                <div className="pt-2">
                  <span className="block text-sm font-semibold tracking-wide text-slate-300 font-mono uppercase mb-4">
                    Layout Configuration
                  </span>
                  
                  <div className="flex flex-wrap gap-4">
                    {/* Floating Layout Toggle */}
                    <button
                      id="btn-layoutmode-floating"
                      onClick={() => setLayoutMode('floating')}
                      className={`flex-1 px-4 py-3 rounded-xl border text-sm transition-all font-medium text-center focus:outline-none cursor-pointer ${
                        layoutMode === 'floating'
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      Floating Capsule
                    </button>
                    <button
                      id="btn-layoutmode-full"
                      onClick={() => setLayoutMode('full')}
                      className={`flex-1 px-4 py-3 rounded-xl border text-sm transition-all font-medium text-center focus:outline-none cursor-pointer ${
                        layoutMode === 'full'
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      Full Width Header
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div>
                      <h4 className="text-sm font-semibold">Active Highlight Scroll Progress</h4>
                      <p className="text-xs text-slate-400">Renders a micro loading strip underneath the nav bar</p>
                    </div>
                    <button
                      id="btn-toggle-progress"
                      onClick={() => setShowProgress(!showProgress)}
                      className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                        showProgress ? 'bg-indigo-600' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        showProgress ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: WORKSPACE DEMO PREVIEW ENVIRONMENT */}
              <div className="flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight mb-4 flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span>Real-time Interactive Telemetry</span>
                  </h3>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-black text-slate-300 border border-slate-900">
                      <p className="text-amber-400 font-bold mb-1">// Navigation Active Config</p>
                      <pre className="text-slate-100">{JSON.stringify({
                        hoverStyle,
                        scrollStyle,
                        layoutMode,
                        showProgress,
                      }, null, 2)}</pre>
                    </div>

                    <div className="p-3.5 rounded-lg bg-black text-slate-300 border border-slate-900">
                      <p className="text-indigo-400 font-bold mb-1">// Active Scroll State</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="p-2 rounded bg-slate-900/60">
                          <span className="text-slate-500 block text-[10px]">CURRENT SECTION</span>
                          <span className="text-white text-sm font-bold uppercase">{activeSection}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900/60">
                          <span className="text-slate-500 block text-[10px]">Y OFFSET</span>
                          <span className="text-cyan-400 text-sm font-bold">{Math.round(scrollYValue)} px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Mode Toggle & Live instruction feedback */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    <p className="font-semibold text-slate-300">Aesthetic Preview Color:</p>
                    <p>Toggle client interface to dark/light environments:</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      id="btn-theme-light"
                      onClick={() => setThemeMode('light')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none transition-colors border ${
                        themeMode === 'light'
                          ? 'bg-slate-200 text-slate-900 border-slate-300 font-bold'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Light Canvas
                    </button>
                    <button
                      id="btn-theme-dark"
                      onClick={() => setThemeMode('dark')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none transition-colors border ${
                        themeMode === 'dark'
                          ? 'bg-white text-slate-950 border-white font-bold'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Dark Canvas
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DETAILED STATS & VISUAL METRICS */}
      <section
        id="telemetry"
        className="py-24 px-4 bg-slate-900/5 dark:bg-slate-950/20 border-t border-slate-200/40 dark:border-slate-800/40"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
                Interactive Behavior Logs
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-2">
                Real-Time Scroll Velocity Metrics
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
              Our micro-interactive header uses these active scroll computations to calculate when to morph from a light floating segment to a dense glass shield.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between h-40">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase font-mono">
                Scroll Speed
              </span>
              <div>
                <span className="text-3xl font-display font-bold text-indigo-600 dark:text-indigo-400">
                  {scrollSpeed}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-1">pixels/sec</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between h-40">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase font-mono">
                State Multiplier
              </span>
              <div>
                <span className="text-3xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                  {scrollYValue > 40 ? 'ACTIVE' : 'STATIC'}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-1">
                  Threshold crossed at 40px
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between h-40">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase font-mono">
                Floating Shift X/Y
              </span>
              <div>
                <span className="text-3xl font-display font-bold text-cyan-600 dark:text-cyan-400">
                  {layoutMode === 'floating' ? 'TRUE' : 'FALSE'}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-1">
                  Layout mode selection
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between h-40">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase font-mono">
                Theme Variant
              </span>
              <div>
                <span className="text-3xl font-display font-bold text-purple-600 dark:text-purple-400">
                  {themeMode.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-1">
                  Client theme setting
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section
        id="contact"
        className="py-24 px-4 max-w-5xl mx-auto"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-3">
              Need custom navigation parameters?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base">
              Send us your layout ideas! Fill out the mock form below to preview button interaction styles in light or dark theme environments.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
                  First Name
                </label>
                <input
                  id="contact-form-name"
                  type="text"
                  placeholder="Aurora"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 text-sm transition-all focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
                  Email
                </label>
                <input
                  id="contact-form-email"
                  type="email"
                  placeholder="aurora@navigation.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 text-sm transition-all focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
                Your Request Specifics
              </label>
              <textarea
                id="contact-form-msg"
                rows={4}
                placeholder="Describe your design specifications/goals..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 text-sm transition-all focus:outline-none"
              />
            </div>

            <button
              id="contact-form-submit-btn"
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Submit Request Callback</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200/60 dark:border-slate-900 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AuraNav Interactive Systems. All rights scrollable.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => jumpTo('home')}
              className="hover:text-indigo-500 font-mono flex items-center space-x-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>

      {/* ACCENT FLOATING BACK TO TOP BUTTON FOR SCROLLED STATE ONLY */}
      <AnimatePresence>
        {scrollYValue > 300 && (
          <motion.button
            id="back-to-top-sticky-btn"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-xl shadow-indigo-600/20 z-50 focus:outline-none cursor-pointer"
            aria-label="Scroll Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
