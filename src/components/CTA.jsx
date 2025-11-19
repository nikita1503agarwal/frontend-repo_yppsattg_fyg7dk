import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Loader2 } from "lucide-react";

export default function CTA() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          city: payload.city,
          water_issue: payload.water_issue,
          message: payload.message,
          source: "landing",
        }),
      });

      if (!res.ok) throw new Error("Ошибка отправки. Попробуйте позже.");
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Спасибо! Мы свяжемся с вами в ближайшее время</h3>
          <p className="text-slate-300 mt-3">Наш менеджер уточнит детали и предложит решение</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white">Получите расчёт системы под ваш дом</h3>
            <p className="text-slate-300 mt-3">Оставьте контакты — инженер свяжется, задаст 3–5 вопросов и предложит оптимальную конфигурацию.</p>
            <ul className="mt-6 space-y-2 text-slate-300 text-sm list-disc list-inside">
              <li>Подберём оборудование по вашему анализу воды</li>
              <li>Скажем бюджет и сроки установки</li>
              <li>Объясним обслуживание и расходники</li>
            </ul>
          </div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" placeholder="Имя" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="phone" required placeholder="Телефон*" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="city" placeholder="Город" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="water_issue" placeholder="Проблема с водой" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea name="message" placeholder="Комментарий" rows={3} className="sm:col-span-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button disabled={loading} className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-600/30 disabled:opacity-60">
              {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin"/> : <Phone className="w-5 h-5 mr-2" />} Заказать консультацию
            </button>
            <p className="text-xs text-slate-400 mt-3">Отправляя форму, вы соглашаетесь с обработкой персональных данных</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
