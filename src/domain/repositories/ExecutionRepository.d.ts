interface IExecutionRepository {
  getExecutions(): Promise<GetExecuntionsResponse>;
  startExecution(
    params: TStartExecutionParams,
  ): Promise<TExecution | undefined>;
  finishExecution(params: TFinishExecutionParams): Promise<void>;
}
