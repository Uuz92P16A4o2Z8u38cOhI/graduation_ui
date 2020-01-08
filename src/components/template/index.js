import headerBar from './header-bar'
import footerBar from "./footer-bar"
import asideBar from "./aside-bar"


const Template = {
  install (Vue) {
    Vue.component('header-bar', headerBar);
    Vue.component('footer-bar', footerBar);
    Vue.component("aside-bar", asideBar);
  }
};
export default Template


