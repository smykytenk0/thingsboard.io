export const locales = {
	en: { prefix: '', title: 'Device Library' },
	uk: { prefix: 'uk', title: 'Бібліотека пристроїв' },
} as const;

export type Lang = keyof typeof locales;
