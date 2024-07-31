import { memo } from 'react';

import { formatLocationAddressLabel } from '@/utils/formatLocationAddressLabel';

import * as S from './styles';

type Props = {
  data: TExecution;
};

export const ExecutionDetailsResume = memo(({ data }: Props) => {
  const address = formatLocationAddressLabel(data.detalhes.address?.[0]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>{data.detalhes.nome}</S.Title>
      </S.Header>
      <S.InfoContentWrapper>
        <S.InfoWrapper>
          <S.InfoLabel>Tipo:</S.InfoLabel>
          <S.InfoTitle>{data.tipo.name}</S.InfoTitle>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.InfoLabel>Status:</S.InfoLabel>
          <S.InfoTitle>{data.status}</S.InfoTitle>
        </S.InfoWrapper>
        {data.detalhes.cnpj && (
          <S.InfoWrapper>
            <S.InfoLabel>CNPJ:</S.InfoLabel>
            <S.InfoTitle>{data.detalhes.cnpj}</S.InfoTitle>
          </S.InfoWrapper>
        )}
        {data.detalhes.razaosocial && (
          <S.InfoWrapper>
            <S.InfoLabel>Razão social:</S.InfoLabel>
            <S.InfoTitle>{data.detalhes.razaosocial}</S.InfoTitle>
          </S.InfoWrapper>
        )}
        {data.detalhes.datestart && (
          <S.InfoWrapper>
            <S.InfoLabel>Data de início:</S.InfoLabel>
            <S.InfoTitle>{data.detalhes.datestart}</S.InfoTitle>
          </S.InfoWrapper>
        )}
        {address && (
          <S.InfoWrapper>
            <S.InfoLabel>Endereço:</S.InfoLabel>
            <S.InfoTitle>{address}</S.InfoTitle>
          </S.InfoWrapper>
        )}
      </S.InfoContentWrapper>
    </S.Container>
  );
});
