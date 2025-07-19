import { client, hasValidConfig, urlFor } from '@/lib/sanity/client'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/sanity/types'
import { getLocalizedPost } from '@/lib/sanity/utils'
import { headers } from 'next/headers'

// Force dynamic rendering since we use headers
export const dynamic = 'force-dynamic'

async function getPosts() {
  if (!hasValidConfig) {
    return []
  }
  
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    "title": title,
    "slug": slug,
    mainImage {
      ...,
      "alt": alt
    },
    "excerpt": excerpt,
    publishedAt,
    author-> {
      _id,
      "name": name,
      "bio": bio
    },
    categories[]-> {
      _id,
      "title": title
    },
    "body": body
  }`
  
  try {
    const posts = await client.fetch(query)
    return posts || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'en'
  const posts = await getPosts()

  if (!hasValidConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Lunex <span className="text-blue-300">Blog</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Professional cleaning insights, tips, and industry expertise
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-800">Sanity CMS Setup Required</h2>
            </div>
            <p className="text-yellow-700 mb-6 text-lg">
              To start publishing your cleaning expertise and insights, you need to configure Sanity CMS:
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ol className="list-decimal list-inside text-yellow-700 space-y-4 text-lg">
                <li>Create a Sanity account at <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-yellow-900">sanity.io</a></li>
                <li>Create a new project and note your Project ID</li>
                <li>Create a <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">.env.local</code> file in your project root</li>
                <li>Add your Sanity configuration:
                  <pre className="mt-3 bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production`}
                  </pre>
                </li>
                <li>Restart your development server</li>
              </ol>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                For detailed instructions, see <code className="bg-blue-100 px-2 py-1 rounded font-mono text-sm ml-1">/docs/sanity-blog-setup.md</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Lunex <span className="text-blue-300">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Professional cleaning insights, expert tips, and industry expertise to keep your spaces pristine
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-blue-200 font-medium">
                  📚 {posts.length} Article{posts.length !== 1 ? 's' : ''} Available
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length > 0 && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((rawPost: Post) => {
            const post = getLocalizedPost(rawPost, locale)
            const slugValue = post.slug?.current || ''
            
            return (
              <article key={post._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {post.mainImage && (
                  <Link href={`/blog/${slugValue}`}>
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={urlFor({ ...post.mainImage, _type: 'image' }).width(400).height(300).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                )}
                
                <div className="p-6">
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {post.categories.map((category: any, index: number) => (
                        <span key={index} className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold uppercase px-3 py-1 rounded-full">
                          {typeof category === 'string' ? category : category.title}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    <Link href={`/blog/${slugValue}`} className="hover:text-blue-600 transition-colors duration-200">
                      {post.title}
                    </Link>
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      {post.author && (
                        <span className="text-sm text-gray-500 font-medium">
                          By {post.author.name}
                        </span>
                      )}
                    </div>
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt} className="text-sm text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
              <p className="text-gray-500 text-lg">We're preparing amazing cleaning tips and insights for you. Check back soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}