import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { formatReceivedDateString } from '../../utils/date';
import { getNumberOfWords } from '../../utils/string';
import { useUtterances } from '../../hooks/useUtterances';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  preview: boolean;
}

const getFormattedPost = (response): Post => {
  return {
    first_publication_date: formatReceivedDateString(
      response.first_publication_date
    ),
    data: response.data,
  };
};

const getReadingTime = (post: Post): number => {
  const numberOfPostWords = post.data.content.reduce((sum, content) => {
    const numberOfWordsInContentsBody = content.body.reduce(
      (bodySum, body) => bodySum + getNumberOfWords(body.text),
      0
    );
    return (
      sum + getNumberOfWords(content.heading) + numberOfWordsInContentsBody
    );
  }, 0);

  return Math.ceil(numberOfPostWords / 200);
};

const Post: React.FC<PostProps> = ({ post, preview }) => {
  const router = useRouter();
  const formattedPost = getFormattedPost(post);
  useUtterances('comments');

  return (
    <>
      <div className={commonStyles.mainContainer}>
        <Head>
          <title>{formattedPost.data.title} | Space Traveling</title>
        </Head>

        <Header currentPath="post" />
      </div>

      {router.isFallback ? (
        <p className={styles.loadingMessage}> Carregando... </p>
      ) : (
        <>
          <img
            className={styles.postBanner}
            src={formattedPost.data.banner.url}
            alt="post-banner"
          />

          <div className={commonStyles.mainContainer}>
            <main className={styles.postPageContainer}>
              <article>
                <h1>{formattedPost.data.title}</h1>
                <div className={commonStyles.postInformation}>
                  <div>
                    <FiCalendar />
                    <span>{formattedPost.first_publication_date}</span>
                  </div>
                  <div>
                    <FiUser />
                    <span>{formattedPost.data.author}</span>
                  </div>
                  <div>
                    <FiClock />
                    <span>{getReadingTime(formattedPost)} min</span>
                  </div>
                </div>
                {formattedPost.data.content.map(section => (
                  <div
                    className={styles.postContentContainer}
                    key={section.heading}
                  >
                    <h2>{section.heading}</h2>
                    {section.body.map((body, index) => (
                      <p key={`${new Date().getTime() + index}`}>{body.text}</p>
                    ))}
                  </div>
                ))}
              </article>
              <div id="comments" />
              {preview && (
                <aside>
                  <Link href="/api/exit-preview">
                    <a>Sair do modo Preview</a>
                  </Link>
                </aside>
              )}
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author', 'posts.content'],
      orderings: '[document.last_publication_date desc]',
    }
  );

  return {
    paths: posts.results.map(post => ({
      params: {
        slug: post.uid,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref ?? null,
  });

  return {
    props: {
      post: response,
      preview,
    },
    redirect: 60 * 30,
  };
};
