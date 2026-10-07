import { useState } from "react";
import { PROFILE, SOCIALS } from "../data/portfolio";
import { Reveal } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";

const CONTACT_TO = PROFILE.email;
const CUSTOM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      _subject: `Portfolio contact from ${form.name.trim()}`,
      _template: "table",
    };

    // Primary: silent HTTP delivery straight to the inbox.
    // Falls back to the visitor's email app only if the network request fails.
    const endpoints = [
      ...(CUSTOM_ENDPOINT ? [CUSTOM_ENDPOINT] : []),
      `https://formsubmit.co/ajax/${CONTACT_TO}`,
    ];

    let delivered = false;
    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          delivered = true;
          break;
        }
      } catch {
        // try next endpoint / fallback below
      }
    }

    if (delivered) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    // Last-resort fallback: pre-fill the visitor's email app addressed to you.
    const subject = encodeURIComponent(`Portfolio contact from ${payload.name}`);
    const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
    window.location.href = `mailto:${CONTACT_TO}?subject=${subject}&body=${body}`;
    setStatus("error");
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
                <span className="font-mono text-[11px]" style={{ color: "#818cf8" }}>Write me directly →</span>
              </a>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="card-lift flex items-center justify-between rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
                  <span className="text-[14px] font-bold" style={{ color: "var(--text)" }}>{s.label}</span>
                  <span className="font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>↗ open</span>
                </a>
              ))}
              <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: "var(--text-faint)" }}>
                Prefer email? Send a message directly - I typically reply within 1-2 days.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="flex h-full flex-col gap-4 rounded-2xl border p-7"
              style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
              aria-label="Contact form"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-faint)" }}>Send a message</p>
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-[13px] font-semibold" style={{ color: "var(--text)" }}>Name</label>
                <input
                  id="contact-name" name="name" required autoComplete="name"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  disabled={status === "sending" || status === "sent"}
                  className="w-full rounded-xl border px-4 py-3 text-[14px] outline-none transition-colors focus:border-indigo-400 disabled:opacity-60"
                  style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text)" }}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-[13px] font-semibold" style={{ color: "var(--text)" }}>Email</label>
                <input
                  id="contact-email" name="email" type="email" required autoComplete="email"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  disabled={status === "sending" || status === "sent"}
                  className="w-full rounded-xl border px-4 py-3 text-[14px] outline-none transition-colors focus:border-indigo-400 disabled:opacity-60"
                  style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text)" }}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="contact-message" className="mb-1.5 block text-[13px] font-semibold" style={{ color: "var(--text)" }}>Message</label>
                <textarea
                  id="contact-message" name="message" required rows={5}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the product, timeline and what success looks like…"
                  disabled={status === "sending" || status === "sent"}
                  className="w-full resize-y rounded-xl border px-4 py-3 text-[14px] outline-none transition-colors focus:border-indigo-400 disabled:opacity-60"
                  style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text)" }}
                />
              </div>
              {status === "sent" ? (
                <div role="status">
                  <p className="rounded-xl border px-4 py-3 text-[13.5px]" style={{ borderColor: "rgba(52,211,153,.4)", background: "rgba(52,211,153,.08)", color: "#34d399" }}>
                    Thanks — your message has been sent. I&apos;ll get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-3 font-mono text-[12px] underline underline-offset-4"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-xl px-6 py-3.5 text-[14.5px] font-bold text-white transition-transform hover:-translate-y-px disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
                    style={{ background: "linear-gradient(135deg,#6366f1,#7c6cf6)", boxShadow: "0 12px 32px -10px rgba(99,102,241,.5)" }}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  {status === "error" && (
                    <p role="alert" className="text-[12.5px]" style={{ color: "#f87171" }}>
                      Couldn&apos;t send just now - your email app should have opened with the message ready to send.
                    </p>
                  )}
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
