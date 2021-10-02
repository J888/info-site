import MainWrapper from "../../components/mainWrapper";
import {
  Block,
  Card,
  Columns,
  Container,
  Content,
  Form,
  Heading,
  Image,
  Message,
  Section,
  Tag,
} from "react-bulma-components";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import NextImage from "next/image";
import styles from "../../sass/components/Post.module.scss";
import { getPostsS3 } from "../../util/getPosts";
import PostListWide from "../../components/postListWide";
import React from "react";

const PostContent = ({ data }) => (
  <Columns>
    <Columns.Column size={1}></Columns.Column>
    <Columns.Column size={7}>
      <Heading>{data?.title}</Heading>
      <Content>
        <Container>
          <Image src={data?.imageUrl} size={2} />
        </Container>
        <Container className={styles.publishedDate}>
          <Tag.Group gapless>
            <Tag color="info">Published</Tag>
            <Tag>{data?.createdAt}</Tag>
          </Tag.Group>
          <Tag.Group>
            {data?.tags?.map((tag) => (
              <Link href={`/tags/${tag}`} key={tag}>
                <Tag key={tag} clickable>
                  #{tag}
                </Tag>
              </Link>
            ))}
          </Tag.Group>
        </Container>

        <Section>
          {data?.parts?.map((part, i) => {

            let toRender;

            if (part.type == "MARKDOWN") {
              toRender = <ReactMarkdown>{part.fileContents}</ReactMarkdown>;
            } else if (part.type == "IMAGE") {
              console.log(part.s3Url)
              toRender =
                <Container>
                  <NextImage objectFit="cover" src={part.s3Url} alt="pic alt" height="550" width="700"/>
                </Container>
            }

            return <React.Fragment key={`part-${i}`}>
              {toRender}
            </React.Fragment>
          })}

          {data?.parts == undefined && <Section>Post has no content</Section>}
        </Section>
      </Content>
    </Columns.Column>
    <Columns.Column size={3}>
      <Block>
        <Card>
          <Message>
            <Message.Header>Related</Message.Header>
          </Message>

          <Card.Content>
            No data
          </Card.Content>
        </Card>
      </Block>

      <Block>
        <Card>
          <Message>
            <Message.Header>Trending Now</Message.Header>
          </Message>

          <Card.Content>
            No data
          </Card.Content>
        </Card>
      </Block>
    </Columns.Column>
  </Columns>
);

const Post = ({ data, postsByCategory, category }) => {
  return (
    <MainWrapper pageTitle={`page ${data?.title}`}>
      {data && <PostContent data={data} />}
      {postsByCategory && (
        <PostListWide
          posts={postsByCategory}
          heading={`${postsByCategory.length} posts with category ${category}`}
        />
      )}
      <Block></Block>
    </MainWrapper>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const posts = await getPostsS3(process.env.STATIC_FILES_S3_BUCKET, process.env.SITE_FOLDER_S3);
  console.log(posts[0].parts)
  const [category, id] = params.slug;

  if (category && !id) {
    // if no post id is given e.g. /posts/category/
    return {
      props: {
        postsByCategory: posts.filter((post) => post.category == category),
        category,
      },
    };
  }

  return {
    props: {
      data: posts.filter((post) => post.id == id)[0],
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPostsS3(process.env.STATIC_FILES_S3_BUCKET, process.env.SITE_FOLDER_S3);
  console.log(posts);

  return {
    paths: posts.map((post) => `/posts/${post.category}/${post.id}`) || [],
    fallback: true,
  };
}

export default Post;
