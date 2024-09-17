import { fetchPost } from '@/app/api/route';
import type { Post } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';

// ルートキャッシングを無効化し、毎回のリクエストで新しいデータを取得
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const post: Post = await fetchPost(params.id);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 flex flex-col">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
          {post.image_url && (
            <div className='mb-6 relative w-full' style={{ aspectRatio: '16/9' }}>
              <Image
                src={post.image_url}
                alt={post.title}
                width={800}
                height={450}
                layout="responsive"
                objectFit="cover"
                className='rounded-lg'
              />
            </div>
          )}
          <div className="prose prose-lg text-gray-600 mb-6">
            {post.content}
          </div>
          <div className="mt-auto">
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