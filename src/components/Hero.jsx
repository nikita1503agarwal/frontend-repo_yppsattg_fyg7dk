import { motion } from "framer-motion";
import { Phone, Droplets, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero({ onConsult }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            >
              Чистая вода в вашем доме за 7–14 дней
            </motion.h1>
            <p className="mt-5 text-lg text-slate-300 max-w-xl">
              Проектируем, поставляем и устанавливаем системы водоподготовки для частных домов.
              Анализ воды, подбор оборудования и монтаж под ключ.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={onConsult} className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-600/30">
                <Phone className="w-5 h-5 mr-2" /> Бесплатная консультация
              </button>
              <a href="#solutions" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition">
                <Droplets className="w-5 h-5 mr-2" /> Решения
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-400"/>Гарантия до 5 лет</div>
              <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-cyan-400"/>Сервис и расходники</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 p-1 backdrop-blur border border-white/10">
              <div className="w-full h-full rounded-2xl bg-slate-900/40 grid grid-cols-2 overflow-hidden">
                <div className="p-5 border-r border-white/5">
                  <h3 className="text-white font-semibold mb-2">Анализ</h3>
                  <p className="text-slate-300 text-sm">Химический анализ воды и подбор технологии очистки.</p>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-2">Монтаж</h3>
                  <p className="text-slate-300 text-sm">Профессиональная установка и пусконаладка.</p>
                </div>
                <div className="p-5 border-t border-white/5">
                  <h3 className="text-white font-semibold mb-2">Оборудование</h3>
                  <p className="text-slate-300 text-sm">Фильтры, умягчители, обезжелезиватели и др.</p>
                </div>
                <div className="p-5 border-t border-l border-white/5">
                  <h3 className="text-white font-semibold mb-2">Сервис</h3>
                  <p className="text-slate-300 text-sm">Регламентное обслуживание и расходные материалы.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
