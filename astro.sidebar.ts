import type { StarlightUserConfig } from '@astrojs/starlight/types';

type SidebarConfig = NonNullable<StarlightUserConfig['sidebar']>;

/** OpenSource documentation sidebar (pages at /docs/) */
export const opensourceSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		items: [
			'getting-started',
			{
				label: 'Welcome',
				items: [
					'concepts/why-astro',
					'concepts/islands',
					'tutorial/0-introduction',
					'astro-courses',
				],
			},
			{
				label: 'New Project',
				items: ['install-and-setup', 'basics/project-structure', 'develop-and-build'],
			},
			{
				label: 'Configuration',
				items: [
					'guides/configuring-astro',
					'editor-setup',
					'guides/typescript',
					'guides/environment-variables',
					'guides/build-with-ai',
					'guides/dev-toolbar',
				],
			},
		],
	},
	{
		label: 'Guides',
		items: [
			{
				label: 'Routing',
				items: [
					'basics/astro-pages',
					'guides/routing',
					'guides/endpoints',
					'guides/middleware',
					'guides/internationalization',
					'guides/prefetch',
					'guides/view-transitions',
				],
			},
			{
				label: 'UI',
				items: [
					'basics/astro-components',
					'basics/layouts',
					'guides/styling',
					'guides/fonts',
					'guides/syntax-highlighting',
					'guides/client-side-scripts',
					'guides/framework-components',
				],
			},
			{
				label: 'Content',
				items: [
					'guides/markdown-content',
					'guides/content-collections',
					'guides/images',
					'guides/data-fetching',
					'guides/astro-db',
				],
			},
			'guides/troubleshooting',
			'contribute',
		],
	},
	{
		label: 'Reference',
		items: [
			'reference/configuration-reference',
			'reference/cli-reference',
			'reference/api-reference',
			'reference/error-reference',
		],
	},
];

/** Professional Edition documentation sidebar (pages at /docs/pe/) */
export const peSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		items: ['pe/getting-started'],
	},
	{
		label: 'PE Features',
		autogenerate: { directory: 'pe/guides' },
	},
];

/** Cloud (PaaS) documentation sidebar (pages at /docs/paas/) */
export const paasSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		items: ['paas/getting-started'],
	},
	{
		label: 'Cloud Features',
		autogenerate: { directory: 'paas/guides' },
	},
];

/**
 * Combined sidebar configuration.
 * Route middleware in routeData.ts filters this to show only
 * the relevant version's sidebar items.
 */
export const sidebar: SidebarConfig = [
	...opensourceSidebar,
	...peSidebar,
	...paasSidebar,
];
