type TExecutionDetailsRouteParams = {
  execution: TExecution;
};

type TChecklistRouteParams = {
  checklistId: string;
  locationId: string;
};

type AppStackParamsList = {
  Home: undefined;
  ExecutionDetails: TExecutionDetailsRouteParams;
  Checklist: TChecklistRouteParams;
};

type AuthStackParamsList = {
  Login: undefined;
};
