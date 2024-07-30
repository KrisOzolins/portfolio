import en from './i18n/en.json';
import lv from './i18n/lv.json';

type Messages = typeof en & typeof lv;
declare interface IntlMessages extends Messages {}

// declare global {
//   // Use type safe message keys with `next-intl`.
//   interface IntlMessages extends Messages {}
// }
