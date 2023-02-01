"use client";

import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [filter, setFilter] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([] satisfies Post[]);

  const filterInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data satisfies Post[]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    const value = filterInput.current?.value;
    console.log(value);
    setFilter(value || "");
  };

  return (
    <main className={styles.main}>
      <div>
        <input
          type="text"
          ref={filterInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button type="button" onClick={handleSubmit}>
          Filter
        </button>
      </div>
      <div>
        {posts ? (
          <ul>
            {posts.map((post, i) => {
              if (post.body.includes(filter)) {
                return (
                  <li key={i}>
                    <Card body={post.body} title={post.title} />
                  </li>
                );
              }
              return;
            })}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
}

const Card: React.FC<Pick<Post, "title" | "body">> = ({ body, title }) => {
  return (
    <div className={inter.className}>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

type Post = {
  title: string;
  body: string;
  id: number;
  userId: number;
};
