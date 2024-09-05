import Link from "next/link";
import { fetchPosts } from "./api/route";

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">✏️ My Blog Page 🚀</h1>
        <Link href={"/blog/create"}>
          <button type="button" className="px-4 py-2 mb-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">
            新規作成
          </button>
        </Link>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex justify-end items-center mb-4">
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <p>作成日: {new Date(post.created_at).toLocaleDateString()}</p>
                    <p>更新日: {new Date(post.updated_at).toLocaleDateString()}</p>
                  </div>
                  <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                    <Link href={`/blog/edit/${post.id}`}>
                        編集
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}