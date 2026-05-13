import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";

export default function ReachOut() {
  return (
    <section id="reach-out" className="relative py-28 sm:py-36 bg-gradient-onyx text-ivory overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/30 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[460px] w-[460px] rounded-full bg-bronze/40 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Reach Out</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance">
            Step into <em className="not-italic text-gradient-gold">PIPA</em>.
          </h2>
          <p className="mt-5 text-ivory/70">
            Book a private viewing, request a bespoke commission, or simply say hello.
            Our concierge replies within a few golden hours.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 glass-dark rounded-[2rem] p-8 sm:p-10 shadow-luxe"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your name" placeholder="Aria Devereux" />
              <Field label="Email" type="email" placeholder="aria@example.com" />
              <Field label="Phone" placeholder="+91 99999 99999" />
              <Field label="Interest" placeholder="Bespoke ring" />
            </div>
            <div className="mt-5">
              <label className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about the piece you're dreaming of…"
                className="mt-2 w-full rounded-2xl bg-ivory/5 border border-ivory/15 px-4 py-3 text-ivory placeholder:text-ivory/40 outline-none focus:border-gold transition resize-none"
              />
            </div>
            <div className="mt-7 flex flex-wrap gap-3 items-center justify-between">
              <button
                type="submit"
                className="shine inline-flex items-center gap-3 rounded-full bg-gradient-gold text-onyx px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium shadow-glow hover:opacity-95 transition"
              >
                Send Enquiry <Send className="h-4 w-4" />
              </button>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-xs uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition"
              >
                <Phone className="h-4 w-4" /> WhatsApp Concierge
              </a>
            </div>
          </motion.form>

          {/* Side cards */}
          <div className="lg:col-span-5 grid gap-5">
            <ContactCard
              icon={MapPin}
              title="Atelier"
              lines={["The Heritage Quarter", "Jaipur · Rajasthan, India"]}
            />
            <ContactCard
              icon={Mail}
              title="Email"
              lines={["concierge@pipajewellery.com", "press@pipajewellery.com"]}
            />
            <ContactCard
              icon={Instagram}
              title="Follow"
              lines={["@pipa.jewellery — daily inspirations"]}
            />

            <div className="relative rounded-[2rem] overflow-hidden h-44 shadow-luxe">
              <img
                src="https://images.unsplash.com/photo-1524293568345-75d62c3664f7?auto=format&fit=crop&w=1200&q=80"
                alt="Map placeholder"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-onyx/80 via-onyx/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/70">Visit us</p>
                  <p className="font-display text-2xl">By private appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full bg-ivory/5 border border-ivory/15 px-5 py-3 text-ivory placeholder:text-ivory/40 outline-none focus:border-gold transition"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
}: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-dark rounded-2xl p-6 flex items-start gap-4 hover:border-gold/40 transition"
    >
      <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-gold text-onyx shadow-glow">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">{title}</p>
        {lines.map((l) => (
          <p key={l} className="mt-1 text-ivory/90">{l}</p>
        ))}
      </div>
    </motion.div>
  );
}
