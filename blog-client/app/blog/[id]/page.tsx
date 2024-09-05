import { fetchPost } from '@/app/api/route';
import Link from 'next/link';

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 flex justify-between">
            <div>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
                <div className="prose prose-lg text-gray-600 mb-6">
                    {post.content}
                </div>
            </div>
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}