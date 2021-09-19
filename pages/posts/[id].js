import MainWrapper from "../../components/mainWrapper";
import Nav from "../../components/navbar";
import { promises as fs } from "fs";
import path from "path";
import {
  Block,
  Card,
  Columns,
  Container,
  Content,
  Heading,
  Image,
  Message,
  Section,
  Tag,
} from "react-bulma-components";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const Post = ({ data }) => {
  return (
    <MainWrapper pageTitle={`page ${data?.title}`}>
      <Heading>{data?.title}</Heading>
      <Columns>
        <Columns.Column size={1}></Columns.Column>
        <Columns.Column size={7}>
          <Content>
            <Container>
              <Image src={data?.imageUrl} size={2} />
            </Container>
            <Section>
              <ReactMarkdown>
                {data?.markdown || "Post has no content"}
              </ReactMarkdown>
            </Section>
            <Block>
              <Tag.Group>
                {data?.tags?.map((tag) => (
                  <Link href={`/tags/${tag}`}>
                    <Tag key={tag} clickable>#{tag}</Tag>
                  </Link>
                ))}
              </Tag.Group>
            </Block>
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
      <Block></Block>
    </MainWrapper>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const testDataPath = path.join(process.cwd(), "testData", "fakePosts.json");
  const fileContents = await fs.readFile(testDataPath, "utf8");
  const posts = JSON.parse(fileContents);

  const id = params.id;

  const data = posts.filter((post) => post.id == id)[0];

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug()

  const testDataPath = path.join(process.cwd(), "testData", "fakePosts.json");
  const fileContents = await fs.readFile(testDataPath, "utf8");
  const posts = JSON.parse(fileContents);

  return {
    paths: posts.map((post) => `/posts/${post.id}`) || [],
    fallback: true,
  };
}

export default Post;
