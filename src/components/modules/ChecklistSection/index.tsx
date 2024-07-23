import { memo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { IconChevronDown } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { TSaveChecklistSectionSchema } from '@/app/schemas/checklist/saveChecklistSchema';

import { CollapsableContainer } from '@/components/elements/CollapsableContainer';
import { IconButton } from '@/components/elements/IconButton';
import { Question } from '@/components/modules/Question';

import * as S from './styles';

type Props = {
  section: TSaveChecklistSectionSchema;
  answers: TAnswerType[];
  onOpenSection: () => void;
  onRespond: (questionIndex: number, answer: string) => void;
};

export const ChecklistSection = memo(
  ({ section, answers, onOpenSection, onRespond }: Props) => {
    const theme = useTheme();

    return (
      <S.Container isOpen={section.isOpen}>
        <TouchableWithoutFeedback onPress={onOpenSection}>
          <S.Header>
            <S.Title>{section.subtitle}</S.Title>
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
            {section.questions.map((question, index) => (
              <Question
                key={question.idquestion}
                name={question.name}
                response={question.idanswerstype}
                answers={answers}
                onRespond={answer => onRespond(index, answer)}
              />
            ))}
          </S.QuestionsContainer>
        </CollapsableContainer>
      </S.Container>
    );
  },
);
