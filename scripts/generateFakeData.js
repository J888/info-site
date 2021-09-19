const fs = require("fs");
const faker = require("faker");

const [outPath, numPosts] = process.argv.slice(2);

let posts = [];
for (let i = 0; i < numPosts; i++) {
  let tags = [];
  for (let j = 0; j < 6; j++) {
    tags.push(faker.lorem.word());
  }

  posts.push({
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5ec3f9ec664a4a3e7be69928/1592412046459-EUC3FSLII7A9H9OEH044/sinkland-farms-christiansburg-va-pumpkin-festival-portrait-sessions-02-024-edited.jpg?format=2500w",
    title: faker.lorem.sentence(),
    id: `${i + 1}-${faker.lorem
      .words(5)
      .substring(1, 20)
      .trim()
      .replaceAll(" ", "-")}`,
    subTitle: faker.lorem.words(6),
    description: faker.lorem.words(10),
    markdown: faker.lorem.paragraphs(10, "</br>"),
    createdAt: faker.date.recent().toLocaleString(),
    tags: tags,
  });
}

fs.writeFileSync(outPath, JSON.stringify(posts, null, 2));
