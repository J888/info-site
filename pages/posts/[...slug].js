import MainWrapper from "../../components/mainWrapper";
import Nav from "../../components/navbar";
// import { promises as fs } from "fs";
import path from "path";
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
import styles from "../../sass/components/Post.module.scss";
import getPosts from "../../util/getPosts";
import PostListWide from "../../components/postListWide";

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
          {data?.parts?.map((part) => {
            if (part.type == "MARKDOWN") {
              return <ReactMarkdown>{part.fileContents}</ReactMarkdown>;
            } else if (part.type == "IMAGE") {
              return (
                <Container>
                  <Image src={part.url} size={2} />
                </Container>
              );
            }
          })}

          {data?.parts == undefined && <Section>Post has no content</Section>}
        </Section>
      </Content>
    </Columns.Column>
    <Columns.Column size={3}>
      <Block>
        <Card>
          <Message>
            <Message.Header>Related Articles</Message.Header>
          </Message>

          <Card.Content>
            Fishing Boat Spills Fuel In Bodega Bay (PHOTOS)
          </Card.Content>

          <Card.Content>
            ICYMI: 'We Just Need To See You Again': LI Mom Searc...
          </Card.Content>

          <Card.Content>
            Connecticut Will Take In Over 300 Afghan Refugees: L...
          </Card.Content>
        </Card>
      </Block>

      <Block>
        <Card>
          <Message>
            <Message.Header>Trending Now</Message.Header>
          </Message>

          <Card.Content>
            Fishing Boat Spills Fuel In Bodega Bay (PHOTOS)
          </Card.Content>

          <Card.Content>
            ICYMI: 'We Just Need To See You Again': LI Mom Searc...
          </Card.Content>

          <Card.Content>
            Connecticut Will Take In Over 300 Afghan Refugees: L...
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
  const posts = await getPosts(
    "/Users/john/Documents/static-site-private-files/local-info-site-1"
  );
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
  const posts = await getPosts(
    "/Users/john/Documents/static-site-private-files/local-info-site-1"
  );

  return {
    paths: posts.map((post) => `/posts/${post.category}/${post.id}`) || [],
    fallback: true,
  };
}

export default Post;
