import { getRequestConfig } from "next-intl/server";
import { defaultLocale as fallbackLocale } from "../next-intl.config";

export default getRequestConfig(async ({ locale }) => {
    const resolvedLocale = (locale ?? fallbackLocale) as string;
    return {
        locale: resolvedLocale,
        messages: (await import(`../messages/${resolvedLocale}.json`)).default,
    };
});
