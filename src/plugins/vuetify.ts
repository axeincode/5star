/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
  theme: {
    themes: {      
      light: {        
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          // color_29253c: "#1D2027",
          // box_shadow: "0px 3px 4px 1px rgba(255, 255, 255, 1)",
          // color_000000: "#000000"
        },
      },
    },
  },
})
