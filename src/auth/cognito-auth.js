import AWS from 'aws-sdk';
import getLogger from '../log';

const log = getLogger("auth/cognito-auth");

console.log("AWS Region is: " + process.env.REACT_APP_AWS_REGION);
console.log("Cognito Identity Pool ID is: " + process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID);

AWS.config.region = process.env.REACT_APP_AWS_REGION;

const credentials = {
  IdentityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  Logins: {}
};
AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentials);

const supportedProviders = new Set(["graph.facebook.com"]);

export const addProviders = (providers) => {
  for (const pn in providers) {
    if (supportedProviders.has(pn)) {
      credentials.Logins[pn] = providers[pn];
    }
  }

  AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentials);
};

export const getCredentials = () => {
  return new Promise((resolve, reject) => {
    AWS.config.credentials.get(err => {
      if (err) {
        log.debug("Authentication error: " + err);

        reject(err);
        return;
      }

      const identityId = AWS.config.credentials.identityId;
      log.debug("Got identityId: " + identityId);
      resolve(identityId);
    });
  });
};
