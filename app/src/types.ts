export type LoaderPayload = {
  Enabled: boolean;
  Progress?: number;
};

export type Post = {
  id: string;
  title: string;
  caption: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pinned: string;
  published: string;
}
