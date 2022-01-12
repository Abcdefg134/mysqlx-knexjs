//const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens:{
      'ms':[
        {
          'min':'320px',
          'max':'767px'
        }
      ],
      'max1100':[
        {
          'min':'1010px',
          'max':'1200px'
        }
      ],
      'screen1280':[
        {
          'min':"1024px",
          'max':'1440px'
        }
      ],
      'pagination':[
        {
          'min':'414px',
          'max':'768px'
        }
      ],
      'scrollX-Y':[
        {
          'max':"1010px"
        }
      ],
      'sms':[
        {
          'max':'321px'
        }
      ],
      'smaller425':[{
        'max':'426px'
      }],
      'ml':[
        {
          'min':'768px',
          'max':'1040px'
        }
      ],
      'grid-screen':[
        {
          'min':'768px',
          'max':'1024px'
        }
      ],
      'fullHD':[
        {
          'max':'1920px'
        }
      ]
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}