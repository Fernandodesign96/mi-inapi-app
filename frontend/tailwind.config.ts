import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Paleta institucional */
        primary: {
          DEFAULT: "#1A56DB",
          dark: "#1E3A8A",
          light: "#DBEAFE",
        },
        accent: {
          DEFAULT: "#7C3AED",
          light: "#EDE9FE",
        },
        /* Sistema Semáforo INAPI */
        danger: {
          DEFAULT: "#DC2626",
          bg: "#FEE2E2",
        },
        warning: {
          DEFAULT: "#D97706",
          bg: "#FEF3C7",
        },
        info: {
          DEFAULT: "#2563EB",
          bg: "#DBEAFE",
        },
        success: {
          DEFAULT: "#059669",
          bg: "#D1FAE5",
        },
        /* Neutros UI */
        surface: "#FFFFFF",
        "surface-elevated": "#F3F4F6",
        border: "#E5E7EB",
        "border-strong": "#D1D5DB",
        muted: "#9CA3AF",
        "muted-secondary": "#4B5563",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["DM Mono", "Courier New", "monospace"],
      },
      fontSize: {
        display: ["28px", { lineHeight: "36px", fontWeight: "800" }],
        h1: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h3: ["17px", { lineHeight: "24px", fontWeight: "600" }],
        h4: ["15px", { lineHeight: "22px", fontWeight: "500" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "body-xs": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        btn: ["15px", { lineHeight: "20px", fontWeight: "600" }],
        label: [
          "11px",
          { lineHeight: "16px", fontWeight: "600", letterSpacing: "0.05em" },
        ],
        timestamp: ["11px", { lineHeight: "16px", fontWeight: "400" }],
        mono: ["13px", { lineHeight: "20px", fontWeight: "500" }],
        "mono-lg": ["15px", { lineHeight: "22px", fontWeight: "500" }],
      },
      spacing: {
        topbar: "56px",
        bottomnav: "64px",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        elevated: "0 4px 12px rgba(0,0,0,0.10)",
        modal: "0 8px 24px rgba(0,0,0,0.15)",
        frame: "0 8px 32px rgba(0,0,0,0.15)",
        fab: "0 4px 16px rgba(124,58,237,0.35)",
      },
      maxWidth: {
        app: "390px",
      },
      height: {
        topbar: "56px",
        bottomnav: "64px",
      },
    },
  },
  plugins: [],
};

export default config;
