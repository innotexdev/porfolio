import { useState } from "react";
import { PROFILE, SOCIALS } from "../data/portfolio";
import { Reveal } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integration point: wire to Formspree / Resend / backend endpoint.
    // e.g. await fetch(import.meta.env.VITE_CONTACT_ENDPOINT, { method: "POST", body: JSON.stringify(form) })
    setSent(true);
  };

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden border-t" style={{ borderColor: "var(--line)" }}>
      <div className="absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(700px 320px at 50% 110%, rgba(99,102,241,.18), transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title={<>Have an idea, product or <span style={{ color: "#818cf8" }}>engineering challenge?</span><br />Let&apos;s build something useful.</>}
          description="I'm interested in full-time roles, product collaborations and serious freelance builds -especially where frontend, backend and data all matter."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-3 rounded-2xl border p-7" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-faint)" }}>Direct channels</p>
              <a href={`mailto:${PROFILE.email}`} className="card-lift rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
                <span className="font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>EMAIL</span>
                <span className="block truncate text-[14px] font-bold" style={{ color: "var(--text)" }}>{PROFILE.email}</span>
                <span className="font-mono text-[11px]" style={{ color: "#818cf8" }}>Replace with your real address →</span>
              </a>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="card-lift flex items-center justify-between rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
                  <span className="text-[14px] font-bold" style={{ color: "var(--text)" }}>{s.label}</span>
                  <span className="font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>{s.label === "Resume" ? "↗ open" : "↗ placeholder"}</span>
                </a>
              ))}
              <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: "var(--text-faint)" }}>
                No contact details are invented here -every link above is a placeholder for you to replace with real URLs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="flex h-full flex-col gap-4 rounded-2xl border p-7"
              style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
              aria-label="Contact form (front-end only -connect an email service to activate)"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-faint)" }}>Send a message</p>
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-[13px] font-semibold" style={{ color: "var(--text)" }}>Name</label>
                <input
                  id="contact-name" name="name" required autoComplete="name"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl border px-4 py-3 text-[14px] outline-none transition-colors focus:border-indigo-400"
                  style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text)" }}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-[13px] font-semibold" style={{ color: "var(--text)" }}>Email</label>
                <input
                  id="contact-email" name="email" type="email" required autoComplete="email"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border px-4 py-3 text-[14px] outline-none transition-colors focus:border-indigo-400"
                  style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text)" }}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="contact-message" className="mb-1.5 block text-[13px] font-semibold" style={{ color: "var(--text)" }}>Message</label>
                <textarea
                  id="contact-message" name="message" required rows={5}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the product, timeline and what success looks like…"
                  className="w-full resize-y rounded-xl border px-4 py-3 text-[14px] outline-none transition-colors focus:border-indigo-400"
                  style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text)" }}
                />
              </div>
              {sent ? (
                <p role="status" className="rounded-xl border px-4 py-3 text-[13.5px]" style={{ borderColor: "rgba(52,211,153,.4)", background: "rgba(52,211,153,.08)", color: "#34d399" }}>
                  Message captured locally. Connect an email integration (Formspree, Resend, or your API at{" "}
                  <code className="font-mono">VITE_CONTACT_ENDPOINT</code>) to deliver it -see the code comment in Contact.tsx.
                </p>
              ) : (
                <button
                  type="submit"
                  className="rounded-xl px-6 py-3.5 text-[14.5px] font-bold text-white transition-transform hover:-translate-y-px"
                  style={{ background: "linear-gradient(135deg,#6366f1,#7c6cf6)", boxShadow: "0 12px 32px -10px rgba(99,102,241,.5)" }}
                >
                  Send message
                </button>
              )}
              <p className="font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>
                Integration point: POST → import.meta.env.VITE_CONTACT_ENDPOINT
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
