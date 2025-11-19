import { Droplets, FlaskConical, Wrench, Shield } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Умягчение и обезжелезивание",
    desc: "Решаем проблемы жесткости, железа, марганца, запаха и мутности.",
  },
  {
    icon: FlaskConical,
    title: "Анализ воды",
    desc: "Оперативно организуем лабораторный анализ и подбираем технологию.",
  },
  {
    icon: Wrench,
    title: "Монтаж под ключ",
    desc: "Профессиональная установка, пусконаладка и обучение пользованию.",
  },
  {
    icon: Shield,
    title: "Гарантия и сервис",
    desc: "Гарантия до 5 лет и полное сервисное сопровождение.",
  },
];

export default function Features() {
  return (
    <section id="solutions" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Решения для вашей воды</h2>
        <p className="text-slate-300 text-center mt-3">Подберём систему под ваш анализ воды, напор и бюджет</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
              <f.icon className="w-6 h-6 text-cyan-400" />
              <h3 className="text-white font-semibold mt-4">{f.title}</h3>
              <p className="text-slate-300 text-sm mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
