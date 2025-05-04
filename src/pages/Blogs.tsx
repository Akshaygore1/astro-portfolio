import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Post = {
  title: string;
  slug: string;
  brief: string;
  publishedAt: string;
  coverImage: {
    url: string;
  } | null;
};

type UserData = {
  user: {
    id: string;
    posts: {
      nodes: Post[];
    };
  };
};

function convertDate(timestamp: string) {
  const date = new Date(timestamp);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${month} ${day} ${year}`;
}

export function Blog() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                user(username:"akshay2301"){
                  id
                  posts(page:1,pageSize:10){
                    nodes{
                      title
                      slug
                      brief
                      publishedAt
                      coverImage {
                        url
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
            Loading posts...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
            Error
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data?.user.posts.nodes.length) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
            No posts found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
          Blog Posts
        </h1>
        <div className="flex flex-col gap-8">
          {data.user.posts.nodes.map((post) => (
            <article key={post.slug} className="group">
              <a
                href={`${"https://akshaygore.hashnode.dev/" + post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {post.title}
                    </h2>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <time className="text-sm text-zinc-500 dark:text-zinc-400">
                    {convertDate(post.publishedAt)}
                  </time>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
