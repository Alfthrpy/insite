import type { Config } from "tailwindcss";
import daisyui from "daisyui";


const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			purple: '#A594F9',
  			purpleSecondary: '#CDC1FF',
  			purpleHover: '#bca2ea',
  			purpleNeutral: '#7c759c',
  			purpleDrawer: '#605a7a',
  			lightGrey: '#EDEEED',
  			pink: '#E38F9C'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	fontFamily: {
  		alex: ["Alex Brush", 'cursive'],
  		alegreya: ['Alegreya', 'serif'],
  		alegreyaSans: ['Alegreya Sans"', 'sans-serif'],
  		lora: ["Lora", "serif"],
  		alice: ["Alice", "serif"],
  		lemon: ["Lemon Melon", "sans-serif"],
  		vazirmatn: ["Vazirmatn", "sans-serif"],
  		work: ["Work Sans", "sans-serif"],
  		gloria: ["Gloria Hallelujah", "cursive"]
  	}
  },
  plugins: [
    daisyui, require('tailwindcss-motion'), require("tailwindcss-animate")],
  daisyui: {
    themes: ["light", "dark", "valentine"],
  },
};
export default config;

