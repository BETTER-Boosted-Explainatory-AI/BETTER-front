import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export function signIn(username, password) {
  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
}

export function getCurrentUser() {
  return userPool.getCurrentUser();
}

export function signOut() {
  const user = userPool.getCurrentUser();
  if (user) user.signOut();
}