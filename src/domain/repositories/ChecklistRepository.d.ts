interface IChecklistRepository {
  getAllChecklists(params: TGetChecklistsParams): Promise<{
    toDoChecklists: TChecklist[];
    doneChecklists: TChecklist[];
  }>;
  getChecklistQuestions(
    params: TGetChecklistQuestionsParams,
  ): Promise<TChecklistQuestion[]>;
  getAnswersTypes(params: TGetAnswersTypesParams): Promise<TAnswerType[]>;
  saveChecklist(params: TSaveChecklistParams): Promise<void>;
}
