import { Document } from "@prismicio/client/types/documents";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import React, { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import { dateToString } from "../../../utils/dates";
import { BasePost, PostProps } from "../models";
import styles from "../post.module.scss";

const Post: React.FC<PostProps> = ({ post }) => {
  const [session] = useSession();

  useEffect(() => {
    if (session?.activeSubscription) {
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default Post;

const getFormattedPost = (response: Document, slug: string): BasePost => {
  return {
    slug,
    title: RichText.asText(response.data.title),
    excerpt: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: dateToString(new Date(response.last_publication_date)),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", String(slug), {});

  return {
    props: {
      post: getFormattedPost(response, slug as string),
    },
    redirect: 60 * 30, //30 minutes
  };
};
