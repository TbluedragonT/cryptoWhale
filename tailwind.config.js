module.exports = {
  // purge: ["./src/**/*.{js,jsx,ts,tsx}"],  // TODO: enable in production
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
      colors: {
        primary: {
          light: "#FFFFFF",
          DEFAULT: "#8EF6FC",
          dark: "#8ADCE1",
          darker: "#3caa6e",
          darkest: "#217a49",
        },
        secondary: {
          DEFAULT: "#000000",
        },
        yellow: {
          DEFAULT: "#FEDA55",
          whelps: "#FEDA55"
        }
      },
      ringWidth: {
        '16': '16px',
      },
      translate: {
        '-6/7': '-85.7142857%',
        '6/7': '85.7142857%',
        '14/15': '93.33333333%',
        '-14/15': '-93.33333333%',
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      gridColumnStart: {
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
      },
      gridTemplateRows: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      gridRowStart: {
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
      },
      rotate: {
        '-8': '-8deg',
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
