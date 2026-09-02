import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['overview', 'how-it-works', 'technology', 'mission'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-marine-950/90 backdrop-blur-md border-marine-800/80 shadow-sm'
          : 'bg-marine-950/60 backdrop-blur-sm border-marine-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Identification */}
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="w-8 h-8 rounded-lg bg-marine-850 border border-marine-700/80 flex items-center justify-center text-teal-400 group-hover:border-teal-500/50 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight text-base sm:text-lg text-marine-50">
            MarineGuard
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-marine-300">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'how-it-works', label: 'How It Works' },
            { id: 'technology', label: 'Technology' },
            { id: 'mission', label: 'Mission' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md transition-colors text-sm ${
                  isActive
                    ? 'text-marine-50 bg-marine-850 border border-marine-700/60 font-medium'
                    : 'text-marine-300 hover:text-marine-100 hover:bg-marine-900/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Auth Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button size="sm" variant="secondary">
                  Console ({user?.displayName?.split(' ')[0] || 'Analyst'})
                </Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={logout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button size="sm" variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-marine-300 hover:text-marine-100 hover:bg-marine-850 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-marine-800 bg-marine-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-marine-300">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'technology', label: 'Technology' },
              { id: 'mission', label: 'Mission' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'bg-marine-800 text-marine-50 font-medium'
                    : 'text-marine-300 hover:bg-marine-850 hover:text-marine-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-marine-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Open Workstation
                </Button>
                <Button onClick={logout} variant="outline" className="w-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
