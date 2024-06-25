import React, { memo } from 'react';

import * as S from './styles';

type Props = {
  Icon: () => JSX.Element;
  title: string;
};

export const ListEmptyCard = memo(({ Icon, title }: Props) => {
  return (
    <S.Container>
      <Icon />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
});
