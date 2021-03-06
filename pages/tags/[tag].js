import MainWrapper from "../../components/mainWrapper";
import { Columns, Heading } from "react-bulma-components";
import React from "react";
import { getPostsS3 } from "../../util/getPosts";
import PostListWide from "../../components/postListWide";

const PostsByTag = ({ matchingPosts, tag }) => {
  return (
    <MainWrapper pageTitle={`#${tag} posts`}>
      <Columns>
        <Columns.Column size={1}></Columns.Column>
        <Columns.Column size={7}>
          <PostListWide
            posts={matchingPosts}
            heading={`${matchingPosts?.length} Posts Tagged with #${tag}`}
          />
        </Columns.Column>
        <Columns.Column size={3}></Columns.Column>
      </Columns>
    </MainWrapper>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const posts = await getPostsS3(process.env.STATIC_FILES_S3_BUCKET, process.env.SITE_FOLDER_S3);
  const tag = params.tag;
  const matchingPosts = posts.filter((post) => post.tags.includes(tag));

  return {
    props: {
      tag,
      matchingPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPostsS3(process.env.STATIC_FILES_S3_BUCKET, process.env.SITE_FOLDER_S3);
  const tags = Array.from(new Set(posts.map((post) => post.tags || []).flat()));

  return {
    paths: tags.map((tag) => `/tags/${tag}`) || [],
    fallback: true,
  };
}

export default PostsByTag;
