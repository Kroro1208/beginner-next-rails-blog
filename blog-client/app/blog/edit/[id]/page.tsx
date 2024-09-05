"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

const EditPostPage = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/posts/${params.id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setIsLoading(false);
      } catch (error) {
        alert("エラー: 投稿の取得に失敗しました。");
        router.push("/");
      }
    };

    fetchPost();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        await axios.put(`http://localhost:3001/api/v1/posts/${params.id}`, {
            title: title,
            content: content
        });
        router.push("/");
        router.refresh();
    } catch (error) {
      alert("エラー: 投稿の更新に失敗しました。もう一度お試しください。")
    }
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = confirm("本当に削除しますか？");
    if(isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/posts/${id}`);
        router.push("/")
        router.refresh();
      } catch (error) {
        alert('記事の削除に失敗しました');
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className='flex justify-between'>
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold mb-2">ブログ投稿の編集</h2>
            <p className="text-gray-600 mb-4">ブログ記事を編集します。</p>
          </div>
          <div className="flex justify-between items-center gap-3 p-5">
            <Link
              href="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              戻る
            </Link>
            <button
            onClick={() => handleDelete(params.id)}
            type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
              削除
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              タイトル
            </label>
            <input
              id="title"
              type="text"
              placeholder="記事のタイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              内容
            </label>
            <textarea
              id="content"
              placeholder="記事の内容を入力"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPostPage