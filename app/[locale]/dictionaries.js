import 'server-only'
 
const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  zh: () => import('./es.json').then((module) => module.default),
}
 
export  default const getDictionary = async (locale) => dictionaries[locale]();