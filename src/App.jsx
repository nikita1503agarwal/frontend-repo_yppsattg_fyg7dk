import { useRef } from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Process from "./components/Process";
import CTA from "./components/CTA";

function App() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    const el = document.getElementById("cta");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400"/>
            <div className="font-bold">Дукат Снаб</div>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
            <a href="#solutions" className="hover:text-white">Решения</a>
            <a href="#process" className="hover:text-white">Как работаем</a>
            <button onClick={scrollToForm} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500">Расчёт</button>
          </nav>
        </div>
      </header>

      <main>
        <Hero onConsult={scrollToForm} />
        <Features />
        <div id="process"><Process /></div>
        <div id="cta"><CTA ref={formRef} /></div>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Дукат Снаб — системы водоподготовки для частных домов
      </footer>
    </div>
  );
}

export default App;
