import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export default function RowSkeleton({ cells }: { cells: number }) {
  return (
    <TableRow>
      {Array.from({ length: cells }).map((_, index) => (
        <TableCell key={index} className="hidden md:table-cell">
          <Skeleton className='w-full h-10'/>
        </TableCell>
      ))}
    </TableRow>
  );
}
