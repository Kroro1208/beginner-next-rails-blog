import type { Post } from "../types";

export async function fetchPost(id: string): Promise<Post> {
    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error('取得できませんでした');
    }
    return res.json();
  }
  
  export async function fetchAllPosts(): Promise<Post[]> {
    const res = await fetch("http://localhost:3001/api/v1/posts");
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