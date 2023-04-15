export const enum PostStatus {
  DONE = 'Done',
  IN_PROGRESS = 'In progress',
  NOT_STARTED = 'Not started',
}

export type PostTitleInfo = {
  icon?: string;
  text?: string;
  type?: 'emoji' | 'external' | 'file';
};

export type PostListItem = {
  id: string;
  tags: string[];
  status: string;
  description: string;
  createTime: string;
  cover: string;
  titleInfo: PostTitleInfo;
};
