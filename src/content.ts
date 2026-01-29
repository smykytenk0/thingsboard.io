import { getCollection } from 'astro:content';
import { isRecipeEntry, isTutorialEntry } from './content.config';

export const allPages = await getCollection('docs');
export const tutorialPages = allPages.filter(isTutorialEntry);
export const recipePages = allPages.filter(isRecipeEntry);
export const englishPages = allPages; // All pages are English now
