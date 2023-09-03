import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '845463856292-mlcfg8dqasrme9d98ossr9dsml1q0hnp.apps.googleusercontent.com',
});

export async function handleGoogleSingIn() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log('googleCredential', googleCredential);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
