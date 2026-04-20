import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SECTIONS = [
  {
    id: "object",
    label: "Объект",
    num: "01",
    icon: "Building2",
    color: "#42A5F5",
    accent: "#1565C0",
    title: "Система обеспечения пожарной безопасности",
    subtitle: "на промышленных объектах",
    desc: "Комплекс организационных, инженерно-технических и нормативных мер, направленных на предотвращение возникновения пожаров и ограничение их последствий на объектах промышленного производства.",
    tags: ["Промышленные объекты", "Системы защиты", "Организационные меры"],
  },
  {
    id: "subject",
    label: "Предмет",
    num: "02",
    icon: "FileText",
    color: "#FFA726",
    accent: "#E65100",
    title: "Нормативно-правовые и инженерно-технические требования",
    subtitle: "методы регулирования пожарной безопасности",
    desc: "Совокупность законодательных актов, технических регламентов, стандартов и методологических инструментов, определяющих порядок обеспечения пожарной безопасности на производственных предприятиях.",
    tags: ["Технические регламенты", "ГОСТ и СП", "Методы контроля"],
  },
  {
    id: "goal",
    label: "Цель",
    num: "03",
    icon: "Target",
    color: "#EF5350",
    accent: "#B71C1C",
    title: "Анализ системы технического регулирования ПБ",
    subtitle: "и обоснование эффективности мер",
    desc: "Провести комплексный анализ системы технического регулирования пожарной безопасности и обосновать эффективность мер по выполнению требований действующего законодательства Российской Федерации.",
    tags: ["Системный анализ", "Оценка эффективности", "Законодательство РФ"],
  },
];

function ConnectionLine({ animated }: { animated: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-1" style={{ minWidth: 32 }}>
      <div
        className="w-px rounded-full"
        style={{
          height: animated ? "100%" : "0%",
          minHeight: animated ? 60 : 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.04) 100%)",
          transition: "min-height 0.8s ease 0.6s",
        }}
      />
    </div>
  );
}

export default function Slide3() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

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
      {/* Grid overlay */}
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
            <div className="w-1 h-12 rounded-full" style={{ background: "linear-gradient(180deg, #42A5F5, #1565C0)" }} />
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#546E7A] mb-1 font-mono">
                Методология исследования · Слайд 03
              </div>
              <h1 className="text-2xl font-bold text-white leading-tight">
                Объект, предмет и цель
                <br />
                <span style={{ color: "#42A5F5" }}>исследования</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-1.5">
            <Icon name="BookOpen" size={14} className="text-[#42A5F5]" />
            <span className="text-xs text-[#90A4AE] font-mono">Структура работы</span>
          </div>
        </div>

        {/* Main cards */}
        <div className="flex gap-3 mb-5">
          {SECTIONS.map((s, i) => (
            <>
              <div
                key={s.id}
                className="flex-1 rounded-xl border relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: `${s.color}30`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${200 + i * 150}ms, transform 0.6s ease ${200 + i * 150}ms`,
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${s.color}, ${s.accent})` }}
                />

                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.color}, transparent 65%)` }}
                />

                <div className="p-6">
                  {/* Number + icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="text-5xl font-bold font-mono leading-none"
                      style={{ color: `${s.color}20` }}
                    >
                      {s.num}
                    </div>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${s.color}15`,
                        border: `1px solid ${s.color}35`,
                      }}
                    >
                      <Icon name={s.icon} fallback="Circle" size={20} style={{ color: s.color }} />
                    </div>
                  </div>

                  {/* Label badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] mb-4"
                    style={{
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}30`,
                      color: s.color,
                    }}
                  >
                    {s.label}
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-white leading-snug mb-1">
                    {s.title}
                  </h2>
                  <p className="text-xs text-[#546E7A] mb-4 italic">{s.subtitle}</p>

                  {/* Divider */}
                  <div className="h-px mb-4" style={{ background: `${s.color}18` }} />

                  {/* Description */}
                  <p className="text-[12px] text-[#78909C] leading-relaxed mb-5">
                    {s.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded font-mono"
                        style={{ background: "rgba(255,255,255,0.05)", color: "#607D8B", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {i < SECTIONS.length - 1 && (
                <ConnectionLine key={`line-${i}`} animated={visible} />
              )}
            </>
          ))}
        </div>

        {/* Bottom — research logic strip */}
        <div
          className="rounded-lg p-4 border flex items-center gap-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.07)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 700ms",
          }}
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <Icon name="GitMerge" size={16} className="text-[#546E7A]" />
            <span className="text-xs text-[#546E7A] uppercase tracking-widest font-mono">Логика исследования</span>
          </div>
          <div className="h-4 w-px bg-white/10 flex-shrink-0" />
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            {[
              { step: "Нормативная база", icon: "FileText" },
              { step: "Технические регламенты", icon: "Settings" },
              { step: "Практика применения", icon: "Briefcase" },
              { step: "Оценка эффективности", icon: "BarChart2" },
              { step: "Рекомендации", icon: "CheckCircle" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <Icon name={item.icon} fallback="Circle" size={12} className="text-[#42A5F5]" />
                  <span className="text-[11px] text-[#607D8B] font-mono whitespace-nowrap">{item.step}</span>
                </div>
                {i < 4 && <Icon name="ChevronRight" size={12} className="text-[#263238]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-[10px] font-mono text-[#37474F] uppercase tracking-widest">
            Технический регламент · Федеральный закон № 123-ФЗ · ГОСТ
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-[11px] text-[#546E7A] hover:text-[#90A4AE] transition-colors font-mono"
            >
              <Icon name="ChevronLeft" size={13} />
              Слайд 01
            </button>
            <span className="text-[10px] font-mono text-[#37474F]">Слайд 03 / 08</span>
          </div>
        </div>
      </div>
    </div>
  );
}
