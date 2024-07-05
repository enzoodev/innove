import { memo } from 'react';

import * as S from './styles';

export const ChecklistSkeletonItem = memo(() => {
  return (
    <S.Container>
      <S.Icon />
      <S.Content>
        <S.Title />
        <S.Text />
        <S.Text />
      </S.Content>
    </S.Container>
  );
});
