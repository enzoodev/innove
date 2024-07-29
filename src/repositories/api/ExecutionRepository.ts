import { BaseRepository } from './shared/BaseRepository';

export class ExecutionRepository extends BaseRepository {
  public static async getExecutions() {
    return super.get<GetExecuntionsResponse>({
      url: 'execution',
    });
  }

  public static async startExecution(
    params: TStartExecutionParams,
  ): Promise<TExecution | undefined> {
    const { idExecution } = await super.create<{ idExecution: number }>({
      url: 'startexecution',
      data: params,
    });

    const updatedExecutions = await this.getExecutions();
    const execution = updatedExecutions['em andamento']?.find(
      item => item.id === idExecution,
    );

    return execution;
  }

  public static async finishExecution(params: TFinishExecutionParams) {
    await super.create({
      url: 'endexecution',
      data: params,
    });
  }
}
