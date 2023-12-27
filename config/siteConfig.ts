import { defaultConfig } from "@portaljs/core";
import userConfig from "@/content/config.mjs";

// TODO types
const siteConfig: any = {
  ...defaultConfig,
  ...userConfig,
  // prevent theme object overrides for
  // values not provided in userConfig
  theme: {
    ...defaultConfig.theme,
    ...userConfig?.theme,
  },
  profileIcon: '/_ig/profile.svg',
  loginIcon: '/_ig/login.svg',
};

export default siteConfig;
