import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';

// Setting the facebook app id using setAppID
Settings.setAppID('1400337294031459');
// Ask for consent first if necessary
Settings.initializeSDK();

export async function handleFacebookSingIn() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccessToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  console.log(`facebookCredential: ${facebookCredential}`);
  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
