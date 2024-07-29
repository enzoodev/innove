import { BaseRepository } from './shared/BaseRepository';

export class ChecklistRepository extends BaseRepository {
  public static async getToDoChecklists(
    params: TGetChecklistsParams,
  ): Promise<TChecklist[]> {
    const response = await super.getAll<TChecklistDTO>({
      url: 'checklisttodo',
      params,
    });

    return response.map(item => ({
      ...item,
      status: 0,
    }));
  }

  public static async getDoneChecklists(
    params: TGetChecklistsParams,
  ): Promise<TChecklist[]> {
    const response = await super.getAll<TChecklistDTO>({
      url: 'checklistdone',
      params,
    });

    return response.map(item => ({
      ...item,
      status: 1,
    }));
  }

  public static async getAllChecklists(params: TGetChecklistsParams) {
    const [toDoChecklists, doneChecklists] = await Promise.all([
      this.getToDoChecklists(params),
      this.getDoneChecklists(params),
    ]);

    return {
      toDoChecklists,
      doneChecklists,
    };
  }

  public static async getChecklistQuestions(
    params: TGetChecklistQuestionsParams,
  ) {
    return super.getAll<TChecklistQuestion>({
      url: 'checklist',
      params,
    });
  }

  public static async getAnswersTypes(params: TGetAnswersTypesParams) {
    return super.getAll<TAnswerType>({
      url: 'answerstypes',
      params,
    });
  }

  public static async saveChecklist(params: TSaveChecklistParams) {
    return super.create({
      url: 'savechecklist',
      data: params,
    });
  }
}
