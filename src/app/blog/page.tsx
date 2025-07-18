import { client, hasValidConfig } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/client'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/sanity/types'

export const revalidate = 60 // revalidate every 60 seconds

async function getPosts() {
  if (!hasValidConfig) {
    return []
  }
  
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  }`
  
  try {
    const posts = await client.fetch(query)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  if (!hasValidConfig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Sanity CMS Setup Required</h2>
            <p className="text-yellow-700 mb-4">
              To start using the blog, you need to configure Sanity CMS:
            </p>
            <ol className="list-decimal list-inside text-yellow-700 space-y-2">
              <li>Create a Sanity account at <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="underline">sanity.io</a></li>
              <li>Create a new project and note your Project ID</li>
              <li>Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file in your project root</li>
              <li>Add your Sanity configuration:
                <pre className="mt-2 bg-yellow-100 p-2 rounded text-sm">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production`}
                </pre>
              </li>
              <li>Restart your development server</li>
            </ol>
            <p className="text-yellow-700 mt-4">
              For detailed instructions, see <code className="bg-yellow-100 px-1 rounded">/docs/sanity-blog-setup.md</code>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.mainImage && (
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor({ ...post.mainImage, _type: 'image' }).width(400).height(300).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              )}
              
              <div className="p-6">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2 mb-2">
                    {post.categories.map((category, index) => (
                      <span key={index} className="text-xs text-blue-600 font-semibold uppercase">
                        {typeof category === 'string' ? category : category.title}
                      </span>
                    ))}
                  </div>
                )}
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {post.author && <span>By {typeof post.author === 'string' ? post.author : post.author.name}</span>}
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
            </article>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}