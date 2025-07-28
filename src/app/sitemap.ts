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
  const postsQuery = groq`*[_type == "post" && (defined(slug.it.current) || defined(slug.en.current))]{
    "slugIt": slug.it.current,
    "slugEn": slug.en.current,
    "updatedAt": _updatedAt
  }`;
  const posts = await client.fetch<{ slugIt: string; slugEn: string; updatedAt: string }[]>(postsQuery);

  const postUrls: { url: string; lastModified: Date }[] = [];
  
  posts.forEach((post) => {
    // Add Italian version if slug exists
    if (post.slugIt && post.slugIt.trim() !== '') {
      postUrls.push({
        url: `${baseUrl}/blog/${post.slugIt}`,
        lastModified: new Date(post.updatedAt),
      });
    }
    
    // Add English version if slug exists
    if (post.slugEn && post.slugEn.trim() !== '') {
      postUrls.push({
        url: `${baseUrl}/en/blog/${post.slugEn}`,
        lastModified: new Date(post.updatedAt),
      });
    }
  });

  const staticPages = [
    // Italian pages (default)
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
    
    // English pages (/en/)
    { url: `${baseUrl}/en/`, lastModified: new Date() },
    { url: `${baseUrl}/en/about`, lastModified: new Date() },
    { url: `${baseUrl}/en/blog`, lastModified: new Date() },
    { url: `${baseUrl}/en/contact`, lastModified: new Date() },
    { url: `${baseUrl}/en/reviews`, lastModified: new Date() },
    { url: `${baseUrl}/en/services`, lastModified: new Date() },
  ];

  return [...staticPages, ...postUrls];
}