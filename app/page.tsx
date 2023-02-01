"use client";

import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import axios from "axios";
import { useState, useEffect, useRef, Fragment } from "react";

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
      <div className={styles.filterform}>
        <input
          className={styles.filterinput}
          type="text"
          ref={filterInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          tabIndex={2}
        />
        <button className={styles.button} type="button" onClick={handleSubmit}>
          Filter
        </button>
      </div>
      <div>
        {posts ? (
          <ul>
            {posts.map((post, i) => {
              return (
                post.body.includes(filter) && (
                  <li key={i}>
                    <Card body={post.body} title={post.title} filter={filter} />
                  </li>
                )
              );
            })}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
}

const Card: React.FC<Pick<Post, "title" | "body"> & { filter: string }> = ({
  body,
  title,
  filter,
}) => {
  return (
    <div className={inter.className + " " + styles.card} tabIndex={0}>
      <h1>{title}</h1>
      <p>
        {filter
          ? body.split(filter).map((subStr, i) => {
              return i ? (
                <Fragment key={i}>
                  <span className={styles.highlighted}>{filter}</span>
                  {subStr}
                </Fragment>
              ) : (
                subStr
              );
            })
          : body}
      </p>
    </div>
  );
};

type Post = {
  title: string;
  body: string;
  id: number;
  userId: number;
};
