type TExecutionDetailsRouteParams = {
  execution: TExecution;
};

type TChecklistRouteParams = {
  checklistId: string;
  locationId: string;
  clientId: number;
  executionId: string;
};

type TTakeChecklistPhotoRouteParams = {
  index: number;
  limitOfPhotos: number;
  setPhoto: (uri: string, index: number) => void;
};

type AppStackParamsList = {
  Home: undefined;
  Settings: undefined;
  UpdatePassword: undefined;
  ExecutionDetails: TExecutionDetailsRouteParams;
  Checklist: TChecklistRouteParams;
  TakeChecklistPhoto: TTakeChecklistPhotoRouteParams;
};

type AuthStackParamsList = {
  Login: undefined;
  RecoverAccount: undefined;
  RecoverAccountEmailSent: undefined;
};
