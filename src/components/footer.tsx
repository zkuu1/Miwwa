import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
            Miiwa
          </Link>
          <p className="max-w-xs">
            Building the digital future with modern design and cutting-edge creativity.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-white uppercase tracking-wider text-xs">Navigation</h4>
          <nav className="flex flex-col gap-2">
            <Link href="#home" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link href="#about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="#project" className="hover:text-blue-400 transition-colors">Projects</Link>
            <Link href="#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            <Link href="/login" className="hover:text-blue-400 transition-colors">Sign In</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-white uppercase tracking-wider text-xs">Legal</h4>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground uppercase tracking-widest font-medium">
        <p>© {new Date().getFullYear()} Miiwa. All rights reserved.</p>
        <div className="flex gap-6 opacity-50">
          Powered by Miiwa Unit
        </div>
      </div>
    </footer>
  );
}
