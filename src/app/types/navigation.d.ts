type TExecutionDetailsRouteParams = {
  execution: TExecution;
};

type TChecklistRouteParams = {
  checklistId: string;
  locationId: string;
  clientId: number;
  executionId: string;
};

type AppStackParamsList = {
  Home: undefined;
  Settings: undefined;
  UpdatePassword: undefined;
  ExecutionDetails: TExecutionDetailsRouteParams;
  Checklist: TChecklistRouteParams;
};

type AuthStackParamsList = {
  Login: undefined;
  RecoverAccount: undefined;
  RecoverAccountEmailSent: undefined;
};
