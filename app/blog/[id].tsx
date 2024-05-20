// pages/blog/[id].tsx
import { useRouter } from 'next/router';
import BlogDetailsPage from '../blog-details/page';
import blogData from '@/components/Blog/blogData';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  // Convert id to a string before comparison
  const blogPost = blogData.find((post) => post.id.toString() === id);

  return <BlogDetailsPage blog={blogPost} />;
}
