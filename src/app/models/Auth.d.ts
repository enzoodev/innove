type TAuth = {
  iduser: number;
  idclient: number;
  login: string;
  name: string;
  email: string;
  phone: string;
  token: string;
  lastlogin: string;
  permissions: Array<TAuthPermission>;
  client_logo_icon: TClientLogoIcon;
};

type TClientLogoIcon = {
  filename: string;
  extension: string;
  file: string;
  logo: null;
};

type TAuthPermission = {
  id: string;
  idpermission: string;
  name: string;
};

type TLoginParams = {
  login: string;
  pass: string;
  devicetype: string;
};
