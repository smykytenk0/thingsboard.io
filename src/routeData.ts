import type { APIContext } from 'astro';
import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';
import { tutorialPages as pages } from '~/content';
import { getVersionFromSlug, type ProductVersion } from '~/util/path-utils';
import { getOgImageUrl } from '~/util/getOgImageUrl';
import { getTutorialPages } from '~/util/getTutorialPages';

export const onRequest = defineRouteMiddleware((context) => {
	updateHead(context);
	filterSidebarByVersion(context.locals.starlightRoute);
	updateTutorialPagination(context.locals.starlightRoute);
});

/**
 * Filter sidebar entries to only show items for the current product version.
 */
function filterSidebarByVersion(starlightRoute: StarlightRouteData) {
	const version = getVersionFromSlug(starlightRoute.id);

	starlightRoute.sidebar = starlightRoute.sidebar.filter((entry) =>
		sidebarEntryMatchesVersion(entry, version)
	);
}

function sidebarEntryMatchesVersion(
	entry: StarlightRouteData['sidebar'][number],
	version: ProductVersion
): boolean {
	if (entry.type === 'link') {
		return linkMatchesVersion(entry.href, version);
	}
	if (entry.type === 'group') {
		entry.entries = entry.entries.filter((child) =>
			sidebarEntryMatchesVersion(child, version)
		);
		return entry.entries.length > 0;
	}
	return true;
}

function linkMatchesVersion(href: string, version: ProductVersion): boolean {
	const path = href.replace(/^\/docs\/?/, '');
	if (version === 'pe') return path.startsWith('pe/');
	if (version === 'paas') return path.startsWith('paas/');
	return !path.startsWith('pe/') && !path.startsWith('paas/');
}

function updateHead(context: APIContext) {
	const { head, entry } = context.locals.starlightRoute;

	const title = head.find((item) => item.tag === 'title');
	const frontmatterTitle = entry.data.head.find((item) => item.tag === 'title');

	if (isTutorialEntry(entry) && title && !frontmatterTitle) {
		title.content = context.locals.t('tutorial.title.prefix', {
			title: title.content,
		});
	}

	const ogImageUrl = getOgImageUrl(context.url.pathname, false);
	const imageSrc = ogImageUrl ?? '/default-og-image.png';
	const canonicalImageSrc = new URL(imageSrc, context.site);
	const is404 = context.url.pathname.endsWith('/404/');

	head.push({ tag: 'meta', attrs: { property: 'og:image', content: canonicalImageSrc.href } });
	head.push({ tag: 'meta', attrs: { name: 'twitter:image', content: canonicalImageSrc.href } });
	head.push({ tag: 'meta', attrs: { name: 'twitter:site', content: 'astrodotbuild' } });

	head.push({
		tag: 'script',
		attrs: {
			src: 'https://cdn.usefathom.com/script.js',
			'data-site': 'EZBHTSIG',
			'data-canonical': is404 ? 'false' : 'true',
			defer: true,
		},
	});
}

function updateTutorialPagination(starlightRoute: StarlightRouteData) {
	const { entry, pagination } = starlightRoute;

	if (!isTutorialEntry(entry)) return;

	const tutorialPages = getTutorialPages(pages);
	const i = tutorialPages.findIndex((p) => p.id === entry.id);

	if (tutorialPages[i - 1]) {
		const prevPage = tutorialPages[i - 1];
		pagination.prev = {
			href: `/docs/${prevPage.id}/`,
			isCurrent: false,
			label: prevPage.data.title,
			type: 'link',
			badge: undefined,
			attrs: {},
		};
	}

	if (tutorialPages[i + 1]) {
		const nextPage = tutorialPages[i + 1];
		pagination.next = {
			href: `/docs/${nextPage.id}/`,
			isCurrent: false,
			label: nextPage.data.title,
			type: 'link',
			badge: undefined,
			attrs: {},
		};
	}
}

function isTutorialEntry(entry: StarlightRouteData['entry']) {
	return entry.id.startsWith('tutorial/');
}
