import { memo } from 'react';
import { IconX } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type Props = {
  questionName: string;
  questionResponse: string;
  answers: TAnswerType[];
  onRespond: (answer: string) => void;
};

export const Question = memo(
  ({ questionName, questionResponse, answers, onRespond }: Props) => {
    const theme = useTheme();

    return (
      <S.Container>
        <S.Title>{questionName}</S.Title>
        <S.ResponsesContainer>
          {answers.map(answer => (
            <S.Response key={answer.id}>
              <S.ResponseText isSelected={questionResponse === answer.id}>
                {answer.nome}
              </S.ResponseText>
              <S.ResponseButton
                isSelected={questionResponse === answer.id}
                onPress={() => onRespond(answer.id)}
              >
                {questionResponse === answer.id && (
                  <IconX
                    stroke={1.5}
                    size={theme.iconSizes.xs}
                    color={theme.colors.textSecondary}
                  />
                )}
              </S.ResponseButton>
            </S.Response>
          ))}
        </S.ResponsesContainer>
      </S.Container>
    );
  },
);
