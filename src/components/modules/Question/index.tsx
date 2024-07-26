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

import { classifications } from '@/app/utils/constants/classifications';
import * as S from './styles';

type Props = {
  control: Control<TSaveChecklistSchema>;
  errors: FieldErrors<TSaveChecklistSchema>;
  sectionIndex: number;
  questionIndex: number;
  question: TSaveChecklistQuestionSchema;
  answers: TAnswerType[];
  onRespond: (answer: string) => void;
  onClassificate: (classification: string) => void;
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
    onClassificate,
    onSetPhoto,
    onDeletePhoto,
  }: Props) => {
    const theme = useTheme();

    return (
      <S.Container>
        <S.ResponsesContainerWrapper>
          <S.Title>{question.name}</S.Title>
          <S.ResponsesContainer>
            {answers.map(answer => (
              <S.Response
                key={answer.id}
                disabled={question.idanswerstype === answer.id}
                onPress={() => onRespond(answer.id)}
              >
                <S.ResponseButton
                  isSelected={question.idanswerstype === answer.id}
                  disabled={question.idanswerstype === answer.id}
                  onPress={() => onRespond(answer.id)}
                >
                  {question.idanswerstype === answer.id && (
                    <IconX
                      stroke={2.5}
                      size={theme.iconSizes.xs}
                      color={theme.colors.textSecondary}
                    />
                  )}
                </S.ResponseButton>
                <S.ResponseText
                  isSelected={question.idanswerstype === answer.id}
                >
                  {answer.nome}
                </S.ResponseText>
              </S.Response>
            ))}
          </S.ResponsesContainer>
        </S.ResponsesContainerWrapper>
        {question.idanswerstype === '2' && (
          <S.NonConformingContainer>
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
              <Label title="Classificação">
                <S.ClassificationsContainer>
                  {classifications.map(item => (
                    <S.Classification
                      key={item.value}
                      disabled={question.idclassification === item.value}
                      onPress={() => onClassificate(item.value)}
                    >
                      <S.ResponseButton
                        isSelected={question.idclassification === item.value}
                        disabled={question.idclassification === item.value}
                        onPress={() => onClassificate(item.value)}
                      >
                        {question.idclassification === item.value && (
                          <IconX
                            stroke={2.5}
                            size={theme.iconSizes.xs}
                            color={theme.colors.textSecondary}
                          />
                        )}
                      </S.ResponseButton>
                      <S.ResponseText
                        isSelected={question.idclassification === item.value}
                      >
                        {item.label}
                      </S.ResponseText>
                    </S.Classification>
                  ))}
                </S.ClassificationsContainer>
              </Label>
            </S.JustificationsContainer>
            <S.PhotosWrapper horizontal showsHorizontalScrollIndicator={false}>
              {question.photos.map((photo, index, array) => (
                <QuestionPhoto
                  key={(index + 1).toString()}
                  uri={photo.photoUri}
                  index={index}
                  isLastItem={ListSeparators.getIsLastItem(index, array)}
                  setPhoto={onSetPhoto}
                  deletePhoto={() => onDeletePhoto(index)}
                />
              ))}
            </S.PhotosWrapper>
          </S.NonConformingContainer>
        )}
      </S.Container>
    );
  },
);
