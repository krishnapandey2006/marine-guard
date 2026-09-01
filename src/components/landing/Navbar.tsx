import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-marine-700/80 bg-marine-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 rounded bg-marine-800 border border-teal-500/40 flex items-center justify-center text-teal-400 group-hover:border-teal-400 transition-colors shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg text-marine-50">MARINEGUARD</span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-teal-950/80 text-teal-300 border border-teal-700/50 px-1.5 py-0.5 rounded">
                v1.0-SIH
              </span>
            </div>
            <span className="text-[10px] font-mono text-marine-400 -mt-1 hidden md:block">
              Maritime Intelligence System
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-marine-300">
          <button
            onClick={() => handleNavClick('overview')}
            className="hover:text-marine-100 transition-colors focus:outline-none"
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-marine-100 transition-colors focus:outline-none"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('technology')}
            className="hover:text-marine-100 transition-colors focus:outline-none"
          >
            Technology
          </button>
          <button
            onClick={() => handleNavClick('mission')}
            className="hover:text-marine-100 transition-colors focus:outline-none"
          >
            Mission
          </button>
        </nav>

        {/* Right CTA / Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button size="sm" variant="secondary" leftIcon={<Shield className="w-3.5 h-3.5 text-teal-400" />}>
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
            className="p-2 rounded text-marine-300 hover:text-marine-100 hover:bg-marine-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-marine-700 bg-marine-900 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-marine-300">
            <button
              onClick={() => handleNavClick('overview')}
              className="text-left py-2 px-3 rounded hover:bg-marine-800 hover:text-marine-100"
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-2 px-3 rounded hover:bg-marine-800 hover:text-marine-100"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('technology')}
              className="text-left py-2 px-3 rounded hover:bg-marine-800 hover:text-marine-100"
            >
              Technology
            </button>
            <button
              onClick={() => handleNavClick('mission')}
              className="text-left py-2 px-3 rounded hover:bg-marine-800 hover:text-marine-100"
            >
              Mission
            </button>
          </nav>

          <div className="pt-4 border-t border-marine-750 flex flex-col gap-2">
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
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
