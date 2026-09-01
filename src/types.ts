export interface Chapter {
  id: string;
  title: string;
  slug: string;
  content: string;
}

export interface Module {
  id: string;
  title: string;
  chapters: Chapter[];
}
