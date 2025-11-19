import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Droplets, Users, FlaskConical, ShieldCheck, Gauge, Settings2 } from "lucide-react";

const formatPrice = (n) => new Intl.NumberFormat("ru-RU").format(Math.round(n));

export default function WaterCalculator({ onRequest }) {
  const [source, setSource] = useState("well");
  const [hardness, setHardness] = useState(6); // °Ж
  const [iron, setIron] = useState(0.5); // mg/L
  const [people, setPeople] = useState(3);
  const [flow, setFlow] = useState(15); // L/min
  const [options, setOptions] = useState({ uv: true, carbon: true, ro: true });

  const result = useMemo(() => {
    const modules = [];
    let min = 0;
    let max = 0;

    // Softener sizing by people + hardness
    if (hardness > 3) {
      let tier = "S";
      if (people <= 2 && flow <= 12) tier = "S";
      else if (people <= 4 && flow <= 18) tier = "M";
      else tier = "L";

      let range = [45000, 60000];
      if (tier === "M") range = [70000, 110000];
      if (tier === "L") range = [120000, 180000];
      modules.push({ key: "softener", title: "Умягчитель", tier, price: range });
      min += range[0];
      max += range[1];
    }

    // Iron removal depending on iron level and source
    if (iron > 0.3 || source !== "city") {
      let tier = "S";
      if (iron <= 0.5) tier = "S";
      else if (iron <= 1.5) tier = "M";
      else tier = "L";
      let range = [60000, 90000];
      if (tier === "M") range = [90000, 120000];
      if (tier === "L") range = [120000, 160000];
      modules.push({ key: "deiron", title: "Обезжелезиватель", tier, price: range });
      min += range[0];
      max += range[1];
    }

    // Carbon filter
    if (options.carbon) {
      const range = [20000, 40000];
      modules.push({ key: "carbon", title: "Угольный фильтр", tier: "-", price: range });
      min += range[0];
      max += range[1];
    }

    // UV disinfection
    if (options.uv || source !== "city") {
      const range = [25000, 45000];
      modules.push({ key: "uv", title: "УФ-обеззараживание", tier: "-", price: range });
      min += range[0];
      max += range[1];
    }

    // Drinking RO system
    if (options.ro) {
      const range = [18000, 35000];
      modules.push({ key: "ro", title: "Обратный осмос (питьевая вода)", tier: "-", price: range });
      min += range[0];
      max += range[1];
    }

    // Installation allowance varies by complexity
    const install = source === "city" ? [20000, 40000] : [35000, 60000];
    modules.push({ key: "install", title: "Монтаж и пусконаладка", tier: "-", price: install });
    min += install[0];
    max += install[1];

    return { modules, min, max };
  }, [source, hardness, iron, people, flow, options]);

  const summary = `Источник: ${source === "well" ? "Колодец" : source === "borehole" ? "Скважина" : "Центральный водопровод"}; Жесткость: ${hardness}°Ж; Железо: ${iron} мг/л; Людей: ${people}; Расход: ${flow} л/мин; Опции: ${Object.entries(options).filter(([,v])=>v).map(([k])=>({uv:"УФ", carbon:"Уголь", ro:"Осмос"}[k])).join(", ")}`;

  return (
    <section id="calculator" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-cyan-400"/>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Калькулятор системы</h2>
        </div>
        <p className="text-slate-300 mt-2">Подберите ориентировочную конфигурацию и стоимость под ваш дом.</p>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-slate-300">Источник</span>
                <select value={source} onChange={(e)=>setSource(e.target.value)} className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white">
                  <option value="well">Колодец</option>
                  <option value="borehole">Скважина</option>
                  <option value="city">Центральный водопровод</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Кол-во жителей</span>
                <div className="mt-1 flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-400"/>
                  <input type="range" min={1} max={8} value={people} onChange={(e)=>setPeople(parseInt(e.target.value))} className="w-full"/>
                  <span className="w-8 text-right text-white">{people}</span>
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Жесткость, °Ж</span>
                <div className="mt-1 flex items-center gap-3">
                  <Droplets className="w-4 h-4 text-slate-400"/>
                  <input type="range" min={0} max={20} step={0.5} value={hardness} onChange={(e)=>setHardness(parseFloat(e.target.value))} className="w-full"/>
                  <span className="w-12 text-right text-white">{hardness}</span>
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Железо, мг/л</span>
                <div className="mt-1 flex items-center gap-3">
                  <FlaskConical className="w-4 h-4 text-slate-400"/>
                  <input type="range" min={0} max={5} step={0.1} value={iron} onChange={(e)=>setIron(parseFloat(e.target.value))} className="w-full"/>
                  <span className="w-12 text-right text-white">{iron}</span>
                </div>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm text-slate-300">Расход воды (пиковый), л/мин</span>
                <div className="mt-1 flex items-center gap-3">
                  <Gauge className="w-4 h-4 text-slate-400"/>
                  <input type="range" min={8} max={30} step={1} value={flow} onChange={(e)=>setFlow(parseInt(e.target.value))} className="w-full"/>
                  <span className="w-12 text-right text-white">{flow}</span>
                </div>
              </label>

              <div className="sm:col-span-2 mt-2 grid grid-cols-3 gap-3 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" checked={options.carbon} onChange={(e)=>setOptions(o=>({...o, carbon: e.target.checked}))}/>
                  <span>Угольный фильтр</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" checked={options.uv} onChange={(e)=>setOptions(o=>({...o, uv: e.target.checked}))}/>
                  <span>УФ</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" checked={options.ro} onChange={(e)=>setOptions(o=>({...o, ro: e.target.checked}))}/>
                  <span>Питьевой осмос</span>
                </label>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-900/60 border border-white/10 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 mb-1"><Settings2 className="w-4 h-4 text-cyan-400"/><span>Параметры:</span></div>
              <div className="text-slate-200">{summary}</div>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="text-xl font-semibold text-white">Рекомендованная конфигурация</h3>
            <ul className="mt-4 space-y-3">
              {result.modules.map((m) => (
                <li key={m.key} className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <div>
                    <div className="text-white">{m.title} {m.tier !== '-' ? `(${m.tier})` : ''}</div>
                    <div className="text-slate-400 text-sm">{formatPrice(m.price[0])}–{formatPrice(m.price[1])} ₽</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-500/30 border border-white/10 p-4">
              <div className="text-slate-300 text-sm">Ориентировочная стоимость системы</div>
              <div className="text-3xl font-extrabold text-white mt-1">{formatPrice(result.min)}–{formatPrice(result.max)} ₽</div>
              <div className="text-xs text-slate-400 mt-1">Итог зависит от анализа воды, брендов и комплектации.</div>
            </div>

            <button onClick={onRequest} className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-600/30">
              Получить точный расчёт
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
