import { login as fbLogin } from './fb-auth';
import { addProviders, getCredentials } from './cognito-auth';

export const loginWithFacebook = () => {
  fbLogin()
  .then(fbAuth => {
    addProviders({"graph.facebook.com": fbAuth.accessToken});
    return getCredentials();
  });
};
