"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Church,
  PartyPopper,
  Sparkles,
  Clock,
  MessageCircle,
  Camera,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const PHOTO_URL =
  "https://i.postimg.cc/qqSds3qw/Whats-App-Image-2026-04-06-at-16-47-05.jpg";
const MAP_CHURCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Parroquia+San+Gabriel+Arc%C3%A1ngel+La+Poveda";
const MAP_CELEBRATION_URL =
  "https://www.google.com/maps/search/?api=1&query=Complejo+La+Cig%C3%BCe%C3%B1a+Arganda+del+Rey";
const RSVP_URL =
  "https://wa.me/34637851276?text=Hola%20Mar%C3%ADa%20y%20Guille%2C%20confirmamos%20asistencia%20para%20la%20comuni%C3%B3n%20de%20Carla.%20Seremos%20X%20personas.";
const EVENT_START = new Date("2026-05-30T12:00:00");

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "lg";
};

function Button({
  children,
  className = "",
  asChild = false,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const sizeClasses: Record<string, string> = {
    default: "h-10 px-4 py-2",
    lg: "h-11 px-6 py-3 text-base",
  };

  const variantClasses: Record<string, string> = {
    default: "border border-transparent",
    outline: "border bg-transparent",
  };

  const shared = `inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98A1A]/40 disabled:pointer-events-none disabled:opacity-50 ${
    sizeClasses[size] || sizeClasses.default
  } ${variantClasses[variant] || variantClasses.default} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
      }>,
      {
        ...props,
        className: `${shared} ${
          (children as React.ReactElement<{ className?: string }>).props
            .className || ""
        }`.trim(),
      }
    );
  }

  return (
    <button {...props} className={shared}>
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`rounded-xl border bg-white text-[#4C5446] ${className}`}
    >
      {children}
    </div>
  );
}

function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

function PremiumButton({
  children,
  className = "",
  asChild,
  ...props
}: any) {
  if (asChild) {
    return (
      <Button
        {...props}
        asChild
        className={`rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(111,126,99,0.18)] ${className}`}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      {...props}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(111,126,99,0.18)] ${className}`}
    >
      <span className="absolute inset-0 -translate-x-[130%] bg-[linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.28)_45%,transparent_75%)] transition-transform duration-700 group-hover:translate-x-[130%]" />
      <span className="relative z-10 inline-flex items-center">{children}</span>
    </Button>
  );
}

function useCountdown(targetDate: Date) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) {
    return { days: "--", hours: "--", minutes: "--", seconds: "--" };
  }

  const diff = Math.max(targetDate.getTime() - now.getTime(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function addToCalendarUrl() {
  const start = "20260530T100000Z";
  const end = "20260530T170000Z";
  const text = encodeURIComponent("Primera Comunión de Carla");
  const details = encodeURIComponent(
    "Ceremonia: Parroquia San Gabriel Arcángel - La Poveda. Celebración posterior en Complejo La Cigüeña, Arganda del Rey."
  );
  const location = encodeURIComponent(
    "Parroquia San Gabriel Arcángel - La Poveda"
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}%2F${end}&details=${details}&location=${location}`;
}

function FloatingBlobs() {
  const items = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 160 + (item % 3) * 60,
            height: 160 + (item % 3) * 60,
            background:
              item % 2 === 0
                ? "rgba(220,230,219,0.45)"
                : "rgba(234,203,142,0.18)",
            left: `${(item * 13) % 100}%`,
            top: `${(item * 17) % 100}%`,
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.06, 0.96, 1],
          }}
          transition={{
            duration: 8 + item,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: any;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="space-y-3 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#D9E2D7] bg-white/70 px-4 py-2 text-sm text-[#6F7E63] shadow-sm backdrop-blur-sm">
        <Icon className="h-4 w-4" />
        <span>{eyebrow}</span>
      </div>
      <h2
        className="text-3xl font-semibold tracking-tight text-[#4C5446] md:text-4xl"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

function DetailCard({ icon: Icon, title, children, actionLabel, href }: any) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.24 }}>
      <Card className="group h-full overflow-hidden rounded-3xl border-[#E5E9E2] bg-white/80 shadow-[0_14px_36px_rgba(111,126,99,0.08)] backdrop-blur-sm">
        <CardContent className="relative space-y-4 p-6 md:p-7">
          <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(220,230,219,0.45),transparent_60%)]" />
          <div className="relative flex items-center gap-3">
            <div className="rounded-2xl bg-[#F1F5EF] p-3 text-[#6F7E63] shadow-sm ring-1 ring-[#E7ECE5]">
              <Icon className="h-5 w-5" />
            </div>
            <h3
              className="text-xl font-semibold text-[#4C5446]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {title}
            </h3>
          </div>
          <div className="relative text-[15px] leading-relaxed text-[#66705E] md:text-base">
            {children}
          </div>
          {href && (
            <PremiumButton
              asChild
              className="bg-[#6F7E63] text-white shadow-sm hover:bg-[#627156]"
            >
              <a href={href} target="_blank" rel="noreferrer">
                {actionLabel} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </PremiumButton>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const items = [
    {
      time: "11:45",
      title: "Recepción",
      short: "Llegada y bienvenida antes de comenzar.",
      description:
        "Os esperamos un poco antes para recibiros con calma y disfrutar de ese primer momento juntos antes de entrar a la ceremonia.",
      icon: CalendarDays,
      align: "left",
      accent: "from-[#EEF3EB] to-[#FBF8F1]",
      buttonLabel: "Ver detalles",
      href: MAP_CHURCH_URL,
      linkText: "Cómo llegar a la parroquia",
    },
    {
      time: "12:00",
      title: "Inicio de ceremonia",
      short: "Comienza la comunión de Carla.",
      description:
        "La ceremonia comenzará en la Parroquia San Gabriel Arcángel - La Poveda. Os recomendamos estar ya acomodados unos minutos antes.",
      icon: Church,
      align: "right",
      accent: "from-[#FBF7EE] to-[#F4F7F1]",
      buttonLabel: "Ver templo",
      href: MAP_CHURCH_URL,
      linkText: "Abrir ubicación",
    },
    {
      time: "13:00",
      title: "Fotografías",
      short: "Momento para inmortalizar el día.",
      description:
        "Tendremos un espacio reservado para las fotografías con la familia, padrinos y ahijada, para guardar un recuerdo bonito de este día tan especial.",
      icon: Camera,
      align: "left",
      accent: "from-[#EFF4EF] to-[#FCF7EF]",
      buttonLabel: "Ver momento",
    },
    {
      time: "13:30",
      title: "Celebración en La Cigüeña",
      short: "Seguimos la fiesta todos juntos.",
      description:
        "Tras la ceremonia, nos desplazaremos al complejo La Cigüeña, en Arganda del Rey, donde continuaremos celebrándolo con comida, familia y mucha ilusión.",
      icon: Sparkles,
      align: "right",
      accent: "from-[#FCF6EB] to-[#EEF3EB]",
      buttonLabel: "Ir a la celebración",
      href: MAP_CELEBRATION_URL,
      linkText: "Abrir ubicación de la celebración",
    },
  ];

  return (
    <Card className="relative overflow-hidden rounded-[32px] border-[#E5E9E2] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,245,241,0.98))] shadow-[0_20px_60px_rgba(111,126,99,0.10)]">
      <div className="pointer-events-none absolute -left-8 top-0 h-48 w-48 rounded-full bg-[#DCE6DB]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-[#EACB8E]/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(220,230,219,0.55),transparent_60%)]" />

      <CardContent className="relative p-6 md:p-10 lg:p-12">
        <div className="mb-10 space-y-4 text-center md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E8D3A9] bg-white/85 px-4 py-2 text-sm text-[#C98A1A] shadow-sm backdrop-blur-sm"
          >
            <Clock className="h-4 w-4" />
            Itinerario del día
          </motion.div>
          <h3
            className="text-3xl font-semibold tracking-tight text-[#4C5446] md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Una jornada pensada para disfrutarla sin prisas
          </h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#66705E] md:text-lg">
            Hemos preparado este pequeño recorrido para que tengáis claro el
            orden del día. Cada momento incluye información ampliada y accesos
            directos cuando resultan útiles.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-2 left-5 top-2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#D7E0D5] via-[#C9A168] to-[#D7E0D5] md:left-1/2" />

          <div className="space-y-8 md:space-y-10">
            {items.map((item, index) => {
              const Icon = item.icon;
              const isRight = item.align === "right";
              const isActive = activeIndex === index;

              const content = (
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.22 }}
                  className={`group relative inline-block w-full max-w-lg overflow-hidden rounded-[30px] border ${
                    isActive
                      ? "border-[#DCC08A] shadow-[0_20px_50px_rgba(201,138,26,0.16)]"
                      : "border-[#E6E8E1] shadow-[0_10px_24px_rgba(111,126,99,0.08)]"
                  } bg-white/90 backdrop-blur-sm`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-70`}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-white/80" />
                  <div className="relative p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-[20px] bg-white/80 p-3 text-[#4C5446] shadow-sm ring-1 ring-[#E8ECE5]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-2xl font-bold tracking-tight text-[#C98A1A] md:text-3xl">
                          {item.time}
                        </p>
                        <h4
                          className="mt-1 text-xl font-semibold leading-tight text-[#4C5446] md:text-2xl"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#6A7463] md:text-base">
                          {item.short}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <PremiumButton
                            type="button"
                            onClick={() =>
                              setActiveIndex(isActive ? null : index)
                            }
                            variant="outline"
                            className="border-[#DADFD7] bg-white/80 text-[#4C5446] hover:bg-white"
                          >
                            {isActive ? "Ocultar detalle" : item.buttonLabel}
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition-transform ${
                                isActive ? "rotate-180" : ""
                              }`}
                            />
                          </PremiumButton>
                          {item.href && item.linkText && (
                            <PremiumButton
                              asChild
                              className="bg-[#6F7E63] text-white hover:bg-[#627156]"
                            >
                              <a href={item.href} target="_blank" rel="noreferrer">
                                {item.linkText}{" "}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </PremiumButton>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                                marginTop: 16,
                              }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{
                                duration: 0.28,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="rounded-2xl border border-[#E7EBE4] bg-white/75 p-4 text-sm leading-relaxed text-[#66705E] md:text-base">
                                {item.description}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="relative grid items-center gap-4 md:grid-cols-2 md:gap-10"
                >
                  <div
                    className={`pl-14 md:pl-0 md:pr-14 ${
                      isRight ? "md:pointer-events-none md:opacity-0" : ""
                    }`}
                  >
                    {!isRight && content}
                  </div>
                  <div
                    className={`pl-14 md:pl-14 ${
                      !isRight ? "md:pointer-events-none md:opacity-0" : ""
                    }`}
                  >
                    {isRight && content}
                  </div>

                  <motion.div
                    animate={{ scale: isActive ? [1, 1.18, 1] : 1 }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                    }}
                    className="absolute left-5 top-8 -translate-x-1/2 md:left-1/2"
                  >
                    <div className="relative h-6 w-6 rounded-full bg-[#C9A168] shadow-[0_0_0_6px_rgba(247,245,241,1)]">
                      <div className="absolute inset-0 rounded-full bg-[#E7C68B] opacity-60 blur-[2px]" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function InvitacionComunionCarla() {
  const countdown = useCountdown(EVENT_START);

  useEffect(() => {
    const fontId = "carla-premium-fonts";
    if (!document.getElementById(fontId)) {
      const preconnectA = document.createElement("link");
      preconnectA.rel = "preconnect";
      preconnectA.href = "https://fonts.googleapis.com";
      document.head.appendChild(preconnectA);

      const preconnectB = document.createElement("link");
      preconnectB.rel = "preconnect";
      preconnectB.href = "https://fonts.gstatic.com";
      preconnectB.crossOrigin = "";
      document.head.appendChild(preconnectB);

      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap";
      document.head.appendChild(link);
    }

    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen overflow-hidden bg-[#F7F5F1] text-[#4C5446]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <FloatingBlobs />

      <header className="relative mx-auto max-w-6xl px-6 pb-16 pt-8 md:px-10 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="order-2 space-y-6 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D3A9] bg-white/80 px-4 py-2 text-sm text-[#C98A1A] shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Invitación digital
            </div>

            <div className="space-y-4">
              <p className="max-w-md text-lg text-[#66705E] md:text-xl">
                Nos haría muchísima ilusión compartir este día tan especial con
                vosotros
              </p>
              <p
                className="text-2xl text-[#6F7E63] md:text-4xl"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                te invito a celebrar
              </p>
              <p className="text-xl font-bold uppercase tracking-[0.18em] text-[#C98A1A] md:text-3xl">
                mi primera comunión
              </p>
            </div>

            <div className="space-y-2 text-lg text-[#66705E] md:text-xl">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-[#C98A1A]" />
                <span>30 de mayo de 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#C98A1A]" />
                <span>12:00</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <PremiumButton
                asChild
                size="lg"
                className="bg-[#6F7E63] text-white shadow-lg hover:bg-[#627156]"
              >
                <a href={RSVP_URL} target="_blank" rel="noreferrer">
                  Confirmar asistencia <MessageCircle className="ml-2 h-4 w-4" />
                </a>
              </PremiumButton>
              <PremiumButton
                asChild
                size="lg"
                variant="outline"
                className="border-[#D7DDCF] bg-white/80 text-[#4C5446] hover:bg-white"
              >
                <a href={addToCalendarUrl()} target="_blank" rel="noreferrer">
                  Añadir al calendario <CalendarDays className="ml-2 h-4 w-4" />
                </a>
              </PremiumButton>
              <PremiumButton
                asChild
                size="lg"
                variant="outline"
                className="border-[#E8D3A9] bg-[#FFF9EF] text-[#C98A1A] hover:bg-white"
              >
                <a href="#itinerario">
                  Ver itinerario <Sparkles className="ml-2 h-4 w-4" />
                </a>
              </PremiumButton>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative aspect-[4/5] w-full max-w-[480px]">
              <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_top_left,rgba(220,230,219,0.9),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(234,203,142,0.35),transparent_38%),linear-gradient(180deg,#ffffff,#f5f3ee)] shadow-[0_30px_80px_rgba(111,126,99,0.15)]" />
              <div className="absolute inset-[18px] rounded-[30px] border border-white/70 bg-white/55 p-5 backdrop-blur-md md:p-6">
                <div className="flex h-full flex-col rounded-[26px] border border-[#E3E7DF] bg-[#F9F8F4] p-4">
                  <div className="mx-auto mb-6 mt-1 aspect-square w-[82%] overflow-hidden rounded-full border-[10px] border-[#E6EDE4] shadow-lg">
                    <img
                      src={PHOTO_URL}
                      alt="Carla"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-auto space-y-2 pb-2 text-center">
                    <p
                      className="text-6xl text-[#6F7E63] md:text-7xl"
                      style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                      Carla
                    </p>
                    <p className="text-lg font-semibold text-[#C98A1A]">
                      30 de mayo de 2026 | 12:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <main className="relative mx-auto max-w-6xl space-y-24 px-6 pb-20 md:px-10">
        <motion.section
          id="cuenta-atras"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24 space-y-8"
        >
          <SectionTitle
            icon={Clock}
            eyebrow="Cuenta atrás"
            title="Ya falta muy poquito"
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              [countdown.days, "días"],
              [countdown.hours, "horas"],
              [countdown.minutes, "minutos"],
              [countdown.seconds, "segundos"],
            ].map(([value, label]) => (
              <Card
                key={label as string}
                className="rounded-3xl border-[#E5E9E2] bg-white/80 shadow-[0_10px_30px_rgba(111,126,99,0.08)]"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-[#C98A1A] md:text-5xl">
                    {typeof value === "number" ? String(value).padStart(2, "0") : value}
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.2em] text-[#6F7E63]">
                    {label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="itinerario"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24 space-y-8"
        >
          <SectionTitle
            icon={Church}
            eyebrow="Información del día"
            title="Todo lo que necesitas saber"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <DetailCard
              icon={Church}
              title="Ceremonia"
              actionLabel="Ver ubicación"
              href={MAP_CHURCH_URL}
            >
              <p className="font-semibold text-[#4C5446]">
                Parroquia San Gabriel Arcángel - La Poveda
              </p>
              <p className="mt-2">30 de mayo de 2026 a las 12:00.</p>
              <p className="mt-2">
                Os recomendamos llegar con unos minutos de antelación para estar
                todos tranquilos antes del comienzo.
              </p>
            </DetailCard>

            <DetailCard
              icon={PartyPopper}
              title="Celebración"
              actionLabel="Cómo llegar"
              href={MAP_CELEBRATION_URL}
            >
              <p className="font-semibold text-[#4C5446]">
                Complejo La Cigüeña · Arganda del Rey
              </p>
              <p className="mt-2">
                Después de la ceremonia continuaremos celebrándolo juntos allí.
              </p>
              <p className="mt-2">
                Habrá comida, tiempo en familia y muchas ganas de compartir este
                día tan especial.
              </p>
            </DetailCard>
          </div>

          <TimelineSection />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <SectionTitle
            icon={Sparkles}
            eyebrow="Información adicional"
            title="Pequeños detalles que ayudan mucho"
          />

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <DetailCard
              icon={MessageCircle}
              title="Confirmación"
              actionLabel="Confirmar por WhatsApp"
              href={RSVP_URL}
            >
              <p>
                Nos ayudará mucho que confirméis vuestra asistencia con
                antelación para organizar todo con cariño.
              </p>
              <p className="mt-2">
                Pulsa el botón y solo tendrás que indicar cuántas personas sois.
              </p>
            </DetailCard>

            <Card className="rounded-3xl border-[#E5E9E2] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,245,241,0.98))] shadow-[0_14px_36px_rgba(111,126,99,0.08)]">
              <CardContent className="flex h-full flex-col justify-center p-6 md:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C98A1A]">
                  Contacto
                </p>
                <p
                  className="mt-3 text-2xl text-[#4C5446]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  María y Guille
                </p>
                <p className="mt-2 text-[#66705E]">
                  Para confirmar asistencia o resolver cualquier detalle del día.
                </p>
                <PremiumButton
                  asChild
                  className="mt-5 bg-[#6F7E63] text-white hover:bg-[#627156]"
                >
                  <a href={RSVP_URL} target="_blank" rel="noreferrer">
                    Contactar por WhatsApp <MessageCircle className="ml-2 h-4 w-4" />
                  </a>
                </PremiumButton>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <footer className="space-y-4 py-12 text-center">
          <p className="text-lg italic text-[#6F7E63] md:text-xl">
            Con cariño
          </p>
          <p
            className="text-3xl text-[#6F7E63] md:text-4xl"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Carla y familia
          </p>
        </footer>
      </main>
    </motion.div>
  );
}