
export interface Projects {
  id: string;
  title: string;
  link: string | null;
  description: string;
  image: string | null;
  techStacks: { id: string; name: string }[];
}

export interface Blog {
    title: string;
    excerpt:string;
    date:string;
    readTime: string;
    demoLink: string;
    slug:string;
}