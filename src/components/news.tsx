// comment
import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface NewsProps {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
}
const NewsPost: React.FC<NewsProps> = (props: NewsProps) => {
  const { ...rest } = props;
  return (
    <>
      <span>{rest.author} ({new Date(rest.publishedAt).toLocaleDateString()})</span>
      <h3>
        {`Title: ${rest.title}`}
      </h3>
      <p>{rest.description} <br /><a href={rest.url}>{rest.url}</a></p>
      <img src={rest.urlToImage} className="news-img" alt={rest.title} />
    </>
  );
};

const Container: React.FC = () => {
  const [data, setData] = useState<Array<NewsProps>>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=4dbc17e007ab436fb66416009dfb59a8',
      );
      setData(result.data.articles);
    };

    fetchData();
  }, []);

  return (
    <div className="news-list">
      <h1>List of news</h1>
      <ul>
        {data
          ? data.map((itm: NewsProps, i) => (
            <li key={i} className="news">
              <NewsPost {...itm} />
            </li>
          )) : ''}
      </ul>
    </div>
  );
};
export { Container };
