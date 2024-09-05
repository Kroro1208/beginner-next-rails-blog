"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const CreatePostPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // API叩く
    try {
        await axios.post("http://localhost:3001/api/v1/posts", {
            title: title,
            content: content
        });
        router.push("/");
    } catch (error) {
      alert("エラー: 投稿に失敗しました。もう一度お試しください。")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">新規ブログ投稿</h2>
            <p className="text-gray-600 mb-4">新しいブログ記事を作成します。</p>
          </div>
          <div className="flex justify-between items-center p-5">
            <Link
              href="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              戻る
            </Link>
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
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage