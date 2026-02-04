import { View, Text, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/auth/firebase';
import { syncUserWithBackend } from '../../src/auth/syncUser';
import { Link } from 'expo-router';

export default function Login() {
  const login = async () => {
    await signInWithEmailAndPassword(
      auth,
      'test@email.com',
      'password'
    );

    await syncUserWithBackend();
  };

  return (
    <View>
      <Text>Login</Text>
      <Button title="Login" onPress={login} />
      <Link href="/(auth)/register">Create account</Link>
    </View>
  );
}
