import type { Post } from "./types";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/api/v1/posts", { next: {revalidate: 60 * 60 * 24}});
  if(!res.ok) {
    throw new Error('取得できませんでした');
  }
  return res.json();
}

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">✏️ My Blog Page 🚀</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex justify-between items-center mb-4">
                  <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                    編集
                  </button>
                  <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
                    削除
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  <p>作成日: {new Date(post.created_at).toLocaleDateString()}</p>
                  <p>更新日: {new Date(post.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}