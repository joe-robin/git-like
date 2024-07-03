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
