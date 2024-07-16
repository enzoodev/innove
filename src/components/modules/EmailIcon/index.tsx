import { memo } from 'react';

import * as S from './styles';

type Props = {
  Icon: () => JSX.Element;
};

export const EmailIcon = memo(({ Icon }: Props) => {
  return (
    <S.Container>
      <Icon />
    </S.Container>
  );
});
