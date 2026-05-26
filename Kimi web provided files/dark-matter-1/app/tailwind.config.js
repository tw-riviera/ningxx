/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Dark Matter design tokens */
        "dm-black": "#1A1A1A",
        "dm-white": "#F0F0F0",
        "dm-indigo": "#273db0",
        "dm-silver": "#C5CBD3",
        "dm-deep-void": "#0D0D12",
        "dm-cosmic-blue": "#1a1a3e",
        "dm-star-warm": "#E8DCC8",
        "dm-star-cool": "#B8C4E0",
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '2rem',
        'lg': '4rem',
        'xl': '8rem',
        '2xl': '12rem',
        '3xl': '16rem',
      },
      maxWidth: {
        'container': '1400px',
        'content': '1200px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-10px) translateX(5px)" },
          "50%": { transform: "translateY(-5px) translateX(-5px)" },
          "75%": { transform: "translateY(-15px) translateX(3px)" },
        },
        "pulse-glow": {
          "0%, 100%": { filter: "brightness(1.0)" },
          "50%": { filter: "brightness(1.1)" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 25s linear infinite",
        "float": "float 15s ease-in-out infinite",
        "float-slow": "float 20s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "orbit": "orbit var(--orbit-duration) linear infinite",
        "slide-up": "slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
