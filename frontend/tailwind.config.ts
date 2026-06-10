import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "600px",
        md: "905px",
        lg: "1240px",
        xl: "1440px",
      },
      colors: {
        primary: {
          DEFAULT: "#4282E0",
          dark: "#0F69C4",
          light: "#BFEEFF",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FF4731",
          light: "#FFECEF",
          foreground: "#FFFFFF",
        },
        danger: {
          DEFAULT: "#FB3B3B",
          bg: "#FFEBEF",
        },
        warning: {
          DEFAULT: "#FF5722",
          bg: "#FBE9E7",
        },
        info: {
          DEFAULT: "#2196F3",
          bg: "#E3F2FD",
        },
        success: {
          DEFAULT: "#4CAF50",
          bg: "#E8F5E9",
        },
        claveunica: {
          DEFAULT: "var(--claveunica-bg)",
          hover: "var(--claveunica-bg-hover)",
          focus: "var(--claveunica-bg-focus)",
          disabled: "var(--claveunica-bg-disabled)",
          border: "var(--claveunica-border-active)",
          foreground: "var(--claveunica-fg)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--foreground-muted)",
          secondary: "var(--foreground-secondary)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        focus: "var(--ring)",
        link: {
          DEFAULT: "#1D70B8",
          visited: "#4C2C92",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "system-ui", "sans-serif"],
        slab: ["var(--font-roboto-slab)", "Roboto Slab", "Georgia", "serif"],
      },
      fontSize: {
        display: ["28px", { lineHeight: "1.5", fontWeight: "400" }],
        h1: ["24px", { lineHeight: "1.5", fontWeight: "500" }],
        h2: ["18px", { lineHeight: "1.5", fontWeight: "500" }],
        h3: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        h4: ["15px", { lineHeight: "1.5", fontWeight: "500" }],
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-xs": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        btn: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        label: [
          "12px",
          { lineHeight: "1.5", fontWeight: "700", letterSpacing: "0.05em" },
        ],
        timestamp: ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        mono: ["13px", { lineHeight: "1.5", fontWeight: "500" }],
        "mono-lg": ["15px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        9: "36px",
        8: "48px",
        10: "64px",
        topbar: "56px",
        bottomnav: "64px",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "var(--elevation-01)",
        elevated: "var(--elevation-02)",
        modal: "var(--elevation-04)",
        frame: "var(--elevation-05)",
        fab: "var(--shadow-fab)",
        "elevation-01": "var(--elevation-01)",
        "elevation-02": "var(--elevation-02)",
        "elevation-03": "var(--elevation-03)",
        "elevation-04": "var(--elevation-04)",
        "elevation-05": "var(--elevation-05)",
      },
      maxWidth: {
        "gob-md": "840px",
        "gob-xl": "1040px",
      },
      height: {
        topbar: "56px",
        bottomnav: "64px",
      },
      transitionDuration: {
        micro: "100ms",
        fast: "150ms",
        normal: "200ms",
        moderate: "250ms",
        slow: "300ms",
        slower: "350ms",
      },
    },
  },
  plugins: [],
};

export default config;