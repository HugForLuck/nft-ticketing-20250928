export type CookiesType = 'functional' | 'comfort';

export interface ICookiesConsent extends Record<CookiesType, boolean> {}
export interface ICookiesState extends ICookiesConsent {}
