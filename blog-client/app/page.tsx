
interface Post {
  id: string
  title: string
  content: string
}

export async function fetchPosts(): Promise<Post[]> {
  // ISRで１日毎に取得
  const res = await fetch("http://localhost:3001/api/v1/posts", { next: {revalidate: 60 * 60 * 24}});
  if(!res.ok) {
    throw new Error('取得できませんでした');
  }
  return res.json();
}

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <div>
      <h1>ブログページ</h1>
      <ul>
        { posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
