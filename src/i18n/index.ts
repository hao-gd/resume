import { getLanguage } from '@/i18n';
import type { Locale } from './types';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

const LocaleMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

/**
 * register a locale
 * @param locale
 * @param localeObj
 */
export function registerLocale(locale: string, localeObj: Locale): void {
  LocaleMap[locale] = localeObj;
}

export function getLocale(locale: string): Record<string, string> {
  return LocaleMap[locale];
}

import { createIntl, createIntlCache } from 'react-intl';

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

const currentLocale = getLanguage();
export const intl = createIntl(
  {
    locale: currentLocale,
    messages: LocaleMap[currentLocale] || zhCN,
  },
  cache
);

export { getLanguage } from './language';
