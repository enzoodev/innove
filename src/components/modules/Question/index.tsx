import { memo } from 'react';
import { IconX } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import {
  TSaveChecklistQuestionSchema,
  TSaveChecklistSchema,
} from '@/app/schemas/checklist/saveChecklistSchema';
import { ListSeparators } from '@/app/utils/ListSeparators';

import { Label } from '@/components/elements/Label';
import { Input } from '@/components/elements/Input';
import { QuestionPhoto } from '@/components/modules/QuestionPhoto';

import * as S from './styles';

type Props = {
  control: Control<TSaveChecklistSchema>;
  errors: FieldErrors<TSaveChecklistSchema>;
  sectionIndex: number;
  questionIndex: number;
  question: TSaveChecklistQuestionSchema;
  answers: TAnswerType[];
  onRespond: (answer: string) => void;
  onSetPhoto: (photoUri: string) => void;
  onDeletePhoto: (photoIndex: number) => void;
};

export const Question = memo(
  ({
    control,
    errors,
    sectionIndex,
    questionIndex,
    question,
    answers,
    onRespond,
    onSetPhoto,
    onDeletePhoto,
  }: Props) => {
    const theme = useTheme();

    return (
      <S.Container>
        <S.Title>{question.name}</S.Title>
        <S.ResponsesContainer>
          {answers.map(answer => (
            <S.Response key={answer.id}>
              <S.ResponseText isSelected={question.idanswerstype === answer.id}>
                {answer.nome}
              </S.ResponseText>
              <S.ResponseButton
                isSelected={question.idanswerstype === answer.id}
                onPress={() => onRespond(answer.id)}
              >
                {question.idanswerstype === answer.id && (
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
        {question.idanswerstype === '2' && (
          <S.JustificationsContainer>
            <Controller
              control={control}
              name={`sections.${sectionIndex}.questions.${questionIndex}.comments`}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Label title="Justificativa">
                  <Input
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    formError={
                      errors.sections?.[sectionIndex]?.questions?.[
                        questionIndex
                      ]?.comments?.message
                    }
                    placeholder="Justificativa"
                    onBlur={onBlur}
                  />
                </Label>
              )}
            />
            <S.PhotosWrapper horizontal showsHorizontalScrollIndicator={false}>
              {question.photos.map((photo, index, array) => (
                <QuestionPhoto
                  key={photo.photoUri}
                  uri={photo.photoUri}
                  index={index}
                  isLastItem={ListSeparators.getIsLastItem(index, array)}
                  setPhoto={onSetPhoto}
                  deletePhoto={() => onDeletePhoto(index)}
                />
              ))}
            </S.PhotosWrapper>
          </S.JustificationsContainer>
        )}
      </S.Container>
    );
  },
);
