const Layout1Settings = {
  leftSidebar: {
    show: true,
    mode: 'compact', // full, close, compact, mobile,
    theme: 'blue', // View all valid theme colors inside MatxTheme/themeColors.js
    bgOpacity: .96, // 0 ~ 1
    bgImgURL: `${process.env.PUBLIC_URL+"/assets/images/sidebar/sidebar-bg-light.jpg"}`
  },
  topbar: {
    show: true,
    fixed: true,
    theme: 'blue' // View all valid theme colors inside MatxTheme/themeColors.js
  },
  activeButton: {
    theme: 'blue'
  }
}

export default Layout1Settings;
