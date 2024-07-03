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
