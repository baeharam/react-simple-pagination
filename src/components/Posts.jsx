import React from "react";

const Posts = ({ loading, posts }) => {
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <ul>{posts && posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
  );
};

export default Posts;
