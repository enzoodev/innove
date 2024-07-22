import { memo } from 'react';
import { TSaveChecklistSectionSchema } from '@/app/schemas/checklist/saveChecklistSchema';

type Props = {
  section: TSaveChecklistSectionSchema;
};

export const ChecklistSection = memo(({ section }: Props) => {
  return <div>ChecklistSection</div>;
});
