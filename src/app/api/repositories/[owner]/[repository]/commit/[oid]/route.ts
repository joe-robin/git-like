import { octokit } from '@/lib/octokit';
import { RequestError } from 'octokit';

// Could have done - Handled error better
type UrlParams = { owner: string; repository: string; oid: string };
export async function GET(req: Request, { params }: { params: UrlParams }) {
  try {
    const { oid, owner, repository } = params;
    const res = await octokit.rest.git.getCommit({
      owner,
      repo: repository,
      commit_sha: oid,
    });

    const { sha, message, author, committer, parents: parentsData } = res.data;
    const parents = parentsData.map(item => ({
      sha: item.sha,
    }));
    return Response.json({
      sha,
      message,
      author,
      committer,
      parents,
    });
  } catch (error) {
    if (error instanceof RequestError) {
      return Response.json(error.response?.data);
    } else return new Response('Unknow Error Occured', { status: 500 });
  }
}
