import { convertBlocksToMarkdown, fetchPageById, fetchPageByIdRequest, fetchPageContent, fetchPagesInDatabase, getPropValueFromPage } from 'ts-notion-client';
import { NotionBlock, NotionPageObject, NotionPropertyType } from 'ts-notion-client/dist/types';
import { Post } from './types';

import cors from 'cors';
import express, { Request, RequestHandler, Response } from 'express';
import morgan from 'morgan';

const blogService = express();

blogService.use(express.json());
blogService.use(express.urlencoded({ extended: true }));
blogService.use(cors({origin: true}));
blogService.use(morgan('tiny'));

const notionApiKey = process.env.NOTION_API_KEY ?? '';
const blogDbId = process.env.NOTION_BLOG_DB_ID ?? '';

blogService.get('/', (async (req: Request, res: Response) => {
  const posts: Post[] = [];
  const pages: NotionPageObject[] = await fetchPagesInDatabase(notionApiKey, blogDbId);

  for (let page of pages) {

    const isPublished = ('true' === getPropValueFromPage(page, NotionPropertyType.checkbox, 'Published'));

    if (isPublished) {
      posts.push({
        id: page.id,
        title: getPropValueFromPage(page, NotionPropertyType.title, 'Title'),
        published: isPublished,
        pinned: ('true' === getPropValueFromPage(page, NotionPropertyType.checkbox, 'Pinned')),
        updatedAt: getPropValueFromPage(page, NotionPropertyType.last_edited_time, 'Last edited time'),
        caption: getPropValueFromPage(page, NotionPropertyType.rich_text, 'Caption'),
        tags: getPropValueFromPage(page, NotionPropertyType.multi_select, 'Tags').split(','),
        createdAt: getPropValueFromPage(page, NotionPropertyType.created_time, 'Created time')
      });
    }
  }

  res.json(posts);
}) as RequestHandler);

blogService.get('/:id', (async (req: Request, res: Response) => {
  const postId = req.params.id;

  const page: NotionPageObject = await fetchPageById(notionApiKey, postId);

  const isPublished = ('true' === getPropValueFromPage(page, NotionPropertyType.checkbox, 'Published'));
  if (!isPublished) {
    res.json({});
    return;
  }

  const post: Post = {
    id: page.id,
    title: getPropValueFromPage(page, NotionPropertyType.title, 'Title'),
    published: isPublished,
    pinned: ('true' === getPropValueFromPage(page, NotionPropertyType.checkbox, 'Pinned')),
    updatedAt: getPropValueFromPage(page, NotionPropertyType.last_edited_time, 'Last edited time'),
    caption: getPropValueFromPage(page, NotionPropertyType.rich_text, 'Caption'),
    tags: getPropValueFromPage(page, NotionPropertyType.multi_select, 'Tags').split(','),
    createdAt: getPropValueFromPage(page, NotionPropertyType.created_time, 'Created time')
  }

  res.json(post);
}) as RequestHandler);

blogService.get('/:id/content', (async (req: Request, res: Response) => {
  const postId = req.params.id;

  const postContent: NotionBlock[] = await fetchPageContent(notionApiKey, postId);

  res.json({
    content: convertBlocksToMarkdown(postContent)
  });
}) as RequestHandler);

blogService.listen(3001, () => {
  console.log(`blog-service is listening on port 3001...`);
});

exports.blogService = blogService;
