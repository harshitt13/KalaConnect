/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css,scss,sass,less,styl}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced Peach color palette
        peach: {
          50: "#fff7f0",
          100: "#ffead7",
          200: "#ffd3ad",
          300: "#ffb380",
          400: "#ff8c4d",
          500: "#ff6b35",
          600: "#e55a2b",
          700: "#cc4a24",
          800: "#a53d20",
          900: "#8b341d",
        },
        coral: {
          50: "#fff7f5",
          100: "#ffeae6",
          200: "#ffd5cc",
          300: "#ffb3a3",
          400: "#ff8a75",
          500: "#ff6b5a",
          600: "#e55a4d",
          700: "#cc4a40",
          800: "#a53d35",
          900: "#8b342d",
        },
        cream: {
          50: "#fefefe",
          100: "#fdfcfb",
          200: "#fbf8f5",
          300: "#f8f2eb",
          400: "#f3eadb",
          500: "#ede1cb",
          600: "#d6c7a8",
          700: "#b8a889",
          800: "#9a8b6d",
          900: "#82775a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-subtle": "bounceSubtle 2s infinite",
        "pulse-peach": "pulsePeach 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulsePeach: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(255, 107, 53, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 107, 53, 0.8)" },
        },
      },
      backgroundImage: {
        "gradient-peach": "linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff8c4d 100%)",
        "gradient-coral": "linear-gradient(135deg, #ff6b5a 0%, #ff8a75 50%, #ffb3a3 100%)",
        "gradient-sunset": "linear-gradient(135deg, #ff6b35 0%, #ff8c4d 25%, #ffb380 50%, #ffd3ad 75%, #ffead7 100%)",
        "gradient-warm": "linear-gradient(135deg, #fef7f0 0%, #ffead7 25%, #ffd3ad 50%, #ffb380 75%, #ff6b35 100%)",
      },
    },
  },
  plugins: [],
};
