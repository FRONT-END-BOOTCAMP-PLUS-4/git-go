export const locales = ["ko", "en"] as const;
export const defaultLocale = "ko" as const;

const config = {
    locales: [...locales],
    defaultLocale,
};

export default config;
