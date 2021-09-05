import { Document } from "@prismicio/client/types/documents";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { RichText } from "prismic-dom";
import React from "react";
import { getPrismicClient } from "../../services/prismic";
import { dateToString } from "../../utils/dates";
import { BasePost, PostProps } from "./models";
import styles from "./post.module.scss";

const Post: React.FC<PostProps> = ({ post }) => {
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
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
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
    excerpt: RichText.asHtml(response.data.content),
    updatedAt: dateToString(new Date(response.last_publication_date)),
  };
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID("post", String(slug), {});

  return {
    props: {
      post: getFormattedPost(response, slug as string),
    },
  };
};
