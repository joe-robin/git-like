import axios from 'axios';

export async function getDiff(
  owner: string,
  repository: string,
  commitSHA: string
) {
  const response = await axios.get<Diff>(
    `/api/repositories/${owner}/${repository}/commit/${commitSHA}/diff`
  );
  return response.data;
}

export async function getCommit(
  owner: string,
  repository: string,
  commitSHA: string
) {
  const response = await axios.get<Commit>(
    `/api/repositories/${owner}/${repository}/commit/${commitSHA}`
  );
  return response.data;
}
