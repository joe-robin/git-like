type Line = {
  baseLineNumber: number | null;
  headLineNumber: number | null;
  content: string;
};

type Hunk = {
  header: string;
  baseLineNumber: number;
  headLineNumber: number;
  lines: Line[];
};

type Diff =
  | {
      status:
        | 'added'
        | 'removed'
        | 'modified'
        | 'renamed'
        | 'copied'
        | 'changed'
        | 'unchanged';
      hunks?: Hunk[];
      fileNames: string;
      previousFileName?: string;
    }[]
  | undefined;

type Auther = {
  date: string;
  email: string;
  name: string;
};

type Commit = {
  sha: string;
  message: strning;
  author: Auther;
  committer: string;
  parents: string;
};
