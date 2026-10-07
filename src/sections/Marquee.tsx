import { SKILLS } from "../data/portfolio"

export default function Marquee (){
  return (
      <div className="overflow-hidden border-y py-4" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }} aria-label="Technology ticker">
        <div className="animate-marquee flex w-max gap-3 pr-3">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-3" aria-hidden={copy === 1}>
              {SKILLS.map((t) => (
                <span key={`${copy}-${t}`} className="whitespace-nowrap rounded-full border px-4 py-1.5 font-mono text-[12px]" style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
  )
}

