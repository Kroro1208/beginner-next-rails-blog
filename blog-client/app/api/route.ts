import type { Post } from "../types";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/api/v1/posts", {cache: "no-store"});
  if (!res.ok) {
    const errorBody = await res.text();
    console.error('API Error:', res.status, errorBody);
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchPost(id: string): Promise<Post> {
    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('取得できませんでした');
    }
    return res.json();
  }


  export async function deletePost(id: string) {
    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, {
        method: "DELETE",
    });
    if(!res.ok) {
        throw new Error("ブログの削除に失敗しました");
    }
  }