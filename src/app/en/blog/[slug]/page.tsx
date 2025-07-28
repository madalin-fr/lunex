import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { groq } from 'next-sanity';

// Import the actual BlogPostPage component
import BlogPostPage from '../../../blog/[slug]/page';

interface Props {
  params: Promise<{ slug: string }>;
}

// This ensures English blog posts are found using their English slugs
export default function EnglishBlogPostPage({ params }: Props) {
  return <BlogPostPage params={params} />;
}

// Generate metadata for English blog posts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    groq`*[_type == "post" && slug.en.current == $slug][0]{
      title,
      excerpt,
      mainImage
    }`,
    { slug }
  );

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title?.en || post.title?.it || 'Blog Post',
    description: post.excerpt?.en || post.excerpt?.it || '',
    openGraph: {
      title: post.title?.en || post.title?.it || 'Blog Post',
      description: post.excerpt?.en || post.excerpt?.it || '',
      images: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
    },
  };
}

// Generate static params for English blog posts
export async function generateStaticParams() {
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.en.current)]{
      "slug": slug.en.current
    }`
  );

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}