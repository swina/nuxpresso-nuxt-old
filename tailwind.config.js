/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    fontFamily: {
      display: ['Work Sans', 'sans-serif'],
      body: ['Work Sans', 'sans-serif'],
    },
    maxWidth: {
          '1/4': '25%',
           '1/2': '50%',
           '3/4': '75%',
    },
    gridTemplateColumns: {
      'header-classic' : '30% auto',
      'header-classic-reverse' : 'auto 30%',
      'header-3' : 'repeat(3,33%)',
      'header-4' : 'repeat(4,25%)',
      // Simple 16 column grid
      '16': 'repeat(16, minmax(0, 1fr))',
      '2' : '50% auto',
      '3' : 'repeat(3,33%)',
      'footer-4' : 'repeat(4,25%)',
      'footer-3' : 'repeat(3,33%)',
      'footer-2' : 'repeat(2,50%)',
      // Complex site-specific column configuration
      'footer': '200px minmax(900px, 1fr) 100px',
    },
    borderRadius :{ 
      'none': '0',
      'sm': '0.125rem',
      default: '0.25rem',
      default: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'xl': '4rem',
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      whitelistPatterns: [/^bg/,/^text/,/^border/,/^hover/,/^m/,/^p/,/^flex/,/^order/]
    },
    variants: {
      borderColor : [ 'responsive' , 'hover' , 'focus' ]
    }
  }
}
