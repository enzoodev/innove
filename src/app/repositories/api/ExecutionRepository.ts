import { BaseRepository } from './shared/BaseRepository';

export class ExecutionRepositoryClass extends BaseRepository {
  async getExecutions() {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return super.get<GetExecuntionsResponse>({
      url: 'execution',
    });
  }

  async finishExecution(params: TFinishExecutionParams) {
    await super.create({
      url: 'endexecution',
      data: params,
    });
  }
}

export const ExecutionRepository = new ExecutionRepositoryClass();
