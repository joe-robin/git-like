import { octokit } from '@/lib/octokit';
import { hunkGen } from '@/utils/hunkGen';
import { RequestError } from 'octokit';

type UrlParams = { owner: string; repository: string; oid: string };
export async function GET(req: Request, { params }: { params: UrlParams }) {
  try {
    // Get the previous commit
    const { oid, owner, repository } = params;
    const commitRes = await octokit.rest.git.getCommit({
      owner,
      repo: repository,
      commit_sha: oid,
    });

    /**@todo handle the case where the parent is not available */
    const [firstParent] = commitRes.data.parents;

    // Compare with the first parent commit
    const res = await octokit.rest.repos.compareCommits({
      owner,
      repo: repository,
      base: firstParent.sha,
      head: oid,
    });

    const { files } = res.data;
    const response: Diff = files?.map(item => ({
      status: item.status,
      hunks: hunkGen(item.patch),
      fileNames: item.filename,
      previousFileName: item.previous_filename,
      data: files,
    }));

    return Response.json(response);
  } catch (error) {
    /**@todo handle more error cases & we should send specific errors  */
    if (error instanceof RequestError) {
      return Response.json(error.response?.data);
    } else {
      console.log(error);
      return new Response('Unknow Error Occured', { status: 500 });
    }
  }
}
