import React, { useRef, useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";

const url = page =>
  `https://api.themoviedb.org/3/search/movie?api_key=d5e4a2eb5fb264de1583b6945d203546&language=en-US&query=iron&page=${page}&include_adult=false`;

const Home = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [caching, setCaching] = useState({});
  const [postsPerPage, setPostsPerPgae] = useState(10);

  useEffect(() => {
    if (caching[currentPage]) setPosts(posts);
    (async () => {
      setCaching({ ...caching, [currentPage]: true });
      setLoading(true);
      const response = await fetch(url(currentPage));
      const jsonResult = (await response.json()).results.map(m => ({
        id: m.id,
        title: m.title
      }));
      const orgPosts = JSON.parse(JSON.stringify(posts));
      setPosts({ orgPosts, [currentPage]: jsonResult });
      setLoading(false);
    })();
  }, [currentPage]);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>React Simple Pagination</h1>
      <Posts loading={loading} posts={posts[currentPage]} />
      <Pagination paginate={paginate} currentPage={currentPage} />
    </>
  );
};

export default Home;
