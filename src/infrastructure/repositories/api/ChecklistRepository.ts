/* eslint-disable no-useless-constructor */

export class ChecklistRepository implements IChecklistRepository {
  constructor(private baseRepository: IBaseRepository) {}

  private async getToDoChecklists(
    params: TGetChecklistsParams,
  ): Promise<TChecklist[]> {
    const response = await this.baseRepository.getAll<TChecklistDTO>({
      url: 'checklisttodo',
      params,
    });

    return response.map(item => ({
      ...item,
      status: 0,
    }));
  }

  private async getDoneChecklists(
    params: TGetChecklistsParams,
  ): Promise<TChecklist[]> {
    const response = await this.baseRepository.getAll<TChecklistDTO>({
      url: 'checklistdone',
      params,
    });

    return response.map(item => ({
      ...item,
      status: 1,
    }));
  }

  public async getAllChecklists(params: TGetChecklistsParams) {
    const [toDoChecklists, doneChecklists] = await Promise.all([
      this.getToDoChecklists(params),
      this.getDoneChecklists(params),
    ]);

    return {
      toDoChecklists,
      doneChecklists,
    };
  }

  public async getChecklistQuestions(params: TGetChecklistQuestionsParams) {
    return this.baseRepository.getAll<TChecklistQuestion>({
      url: 'checklist',
      params,
    });
  }

  public async getAnswersTypes(params: TGetAnswersTypesParams) {
    return this.baseRepository.getAll<TAnswerType>({
      url: 'answerstypes',
      params,
    });
  }

  public async saveChecklist(params: TSaveChecklistParams) {
    await this.baseRepository.create({
      url: 'savechecklist',
      data: params,
    });
  }
}
