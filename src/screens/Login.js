import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator ,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem(email);
      if (userData) {
        const user = JSON.parse(userData);
        if (user.password === password) {
          await AsyncStorage.setItem('loggedInUser', email);
          navigation.navigate('Shop');
        } else {
          Alert.alert('Error', 'Invalid password.');
        }
      } else {
        Alert.alert('Error', 'No user found with this email.');
      }
    } catch (error) {
      console.error('Failed to login', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUser) {
        navigation.navigate('Shop');
      }
    };

    checkLoggedIn();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/braininventory_logo.jpeg')} // Replace with your logo path
        style={styles.logo}
      />
      <View>
        <Text style={styles.title}>Brain Inventory Ecom.</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>
          Don't have an account?{' '}
          <Text style={{textDecorationLine: 'underline'}}>Signup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFF',
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 24,
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: 'gray',
  },
});

export default Login;
