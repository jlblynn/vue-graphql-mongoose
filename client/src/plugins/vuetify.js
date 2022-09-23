import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: "#80D8FF",
    secondary: "#E0E0E0",
    accent: "#1DE9B6",
    error: "#E65100",
    warning: "#FFD54F",
    info: "#7C4DFF",
    success: "#00C853"
  }
})
