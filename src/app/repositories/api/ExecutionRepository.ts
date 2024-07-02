import { BaseRepository } from './shared/BaseRepository';

export class ExecutionRepositoryClass extends BaseRepository {
  async getExecutions() {
    return await super.get<GetExecuntionsResponse>({
      url: 'execution',
    });
  }
}

export const ExecutionRepository = new ExecutionRepositoryClass();
