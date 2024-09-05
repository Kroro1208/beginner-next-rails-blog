import { fetchAllPosts, fetchPost } from '@/app/api/route';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({
    id: post.id.toString()
  }));
}

async function BlogPostContent({ id }: { id: string }) {
    const post = await fetchPost(id);
    return (
      <article className="flex justify-between max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
            <div className="prose prose-lg text-gray-600">
            {post.content}
            </div>
        </div>
        <div className="flex flex-col justify-end gap-5 items-center mt-4">
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                編集
            </button>
            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
                削除
            </button>
        </div>
      </article>
    );
  }
  
  export default function BlogShowPage({ params }: { params: { id: string } }) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">ブログ詳細</h1>
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          }>
            <BlogPostContent id={params.id} />
          </Suspense>
        </div>
      </div>
    );
  }