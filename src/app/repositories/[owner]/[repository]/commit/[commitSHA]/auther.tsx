import { getCommit } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export default function Auther({
  owner,
  repository,
  commitSHA,
}: {
  owner: string;
  repository: string;
  commitSHA: string;
}) {
  const { data } = useQuery({
    queryKey: ['commit'],
    queryFn: async () => getCommit(owner, repository, commitSHA),
    staleTime: Infinity,
  });

  return (
    <div>
      <div className='text-[#39496A] text-base font-bold'>{data?.message}</div>
      <div>
        Authered by <span>{data?.author.name}</span>
      </div>
    </div>
  );
}
