'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { getDiff } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Fragment } from 'react';
import { z } from 'zod';
import Auther from './auther';

export default function Page() {
  const params = useParams();

  const { owner, repository, commitSHA } = z
    .object({
      owner: z.string(),
      repository: z.string(),
      commitSHA: z.string(),
    })
    .parse(params);

  const { data, isLoading } = useQuery({
    queryKey: ['git-diff'],
    queryFn: async () => getDiff(owner, repository, commitSHA),
    staleTime: Infinity,
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='bg-white pt-8'>
      <Auther owner={owner} repository={repository} commitSHA={commitSHA} />
      {data?.map((item, idx) => {
        return (
          <Accordion key={idx} type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-[#1C7CD6] text-sm'>
                {item.fileNames}
              </AccordionTrigger>
              <AccordionContent>
                <table>
                  <tbody>
                    {item.hunks &&
                      item.hunks.map((hunk, idx) => (
                        <Fragment key={idx}>
                          <tr>
                            <td
                              align='left'
                              colSpan={3}
                              className='text-[#6D84B0] text-xs px-2 py-1'
                            >
                              {hunk.header}
                            </td>
                          </tr>
                          {hunk.lines.map((line, idx) => (
                            <tr
                              key={idx}
                              className={cn(
                                line.content.startsWith('+') && 'bg-[#d8ffcb]',
                                line.content.startsWith('-') && 'bg-[#ffe4e9]'
                              )}
                            >
                              <td
                                align='right'
                                className='text-[#6078A9] text-xs leading-5 pl-5'
                              >
                                {line.baseLineNumber}
                              </td>
                              <td
                                align='right'
                                className='text-[#6078A9] text-xs leading-5 pl-5'
                              >
                                {line.headLineNumber}
                              </td>
                              <td className='text-[#657B83] text-xs leading-5 pl-5'>{`${line.content}`}</td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}
