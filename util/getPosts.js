import { promises as fs } from 'fs'
import path from 'path'
import YAML from 'js-yaml'

const getPosts = async (baseDir) => {
  let postDirs = await fs.readdir(baseDir);
  postDirs = postDirs.filter(pd => pd != '.DS_Store')
  let posts = []
  for (let i = 0; i < postDirs.length; i++) {
    let dir = postDirs[i];
    let composeFile = await fs.readFile(`${baseDir}/${dir}/compose.yml`)
    let compose = YAML.load(composeFile);
    let metadata = compose.metadata
    let parts = compose.parts // this is where a mix of md and images are defined

    metadata.parts = []
    for (let j = 0; j < parts.length; j++) {
      let part = parts[j];
      if (part.type == 'MARKDOWN') {
        let fileContents = await (await fs.readFile(`${baseDir}/${dir}/${part.fileName}`)).toString()
        metadata.parts.push({
          type: 'MARKDOWN',
          fileContents
        });
      } else if (part.type == 'IMAGE') {
        metadata.parts.push({
          type: 'IMAGE',
          url: part.url
        });
      }
    }
    posts.push(metadata)
  }
  return posts;
}

export default getPosts;
