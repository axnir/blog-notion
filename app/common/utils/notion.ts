import { PostStatus, PostTitleInfo } from '@/app/common/types/notion';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

type PageObjectProperties = PageObjectResponse['properties'];

export const getPostIdForDatabase = (properties: PageObjectProperties) => {
  let id: string = '';

  if (properties['Page'].type !== 'rich_text') {
    return id;
  }

  const richTexts = properties['Page']['rich_text'];

  for (let i = 0; i < richTexts.length; i++) {
    const richText = richTexts[i];
    if (richText.type === 'mention' && richText.mention.type === 'page') {
      id = richText.mention.page.id;
      break;
    }
  }

  return id;
};

export const getPostDescriptionForDatabase = (
  properties: PageObjectProperties
) => {
  if (properties['Description'].type !== 'rich_text') {
    return '';
  }

  if (properties['Description'].rich_text) {
    return properties['Description'].rich_text[0].plain_text;
  }

  return '';
};

export const getPostTagsForDatabase = (properties: PageObjectProperties) => {
  if (properties['Tags'].type !== 'multi_select') {
    return [];
  }

  return properties['Tags']['multi_select'].map((tag) => tag.name);
};

export const getPostStatusForDatabase = (properties: PageObjectProperties) => {
  if (properties['Status'].type !== 'status') {
    return PostStatus.NOT_STARTED;
  }

  return properties['Status']['status']?.name ?? PostStatus.NOT_STARTED;
};

export const getPostCoverForPage = (page: PageObjectResponse) => {
  if (!page.cover) {
    return '';
  }
  if (page.cover.type === 'external') {
    return page.cover.external.url;
  }
  return page.cover.file.url;
};

export const getPostTitleInfoForPage = (page: PageObjectResponse) => {
  if (!page.icon && !page.properties.title) {
    return {} as PostTitleInfo;
  }

  const titleInfo: PostTitleInfo = {} as PostTitleInfo;

  titleInfo.type = page.icon?.type;

  if (page.icon?.type === 'emoji') {
    titleInfo.icon = page.icon.emoji;
  } else if (page.icon?.type === 'external') {
    titleInfo.icon = page.icon.external.url;
  } else if (page.icon?.type === 'file') {
    titleInfo.icon = page.icon.file.url;
  }

  if (
    page.properties.title &&
    page.properties.title.type === 'title' &&
    page.properties.title.title[0]
  ) {
    titleInfo.text = page.properties.title.title[0].plain_text;
  }

  return titleInfo;
};
