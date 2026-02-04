import { View, Text, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/auth/firebase';
import { Link, router } from 'expo-router';

export default function Register() {
  const register = async () => {
    await createUserWithEmailAndPassword(
      auth,
      'test@email.com',
      'password'
    );

    router.replace('/');
  };

  return (
    <View>
      <Text>Register</Text>
      <Button title="Create account" onPress={register} />
      <Link href="/(auth)/login">Back to login</Link>
    </View>
  );
}
