import type { Config } from "tailwindcss";
import daisyui from "daisyui";


const config: Config = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: '#A594F9',
        purpleSecondary: '#CDC1FF',
        purpleHover: '#bca2ea',
        purpleNeutral: '#7c759c',
        purpleDrawer:'#605a7a'
      },
    },
    fontFamily: {
      'alex': ["Alex Brush", 'cursive'],
      'alegreya': ['Alegreya', 'serif'],
      'alegreyaSans': ['"Alegreya Sans"', 'sans-serif'],
    },
    
  },
  plugins: [
    daisyui, require('tailwindcss-motion')
  ],
  daisyui: {
    themes: ["light", "dark", "valentine"],
  },
};
export default config;

