import { client, hasValidConfig } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Post } from '@/lib/sanity/types'

export const revalidate = 60

async function getPost(slug: string) {
  if (!hasValidConfig) {
    return null
  }
  
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    publishedAt,
    "author": author->{name, image, bio},
    "categories": categories[]->title
  }`
  
  try {
    const post = await client.fetch(query, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Generate static params for all posts
export async function generateStaticParams() {
  if (!hasValidConfig) {
    // Return a default static param to satisfy static export requirements
    return [{ slug: 'example-post' }]
  }
  
  const query = `*[_type == "post"] { slug }`
  try {
    const posts = await client.fetch(query) as Post[]
    if (posts.length === 0) {
      // Return a default static param if no posts exist
      return [{ slug: 'example-post' }]
    }
    return posts.map((post) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return [{ slug: 'example-post' }]
  }
}

// Custom components for PortableText
const components = {
  types: {
    image: ({ value }: { value: { _type: string; asset: { _ref: string; _type: string }; alt?: string } }) => {
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog image'}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || '#'
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic">{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero section with featured image */}
      {post.mainImage && (
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={urlFor({ ...post.mainImage, _type: 'image' }).width(1200).height(500).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl mx-auto">
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {post.categories.map((category: string) => (
                    <span key={category} className="text-sm font-semibold uppercase bg-white/20 px-3 py-1 rounded">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                {post.author?.name && <span>By {post.author.name}</span>}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!post.mainImage && (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
              {post.author?.name && <span>By {post.author.name}</span>}
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
            </div>
          </>
        )}
        
        {/* Author bio */}
        {post.author && (
          <div className="flex items-center gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
            {post.author.image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor({ ...post.author.image, _type: 'image' }).width(64).height(64).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg">{post.author.name}</h3>
              {post.author.bio && (
                <div className="text-sm text-gray-600">
                  <PortableText value={post.author.bio} />
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Main content */}
        <div className="prose prose-lg max-w-none">
          {post.body && <PortableText value={post.body} components={components} />}
        </div>
      </div>
    </article>
  )
}