import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const LOSSES_BY_YEAR = [
  { year: "2019", value: 14.2, incidents: 6840 },
  { year: "2020", value: 16.8, incidents: 7120 },
  { year: "2021", value: 19.4, incidents: 7380 },
  { year: "2022", value: 24.1, incidents: 7610 },
  { year: "2023", value: 31.7, incidents: 8230 },
];

const LOSS_BREAKDOWN = [
  { label: "Уничтожение оборудования", pct: 38, color: "#C0392B" },
  { label: "Простой производства", pct: 27, color: "#E67E22" },
  { label: "Ущерб зданиям и сооружениям", pct: 22, color: "#2980B9" },
  { label: "Прочие потери", pct: 13, color: "#27AE60" },
];

const KEY_STATS = [
  { value: "31,7", unit: "млрд ₽", label: "Общий ущерб в 2023 году", delta: "+31.5%", up: true },
  { value: "8 230", unit: "пожаров", label: "На промышленных объектах", delta: "+7.6%", up: true },
  { value: "3,9", unit: "млн ₽", label: "Средний ущерб на инцидент", delta: "+22%", up: true },
  { value: "68%", unit: "случаев", label: "Имеют экономически значимый ущерб", delta: "", up: false },
];

function AnimatedNumber({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(ease * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return <>{val.toFixed(1)}</>;
}

function BarChart() {
  const max = Math.max(...LOSSES_BY_YEAR.map((d) => d.value));
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-end gap-3 flex-1 pb-2">
        {LOSSES_BY_YEAR.map((d, i) => (
          <div key={d.year} className="flex flex-col items-center flex-1 gap-1">
            <span className="text-xs font-mono text-[#90A4AE] mb-1">{d.value}</span>
            <div className="w-full relative flex items-end" style={{ height: "120px" }}>
              <div
                className="w-full rounded-t-sm relative overflow-hidden"
                style={{
                  height: animated ? `${(d.value / max) * 100}%` : "0%",
                  transition: `height 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 100}ms`,
                  background: i === 4
                    ? "linear-gradient(180deg, #E53935 0%, #B71C1C 100%)"
                    : "linear-gradient(180deg, #1565C0 0%, #0D47A1 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-20"
                  style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 5px)" }}
                />
              </div>
            </div>
            <span className="text-xs text-[#607D8B] font-mono">{d.year}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-[#546E7A] mt-1 pl-1">млрд ₽</div>
    </div>
  );
}

function DonutChart() {
  const size = 160;
  const r = 58;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(t);
  }, []);

  let offset = 0;
  const segments = LOSS_BREAKDOWN.map((d) => {
    const dash = (d.pct / 100) * circ;
    const gap = circ - dash;
    const seg = { ...d, dasharray: `${animated ? dash : 0} ${circ}`, dashoffset: -offset, transition: "stroke-dasharray 1s ease" };
    offset += dash;
    return seg;
  });

  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="22"
              strokeDasharray={s.dasharray}
              strokeDashoffset={s.dashoffset}
              style={{ transition: `stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms` }}
            />
          ))}
          <circle cx={cx} cy={cy} r={r - 11} fill="#0A1628" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white font-mono">100%</span>
          <span className="text-[10px] text-[#607D8B] uppercase tracking-wider">ущерб</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {LOSS_BREAKDOWN.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
            <span className="text-[11px] text-[#90A4AE] flex-1 leading-tight">{d.label}</span>
            <span className="text-[13px] font-bold font-mono" style={{ color: d.color }}>{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #070E1C 0%, #0A1628 50%, #0D1F3C 100%)",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="w-full max-w-5xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 rounded-full" style={{ background: "linear-gradient(180deg, #E53935, #FF6B35)" }} />
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#546E7A] mb-1 font-mono">
                Аналитический доклад · 2023
              </div>
              <h1 className="text-2xl font-bold text-white leading-tight">
                Экономические потери от пожаров
                <br />
                <span style={{ color: "#EF5350" }}>на промышленных предприятиях</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-1.5">
            <Icon name="Flame" size={14} className="text-[#EF5350]" />
            <span className="text-xs text-[#90A4AE] font-mono">МЧС России · Росстат</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {KEY_STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-lg p-4 border relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: i === 0 ? "rgba(229,57,53,0.4)" : "rgba(255,255,255,0.08)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${200 + i * 100}ms, transform 0.5s ease ${200 + i * 100}ms`,
              }}
            >
              {i === 0 && (
                <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(circle at 50% 0%, #E53935, transparent 70%)" }} />
              )}
              <div className="text-2xl font-bold text-white font-mono leading-none">
                {s.value}
                <span className="text-sm font-normal text-[#607D8B] ml-1">{s.unit}</span>
              </div>
              <div className="text-[11px] text-[#78909C] mt-1.5 leading-tight">{s.label}</div>
              {s.delta && (
                <div className={`flex items-center gap-1 mt-2 text-[11px] font-mono font-medium ${s.up ? "text-[#EF5350]" : "text-[#66BB6A]"}`}>
                  <Icon name={s.up ? "TrendingUp" : "TrendingDown"} size={11} />
                  {s.delta} к 2022 г.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Bar chart */}
          <div
            className="rounded-lg p-5 border"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#546E7A] font-mono mb-0.5">Динамика потерь</div>
                <div className="text-sm font-semibold text-[#CFD8DC]">2019 — 2023, млрд ₽</div>
              </div>
              <div className="flex items-center gap-1.5 text-[#EF5350]">
                <Icon name="TrendingUp" size={16} />
                <span className="text-sm font-bold font-mono">+123%</span>
              </div>
            </div>
            <BarChart />
          </div>

          {/* Donut chart */}
          <div
            className="rounded-lg p-5 border"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="mb-4">
              <div className="text-xs uppercase tracking-widest text-[#546E7A] font-mono mb-0.5">Структура ущерба</div>
              <div className="text-sm font-semibold text-[#CFD8DC]">По категориям потерь, %</div>
            </div>
            <DonutChart />
          </div>
        </div>

        {/* Bottom strip — key insights */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: "AlertTriangle",
              color: "#EF5350",
              title: "Наибольший риск",
              text: "Химические и нефтеперерабатывающие предприятия — 42% от общего ущерба",
            },
            {
              icon: "BarChart2",
              color: "#42A5F5",
              title: "CAGR потерь 2019–2023",
              text: "Среднегодовой темп роста ущерба составляет 22,3% — опережает инфляцию в 3 раза",
            },
            {
              icon: "ShieldAlert",
              color: "#FFA726",
              title: "Недострахование",
              text: "Только 31% объектов имеют страховку, покрывающую реальный масштаб ущерба",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-4 border flex gap-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${600 + i * 100}ms, transform 0.5s ease ${600 + i * 100}ms`,
              }}
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
              >
                <Icon name={item.icon} fallback="AlertTriangle" size={15} style={{ color: item.color }} />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#CFD8DC] mb-0.5">{item.title}</div>
                <div className="text-[11px] text-[#607D8B] leading-snug">{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-[10px] font-mono text-[#37474F] uppercase tracking-widest">
            Источники: МЧС России, Росстат, ВЦИОМ — данные за 2023 г.
          </span>
          <span className="text-[10px] font-mono text-[#37474F]">Слайд 01 / 08</span>
        </div>
      </div>
    </div>
  );
}