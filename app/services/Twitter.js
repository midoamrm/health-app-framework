import auth from '@react-native-firebase/auth';
import { NativeModules } from 'react-native';
const { RNTwitterSignIn } = NativeModules;

RNTwitterSignIn.init(
  'SXVoZTZieWRBLTBBR0hRSnl5SV86MTpjaQ',
  'Zw8i_hYsUqFtBMiaudErhAtHdHNhGgMSrswbCila5MmM_cmFk6',
).then(() => console.log('Twitter SDK initialized'));

export async function handleTwitterSingIn() {
  // Perform the login request
  const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

  // Create a Twitter credential with the tokens
  const twitterCredential = auth.TwitterAuthProvider.credential(
    authToken,
    authTokenSecret,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(twitterCredential);
}
