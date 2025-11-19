import { Pipeline, Ruler, Handshake, Wrench, ShieldCheck } from "lucide-react";

const steps = [
  { icon: Ruler, title: "Обследование", desc: "Выезд инженера, анализ воды и исходных данных." },
  { icon: Pipeline, title: "Проект и подбор", desc: "Схема, оборудование и смета под ваш бюджет." },
  { icon: Handshake, title: "Договор", desc: "Фиксируем сроки, стоимость и гарантию." },
  { icon: Wrench, title: "Монтаж", desc: "Установка, пусконаладка и обучение пользованию." },
  { icon: ShieldCheck, title: "Сервис", desc: "Плановое обслуживание и расходники." },
];

export default function Process() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Как мы работаем</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <s.icon className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-semibold mt-4">{s.title}</h3>
              <p className="text-slate-300 text-sm mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
