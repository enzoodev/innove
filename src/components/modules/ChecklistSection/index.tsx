import { memo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Control, FieldErrors } from 'react-hook-form';
import { IconChevronDown } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import {
  TSaveChecklistSchema,
  TSaveChecklistSectionSchema,
} from '@/app/schemas/checklist/saveChecklistSchema';

import { CollapsableContainer } from '@/components/elements/CollapsableContainer';
import { IconButton } from '@/components/elements/IconButton';
import { Question } from '@/components/modules/Question';

import * as S from './styles';

type Props = {
  control: Control<TSaveChecklistSchema>;
  errors: FieldErrors<TSaveChecklistSchema>;
  index: number;
  section: TSaveChecklistSectionSchema;
  answers: TAnswerType[];
  onOpenSection: () => void;
  onRespond: (questionIndex: number, answer: string) => void;
  onClassificate: (questionIndex: number, classification: string) => void;
  onSetPhoto: (questionIndex: number, photoUri: string) => void;
  onDeletePhoto: (questionIndex: number, photoIndex: number) => void;
};

export const ChecklistSection = memo(
  ({
    control,
    errors,
    index,
    section,
    answers,
    onOpenSection,
    onRespond,
    onClassificate,
    onSetPhoto,
    onDeletePhoto,
  }: Props) => {
    const theme = useTheme();

    return (
      <S.Container isOpen={section.isOpen}>
        <TouchableWithoutFeedback
          onPress={onOpenSection}
          disabled={section.isOpen}
        >
          <S.Header isOpen={section.isOpen}>
            <S.Title isOpen={section.isOpen}>{section.subtitle}</S.Title>
            {!section.isOpen && (
              <IconButton
                onPress={onOpenSection}
                Icon={() => (
                  <IconChevronDown
                    stroke={1.5}
                    size={theme.iconSizes.sm}
                    color={theme.colors.textSecondary}
                  />
                )}
              />
            )}
          </S.Header>
        </TouchableWithoutFeedback>
        <CollapsableContainer isExpanded={section.isOpen}>
          <S.QuestionsContainer>
            {section.questions.map((question, questionIndex) => (
              <Question
                key={question.idquestion}
                control={control}
                errors={errors}
                sectionIndex={index}
                questionIndex={questionIndex}
                question={question}
                answers={answers}
                onRespond={answer => onRespond(questionIndex, answer)}
                onClassificate={classification =>
                  onClassificate(questionIndex, classification)
                }
                onSetPhoto={photoUri => onSetPhoto(questionIndex, photoUri)}
                onDeletePhoto={photoIndex =>
                  onDeletePhoto(questionIndex, photoIndex)
                }
              />
            ))}
          </S.QuestionsContainer>
        </CollapsableContainer>
      </S.Container>
    );
  },
);
