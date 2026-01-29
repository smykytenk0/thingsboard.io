// Product version system
export type ProductVersion = 'opensource' | 'pe' | 'paas';

/** Product version configuration */
export const productVersions: Record<ProductVersion, { label: string; prefix: string }> = {
	opensource: { label: 'OpenSource', prefix: '' },
	pe: { label: 'Professional', prefix: 'pe/' },
	paas: { label: 'Cloud', prefix: 'paas/' },
};

/** Detect product version from a URL pathname (after /docs/ base). */
export function getVersionFromURL(pathname: string): ProductVersion {
	// Remove /docs/ base prefix if present
	const path = pathname.replace(/^\/docs\/?/, '');
	if (path.startsWith('pe/')) return 'pe';
	if (path.startsWith('paas/')) return 'paas';
	return 'opensource';
}

/** Detect product version from a content entry slug. */
export function getVersionFromSlug(slug: string): ProductVersion {
	if (slug.startsWith('pe/')) return 'pe';
	if (slug.startsWith('paas/')) return 'paas';
	return 'opensource';
}

/** Get the URL prefix for a product version. */
export function getVersionPrefix(version: ProductVersion): string {
	return productVersions[version].prefix;
}

/** Get the base/landing URL for a product version. */
export function getVersionBaseURL(version: ProductVersion): string {
	const prefix = getVersionPrefix(version);
	return `/docs/${prefix}getting-started/`;
}

/**
 * Get the page slug (without version prefix) from a URL pathname.
 * E.g. '/docs/pe/guides/routing/' => 'guides/routing'
 */
export function getPageSlugFromURL(pathname: string): string {
	let path = pathname.replace(/^\/docs\/?/, '');
	if (path.startsWith('pe/')) path = path.slice(3);
	else if (path.startsWith('paas/')) path = path.slice(5);
	return path.replace(/^\/|\/$/g, '');
}

/**
 * Switch the current path to a different product version.
 * E.g. switchVersion('/docs/getting-started/', 'pe') => '/docs/pe/getting-started/'
 */
export function switchVersion(pathname: string, targetVersion: ProductVersion): string {
	// Remove /docs/ base
	let path = pathname.replace(/^\/docs\/?/, '');

	// Remove current version prefix
	if (path.startsWith('pe/')) path = path.slice(3);
	else if (path.startsWith('paas/')) path = path.slice(5);

	// Add target version prefix
	const prefix = getVersionPrefix(targetVersion);
	return `/docs/${prefix}${path || ''}`;
}

/**
 * Build version switch URL, falling back to the version's base page
 * if the equivalent page doesn't exist in the target version.
 * @param pathname - current URL pathname
 * @param targetVersion - version to switch to
 * @param existingPageIds - set of all existing content page IDs (slugs)
 */
export function switchVersionWithFallback(
	pathname: string,
	targetVersion: ProductVersion,
	existingPageIds: Set<string>
): string {
	const pageSlug = getPageSlugFromURL(pathname);
	const targetPrefix = getVersionPrefix(targetVersion);

	// Build the target content ID
	const targetId = targetPrefix ? `${targetPrefix}${pageSlug}` : pageSlug;

	if (existingPageIds.has(targetId)) {
		return `/docs/${targetPrefix}${pageSlug}/`;
	}

	// Fallback to the base page of the target version
	return getVersionBaseURL(targetVersion);
}
