module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],  // TODO: enable in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      'lg': '0 4px 6px -2px rgba(0, 0, 0, 1)',
    },
    fontFamily: {
      sans: ["Barlow", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1.3rem",
        sm: "2rem",
        lg: "4rem",
        xl: "8rem",
        "2xl": "3rem",
      },
    },
    extend: {
      backgroundImage: {
        // "hero": "url('/hero.png')",
      },
      colors: {
        primary: {
          lightest: "#0087DE",
          light: "#1F3869",
          DEFAULT: "#001C54",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
        },
      },
      ringWidth: {
        '16': '16px',
      },
      width: {
        "1/16": "6.25%",
        "2/16": "12.5%",
        "3/16": "18.75%",
        "4/16": "25%",
      },
      inset: {
        "1/5": "20%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
