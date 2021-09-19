import MainWrapper from "../../components/mainWrapper";
import Nav from "../../components/navbar";
import { promises as fs } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Block, Card, Heading, Image, Level } from "react-bulma-components";
import React from "react";

const PostsByTag = ({ matchingPosts, tag }) => {
  return <MainWrapper pageTitle={`#${tag} posts`}>
    <React.Fragment>
      <Heading>{matchingPosts.length} Posts Tagged with #{tag}</Heading>
    {
      matchingPosts && matchingPosts.map(post => 
        
        <Block key={post.id}>
        <Card>
          <Card.Header.Title>
            {post.title}
          </Card.Header.Title>
          <Card.Content>
            {post.description}
          </Card.Content>
          <Card.Footer style={{padding: '0.5em'}}>{post.createdAt}</Card.Footer>
        </Card>
        </Block>
        
        )
    }
    </React.Fragment>
  </MainWrapper>;
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const testDataPath = path.join(process.cwd(), "testData", "fakePosts.json");
  const fileContents = await fs.readFile(testDataPath, "utf8");
  const posts = JSON.parse(fileContents);


  const tag = params.tag;

  const matchingPosts = posts.filter((post) => post.tags.includes(tag) );

  return {
    props: {
      tag,
      matchingPosts,
    },
  };
}

export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug()

  const testDataPath = path.join(process.cwd(), "testData", "fakePosts.json");
  const fileContents = await fs.readFile(testDataPath, "utf8");
  const posts = JSON.parse(fileContents);

  const tags = Array.from(new Set(posts.map((post) => post.tags || []).flat()));

  return {
    paths: tags.map((tag) => `/tags/${tag}`) || [],
    fallback: true,
  };
}

export default PostsByTag;
