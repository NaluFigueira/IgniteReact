import { useState } from 'react';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';

import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { formatReceivedDateString } from '../utils/date';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const formatResponseResult = (results: Post[]): Post[] => {
  return results.map(post => ({
    uid: post.uid,
    first_publication_date: formatReceivedDateString(
      post.first_publication_date
    ),
    data: post.data,
  }));
};

const Home: React.FC<HomeProps> = ({ postsPagination }) => {
  const { results } = postsPagination;
  const formattedResults = formatResponseResult(results);
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <div className={commonStyles.mainContainer}>
      <Head>
        <title>Home | Space Traveling</title>
      </Head>

      <Header currentPath={currentPath} />

      {formattedResults.map(post => (
        <div className={styles.postContainer} key={post.uid}>
          <span className={styles.postTitle}>{post.data.title}</span>
          <span className={styles.postSubtitle}>{post.data.subtitle}</span>
          <div>
            <div>
              <FiCalendar />
              <span>{post.first_publication_date}</span>
            </div>
            <div>
              <FiUser />
              <span>{post.data.author}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author', 'posts.content'],
      pageSize: 5,
    }
  );

  const { next_page, results } = postsResponse;

  return {
    props: {
      postsPagination: {
        next_page,
        results,
      },
    },
  };
};
