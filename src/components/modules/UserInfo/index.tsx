import { memo } from 'react';

import * as S from './styles';

type Props = {
  Icon: () => JSX.Element;
  label: string;
  title?: string;
};

export const UserInfo = memo(({ Icon, title, label }: Props) => {
  if (!title) {
    return null;
  }

  return (
    <S.Container>
      <S.IconWrapper>
        <Icon />
      </S.IconWrapper>
      <S.Content>
        <S.InfoLabel>{label}</S.InfoLabel>
        <S.InfoValue>{title}</S.InfoValue>
      </S.Content>
    </S.Container>
  );
});
