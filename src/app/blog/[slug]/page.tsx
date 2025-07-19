import { client, hasValidConfig } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { getLocalizedPost } from '@/lib/sanity/utils'
import { cookies } from 'next/headers'
import { LocaleSwitchHandler } from '@/components/blog/LocaleSwitchHandler'

export const revalidate = 60

async function getPost(slug: string) {
  if (!hasValidConfig) {
    return null
  }
  
  // Updated query to handle localized slugs
  const query = `*[_type == "post" && (slug.en.current == $slug || slug.it.current == $slug)][0] {
    _id,
    "title": title,
    "slug": slug,
    mainImage {
      ...,
      "alt": alt
    },
    "body": body,
    publishedAt,
    author-> {
      _id,
      "name": name,
      image,
      "bio": bio
    },
    categories[]-> {
      _id,
      "title": title
    }
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
  
  const query = `*[_type == "post"] {
    "slug": slug
  }`
  try {
    const posts = await client.fetch(query)
    if (posts.length === 0) {
      return [{ slug: 'example-post' }]
    }
    
    const slugs: { slug: string }[] = []
    
    posts.forEach((post: { slug?: { en?: { current?: string }; it?: { current?: string } } }) => {
      if (post.slug) {
        // Add English slug
        if (post.slug.en && post.slug.en.current) {
          slugs.push({ slug: post.slug.en.current })
        }
        // Add Italian slug
        if (post.slug.it && post.slug.it.current) {
          slugs.push({ slug: post.slug.it.current })
        }
      }
    })
    
    return slugs.length > 0 ? slugs : [{ slug: 'example-post' }]
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
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h4>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 my-6 italic text-gray-700">{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 leading-relaxed text-gray-900">{children}</p>,
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside mb-4 text-gray-900">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside mb-4 text-gray-900">{children}</ol>,
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rawPost = await getPost(slug)
  
  if (!rawPost) {
    notFound()
  }

  // Get locale from cookies instead of headers
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')
  const locale = localeCookie?.value || 'en'
  
  // Add logging to debug locale detection
  console.log('[BlogPost] Locale detection:', {
    cookieValue: localeCookie?.value,
    finalLocale: locale,
    slug: slug
  })

  // Get slug mapping for locale switching
  const slugMap = {
    en: rawPost.slug?.en?.current || slug,
    it: rawPost.slug?.it?.current || slug
  }

  // Process the localized post data
  const post = getLocalizedPost(rawPost, locale)
  
  // Simple translation function for server components
  const t = (key: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      en: {
        'blog.backToBlog': '← Back to Blog',
        'blog.by': 'By',
        'blog.about': 'About',
        'blog.writtenBy': 'Written by',
        'blog.needProfessionalCleaning': 'Need Professional Cleaning Services?',
        'blog.ctaDescription': 'Let Lunex handle your cleaning needs with our professional, reliable, and eco-friendly services.',
        'blog.getFreeQuote': 'Get Free Quote',
        'blog.viewServices': 'View Services'
      },
      it: {
        'blog.backToBlog': '← Torna al Blog',
        'blog.by': 'di',
        'blog.about': 'Chi è',
        'blog.writtenBy': 'Scritto da',
        'blog.needProfessionalCleaning': 'Hai bisogno di servizi di pulizia professionali?',
        'blog.ctaDescription': 'Lascia che Lunex gestisca le tue esigenze di pulizia con i nostri servizi professionali, affidabili ed ecologici.',
        'blog.getFreeQuote': 'Richiedi Preventivo Gratuito',
        'blog.viewServices': 'Vedi Servizi'
      }
    }
    
    return translations[locale]?.[key] || translations['en'][key] || key
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Handle locale switching */}
      <LocaleSwitchHandler currentSlug={slug} slugMap={slugMap} />
      
      {/* Hero section with featured image */}
      {post.mainImage && (
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Image
            src={urlFor({ ...post.mainImage, _type: 'image' }).width(1200).height(600).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)]"></div>
          
          {/* Navigation breadcrumb */}
          <div className="absolute top-8 left-8 right-8">
            <div className="max-w-4xl mx-auto">
              <nav className="text-white/80 text-sm">
                <Link href="/blog" className="hover:text-white transition-colors">{t('blog.backToBlog')}</Link>
              </nav>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl mx-auto">
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-6">
                  {post.categories.map((category: string) => (
                    <span key={category} className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold uppercase px-4 py-2 rounded-full backdrop-blur-sm">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
              <div className="flex items-center gap-6 text-lg text-white/90">
                {post.author?.name && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{t('blog.by')} {post.author.name}</span>
                  </div>
                )}
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!post.mainImage && (
          <div className="text-center mb-16">
            <nav className="text-blue-600 text-sm mb-8">
              <Link href="/blog" className="hover:text-blue-800 transition-colors">{t('blog.backToBlog')}</Link>
            </nav>
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 justify-center mb-6">
                {post.categories.map((category: string) => (
                  <span key={category} className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold uppercase px-4 py-2 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-center gap-6 text-lg text-gray-800">
              {post.author?.name && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{t('blog.by')} {post.author.name}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              )}
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-8"></div>
          </div>
        )}
        
        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1"></div>
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {post.body && <PortableText value={post.body} components={components} />}
            </div>
          </div>
        </div>
        
        {/* Author attribution */}
        {post.author && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 text-gray-700">
              {post.author.image && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={urlFor({ ...post.author.image, _type: 'image' }).width(40).height(40).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-lg">
                {t('blog.writtenBy')} <span className="font-semibold">{post.author.name}</span>
              </p>
            </div>
          </div>
        )}
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('blog.needProfessionalCleaning')}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t('blog.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                {t('blog.getFreeQuote')}
              </a>
              <a href="/services" className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                {t('blog.viewServices')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}