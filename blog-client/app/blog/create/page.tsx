"use client";
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const CreatePostPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('post[title]', title)
    formData.append('post[content]', content)
    if(image) {
      formData.append('post[image]', image)

    }

    // API叩く
    try {
        const response =await axios.post("http://localhost:3001/api/v1/posts", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
        });
        if(response.data.image_url) {
          setImageUrl(response.data.image_url);
        }
        router.push("/");
        router.refresh();
    } catch (error) {
      alert("エラー: 投稿に失敗しました。もう一度お試しください。")
    }
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      }
      reader.readAsDataURL(file);
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
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              画像
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {(imagePreview || imageUrl) && (
              <div className="mt-4">
                <Image
                  src={imagePreview || imageUrl || ''}
                  alt="Post image"
                  width={300}
                  height={200}
                  className="object-cover rounded"
                />
              </div>
            )}
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