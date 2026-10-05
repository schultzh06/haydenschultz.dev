import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_PROJECT_GLYPH, GLOBAL_POST_GLYPH, PROJECT_GLYPHS } from '../consts';

// Dates in frontmatter are parsed as UTC midnight; format in UTC so they don't shift a day in US timezones
export const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

// Non-draft posts, newest first. Pass a project id to only include that project's posts.
export async function getRecentPosts({ project, limit }: { project?: string; limit?: number } = {}) {
    const posts = await getCollection(
        'posts',
        ({ data }) => !data.draft && (!project || data.project?.id === project)
    );
    posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
    return limit ? posts.slice(0, limit) : posts;
}

export const projectGlyph = (projectId: string) => PROJECT_GLYPHS[projectId] ?? DEFAULT_PROJECT_GLYPH;

export const postGlyph = (post: CollectionEntry<'posts'>) =>
    post.data.project ? projectGlyph(post.data.project.id) : GLOBAL_POST_GLYPH;
