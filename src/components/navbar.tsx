"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { createClient } from "@/utils/supabase/client";
import { Menu, X, LayoutDashboard, UserCircle, LogOut } from "lucide-react";

const baseLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Project", href: "/#project" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(profile?.role || 'user');
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) setRole(null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const NavLinks = ({ className, mobile }: { className?: string; mobile?: boolean }) => (
    <div className={cn(className)}>
      {baseLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={cn(
            "text-sm font-medium transition-colors hover:text-blue-400",
            mobile ? "text-2xl font-bold py-4 border-b border-white/5 w-full text-center" : "text-white/70"
          )}
        >
          {link.name}
        </Link>
      ))}
      
      {mobile && user && (
        <button 
          onClick={handleLogout}
          className="mt-8 text-red-400 font-bold flex items-center gap-2 text-xl"
        >
          <LogOut className="size-6" /> Keluar
        </button>
      )}
    </div>
  );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          scrolled || isOpen ? "py-3" : "py-6"
        )}
      >
        <div className={cn(
          "max-w-5xl mx-auto rounded-full px-6 py-2 flex items-center justify-between transition-all duration-500",
          scrolled || isOpen ? "glass shadow-xl" : "bg-transparent"
        )}>
          {/* Mobile Hamburger Button (Left) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          {/* Logo (Left on Desktop, Right/End on Mobile) */}
          <Link 
            href="/" 
            className="md:order-first order-last text-xl font-bold tracking-tighter text-gradient"
            onClick={() => setIsOpen(false)}
          >
            Miiwa
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks className="flex items-center gap-8" />

            <div className="h-4 w-px bg-white/10 mx-2" />

            {!user ? (
              <Link
                href="/login"
                className="text-sm font-semibold px-5 py-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                {role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="text-sm font-semibold px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <LayoutDashboard className="size-4" /> Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/profile"
                    className="text-sm font-semibold px-5 py-2 rounded-full glass hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <UserCircle className="size-4" /> Profile
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-all"
                  title="Keluar"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-500 bg-[#020617]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 pt-24",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <NavLinks className="flex flex-col items-center w-full" mobile />
        
        {!user ? (
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-8 w-full max-w-xs h-14 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20"
          >
            Sign In
          </Link>
        ) : (
          <Link
            href={role === 'admin' ? "/admin" : "/profile"}
            onClick={() => setIsOpen(false)}
            className="mt-8 w-full max-w-xs h-14 rounded-2xl glass border border-white/10 flex items-center justify-center font-bold text-lg"
          >
            {role === 'admin' ? "Dashboard" : "Profile"}
          </Link>
        )}
      </div>
    </>
  );
}
