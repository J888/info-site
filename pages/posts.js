import path from "path";
import { Block, Card, Columns, Heading } from "react-bulma-components";
import React from "react";
import Link from "next/link";
import PostListWide from "../components/postListWide";
import MainWrapper from "../components/mainWrapper";
import { getPostsLocal } from "../util/getPosts";

const AllPosts = ({ postCategories }) => {
  return (
    <MainWrapper pageTitle={`All post categories`}>
      <Columns>
        <Columns.Column size={1}></Columns.Column>
        <Columns.Column size={7}>
          {
            postCategories.map(category => {
              return <Link href={`/posts/${category}`}>
                {category}
              </Link>
            })
          }
        </Columns.Column>
        <Columns.Column size={3}></Columns.Column>
      </Columns>
    </MainWrapper>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const posts = await getPostsLocal(
    process.env.POSTS_DIR
  );
  // const tag = params.tag;
  // const matchingPosts = posts.filter((post) => post.tags.includes(tag));

  return {
    props: {
      postCategories: posts.map((post) => post.category)
    },
  };
}

export default AllPosts;
