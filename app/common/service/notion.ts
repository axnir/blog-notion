import { PostCover } from './../types/notion';
import to from 'await-to-js';
import {
  getPostCoverForPage,
  getPostTitleForPage,
  getPostIdForDatabase,
  getPostTagsForDatabase,
  getPostStatusForDatabase,
  getPostDescriptionForDatabase,
  getImageSize,
} from '@/app/common/utils/notion';
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { PostListItem } from '../types/notion';

const AUTHORIZATION = process.env.AUTHORIZATION!;
const NOTION_VERSION = process.env.NOTION_VERSION!;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

const NOTION_HEADER = {
  Authorization: AUTHORIZATION,
  'Content-Type': 'application/json',
  'Notion-Version': NOTION_VERSION,
};

export const getPostInfo = async (pageId: string, needCover = false) => {
  if (!pageId) {
    throw new Error('pageId is required');
  }

  const [error, response] = await to(
    fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: 'GET',
      headers: NOTION_HEADER,
    })
  );

  if (error) {
    throw new Error(error.message);
  }

  const result = await response.json();
  if (result.object === 'error') {
    throw new Error(result.message);
  }

  const cover: PostCover = {} as PostCover;
  if (needCover) {
    const url = getPostCoverForPage(result);
    const { height, width } = await getImageSize(url);
    cover.url = url;
    cover.height = height;
    cover.width = width;
  }

  return {
    cover,
    createTime: result.created_time,
    title: getPostTitleForPage(result),
  };
};

export const getPostContent = async (
  pageId: string
): Promise<PageObjectResponse> => {
  const [error, response] = await to(
    fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, {
      method: 'GET',
      headers: NOTION_HEADER,
    })
  );

  if (error) {
    throw new Error(error.message);
  }

  const result = await response.json();

  if (result.object === 'error') {
    throw new Error(result.message);
  }

  return result;
};

export const getPostList = async (): Promise<PostListItem[]> => {
  const [databaseError, databaseResponse] = await to(
    fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: NOTION_HEADER,
    })
  );

  if (databaseError) {
    throw new Error(databaseError.message);
  }

  const result = (await databaseResponse.json()) as QueryDatabaseResponse;
  if (!result.results.length) {
    throw new Error('Database is empty');
  }

  const databasePosts = (result.results as PageObjectResponse[]).map((post) => {
    const postProperties = post.properties;
    return {
      id: getPostIdForDatabase(postProperties),
      tags: getPostTagsForDatabase(postProperties),
      status: getPostStatusForDatabase(postProperties),
      description: getPostDescriptionForDatabase(postProperties),
    };
  });
  const [postsError, postsResult] = await to(
    Promise.all(databasePosts.map((post) => getPostInfo(post.id!)))
  );

  if (postsError) {
    throw new Error(postsError.message);
  }

  return postsResult.map((post, i) => ({
    ...post,
    ...databasePosts[i],
  }));
};
