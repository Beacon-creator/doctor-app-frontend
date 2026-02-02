import { View, Text, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/auth/firebase';
import { Link } from 'expo-router';

export default function RegisterScreen() {
  const register = async () => {
    await createUserWithEmailAndPassword(
      auth,
      'test@email.com',
      'password'
    );
  };

  return (
    <View>
      <Text>Register</Text>
      <Button title="Register" onPress={register} />
      <Link href="/login">Back to login</Link>
    </View>
  );
}
