import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { groq } from 'next-sanity';

const URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsQuery = groq`*[_type == "post"]{ "slug": slug.current, "updatedAt": _updatedAt }`;
  const posts = await client.fetch<{ slug: string; updatedAt: string }[]>(postsQuery);

  const postUrls = posts.map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));

  const staticPages = [
    { url: `${URL}/`, lastModified: new Date() },
    { url: `${URL}/about`, lastModified: new Date() },
    { url: `${URL}/blog`, lastModified: new Date() },
    { url: `${URL}/contact`, lastModified: new Date() },
    { url: `${URL}/cookies`, lastModified: new Date() },
    { url: `${URL}/privacy`, lastModified: new Date() },
    { url: `${URL}/reviews`, lastModified: new Date() },
    { url: `${URL}/services`, lastModified: new Date() },
    { url: `${URL}/services/deep`, lastModified: new Date() },
    { url: `${URL}/services/domestic`, lastModified: new Date() },
    { url: `${URL}/services/luxury`, lastModified: new Date() },
    { url: `${URL}/services/maintenance`, lastModified: new Date() },
    { url: `${URL}/services/office`, lastModified: new Date() },
    { url: `${URL}/services/post-renovation`, lastModified: new Date() },
    { url: `${URL}/terms`, lastModified: new Date() },
  ];

  return [...staticPages, ...postUrls];
}