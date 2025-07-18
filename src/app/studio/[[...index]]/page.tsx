import { hasValidConfig } from '@/lib/sanity/client'

export function generateStaticParams() {
  return [
    { index: [] },
    { index: ['index'] },
  ]
}

export default function StudioPage() {
  if (!hasValidConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sanity Studio Setup Required</h1>
            <p className="text-gray-600 mb-6">
              To access the Sanity Studio, you need to configure your Sanity project first.
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Create a Sanity account at <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">sanity.io</a></li>
              <li>Create a new project and note your Project ID</li>
              <li>Add your credentials to <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>:
                <pre className="mt-2 bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production`}
                </pre>
              </li>
              <li>Restart your development server</li>
              <li>Return to this page to access Sanity Studio</li>
            </ol>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> Sanity Studio is a powerful content management interface that will be available here once configured.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // For now, show a message to visit Sanity's hosted studio
  const studioUrl = `https://www.sanity.io/manage/personal/project/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Access Sanity Studio</h2>
        <p className="text-gray-600 mb-4">
          Click the link below to access your Sanity Studio dashboard.
        </p>
        <a
          href={studioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Sanity Studio
        </a>
      </div>
    </div>
  )
}