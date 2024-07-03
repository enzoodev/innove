import { BaseRepository } from './shared/BaseRepository';

export class ExecutionRepositoryClass extends BaseRepository {
  async getExecutions() {
    return super.get<GetExecuntionsResponse>({
      url: 'execution',
    });
  }
}

export const ExecutionRepository = new ExecutionRepositoryClass();
