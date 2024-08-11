/* eslint-disable no-useless-constructor */

export class ExecutionRepository implements IExecutionRepository {
  constructor(private baseRepository: IBaseRepository) {}

  public async getExecutions() {
    return this.baseRepository.get<GetExecuntionsResponse>({
      url: 'execution',
    });
  }

  public async startExecution(
    params: TStartExecutionParams,
  ): Promise<TExecution | undefined> {
    const { idExecution } = await this.baseRepository.create<{
      idExecution: number;
    }>({
      url: 'startexecution',
      data: params,
    });

    const updatedExecutions = await this.getExecutions();
    const execution = updatedExecutions['em andamento']?.find(
      item => item.id === idExecution,
    );

    return execution;
  }

  public async finishExecution(params: TFinishExecutionParams) {
    await this.baseRepository.create({
      url: 'endexecution',
      data: params,
    });
  }
}
