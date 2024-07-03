export function hunkGen(patch?: string): Hunk[] | undefined {
  if (!patch) return;

  const lines = patch.split('\n');
  const hunks: Hunk[] = [];
  let currentHunk: Hunk | null = null;

  lines.forEach(line => {
    if (line.startsWith('@@')) {
      // If there is a current hunk, push it to the hunks array
      if (currentHunk) {
        hunks.push(currentHunk);
      }

      // Create a new hunk
      currentHunk = {
        header: line,
        baseLineNumber: parseInt(line.split(' ')[1].split(',')[0].substring(1)),
        headLineNumber: parseInt(line.split(' ')[2].split(',')[0].substring(1)),
        lines: [],
      };
    } else if (currentHunk) {
      // Add line to the current hunk
      const lineObj: Line = {
        baseLineNumber: line.startsWith('+')
          ? null
          : currentHunk.baseLineNumber,
        headLineNumber: line.startsWith('-')
          ? null
          : currentHunk.headLineNumber,
        content: line,
      };

      // Adjust line numbers based on the type of line
      if (!line.startsWith('-')) currentHunk.headLineNumber++;
      if (!line.startsWith('+')) currentHunk.baseLineNumber++;

      currentHunk.lines.push(lineObj);
    }
  });

  // Push the last hunk if it exists
  if (currentHunk) {
    hunks.push(currentHunk);
  }

  return hunks;
}
