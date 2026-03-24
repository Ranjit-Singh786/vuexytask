import { defineThemeConfig } from '@core'
import { Skins } from '@core/enums'
import { breakpointsVuetifyV3 } from '@vueuse/core'
import { h } from 'vue'

// ❗ Logo SVG must be imported with ?raw suffix
import logo from '@images/Isolation_Mode.svg?raw'
import panelRightClose from '@images/svg/panel-right-close.svg?raw'
import { AppContentLayoutNav, ContentWidth, FooterType, NavbarType } from '@layouts/enums'

import { VIcon } from 'vuetify/components/VIcon'

// Smart component to dynamically render either a raw SVG or a standard Vuetify VIcon
const smartIconRenderer = {
  name: 'SmartIconRenderer',
  inheritAttrs: false,
  props: ['icon', 'svg', 'size'],
  render() {
    if (this.svg) {
      // Manually force standard sizing and cancel pointer events for click capturing
      const svgCode = this.svg.replace('<svg ', `<svg style="pointer-events: none;" width="${this.size || 20}" height="${this.size || 20}" `)
      return h('div', { 
        innerHTML: svgCode, 
        style: 'line-height: 0; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;', 
        ...this.$attrs 
      })
    }
    return h(VIcon, { icon: this.icon, size: this.size, ...this.$attrs })
  }
}
export const { themeConfig, layoutConfig } = defineThemeConfig({
  app: {
    title: 'Frontend Task',
    logo: h('div', { innerHTML: logo, style: 'line-height:0; color: rgb(var(--v-global-theme-primary))' }),
    contentWidth: ContentWidth.Boxed,
    contentLayoutNav: AppContentLayoutNav.Vertical,
    overlayNavFromBreakpoint: breakpointsVuetifyV3.lg - 1, // 1 for matching with vuetify breakpoint. Docs: https://next.vuetifyjs.com/en/features/display-and-platform/
    i18n: {
      enable: true,
      defaultLocale: 'en',
      langConfig: [
        {
          label: 'English',
          i18nLang: 'en',
          isRTL: false,
        },
        {
          label: 'French',
          i18nLang: 'fr',
          isRTL: false,
        },
        {
          label: 'Arabic',
          i18nLang: 'ar',
          isRTL: true,
        },
      ],
    },
    theme: 'system',
    skin: Skins.Default,
    // Smart icon renderer supports SVGs and native icons dynamically!
    iconRenderer: smartIconRenderer,
  },
  navbar: {
    type: NavbarType.Sticky,
    navbarBlur: true,
  },
  footer: { type: FooterType.Static },
  verticalNav: {
    isVerticalNavCollapsed: false,
    defaultNavItemIconProps: { icon: 'tabler-circle' },
    isVerticalNavSemiDark: false,
  },
  horizontalNav: {
    type: 'sticky',
    transition: 'slide-y-reverse-transition',
    popoverOffset: 6,
  },

  /*
    // ℹ️  In below Icons section, you can specify icon for each component. Also you can use other props of v-icon component like `color` and `size` for each icon.
    // Such as: chevronDown: { icon: 'tabler-chevron-down', color:'primary', size: '24' },
    */
  icons: {
    chevronDown: { icon: 'tabler-chevron-down' }, 
    chevronRight: { icon: 'tabler-chevron-right', size: 20 },
    close: { svg: panelRightClose, size: 20 },
    verticalNavPinned: { svg: panelRightClose, size: 20 },
    verticalNavUnPinned: { svg: panelRightClose, size: 20 },
    sectionTitlePlaceholder: { icon: 'tabler-minus' },
  },
})
