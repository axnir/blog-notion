export const enum PostStatus {
  DONE = 'Done',
  IN_PROGRESS = 'In progress',
  NOT_STARTED = 'Not started',
}

export type PostTitle = {
  icon?: string;
  text?: string;
  type?: 'emoji' | 'external' | 'file';
};

export type PostCover = {
  url: string;
  height?: number;
  width?: number;
};

export type PostListItem = {
  id: string;
  tags: string[];
  status: string;
  description: string;
  createTime: string;
  cover: PostCover;
  title: PostTitle;
};
