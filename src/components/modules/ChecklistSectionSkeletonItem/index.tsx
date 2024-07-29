import { memo } from 'react';

import * as S from './styles';

export const ChecklistSectionSkeletonItem = memo(() => {
  return (
    <S.Container>
      <S.Title />
    </S.Container>
  );
});
