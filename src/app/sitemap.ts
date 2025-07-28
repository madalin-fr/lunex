import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { client } from '@/lib/sanity/client';
import { groq } from 'next-sanity';

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  
  if (host) {
    return `${protocol}://${host}`;
  }
  
  return 'http://localhost:3000';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getBaseUrl();
  const postsQuery = groq`*[_type == "post"]{ "slug": slug.current, "updatedAt": _updatedAt }`;
  const posts = await client.fetch<{ slug: string; updatedAt: string }[]>(postsQuery);

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));

  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/cookies`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/reviews`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/services/deep`, lastModified: new Date() },
    { url: `${baseUrl}/services/domestic`, lastModified: new Date() },
    { url: `${baseUrl}/services/luxury`, lastModified: new Date() },
    { url: `${baseUrl}/services/maintenance`, lastModified: new Date() },
    { url: `${baseUrl}/services/office`, lastModified: new Date() },
    { url: `${baseUrl}/services/post-renovation`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];

  return [...staticPages, ...postUrls];
}