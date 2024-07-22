import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../redux/action';

const CheckoutScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrderPlacement = async () => {
    setOrderPlaced(true);
    setTimeout(async () => {
      setOrderPlaced(false);
      Alert.alert('Success', 'Your order has been placed successfully!');
      // Clear the cart after order is placed
      await AsyncStorage.removeItem('cart'); // Clear the cart from AsyncStorage
      navigation.navigate('Shop');
    }, 2000);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    // dispatch({type: LOGOUT});
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {orderPlaced ? (
        <LottieView
          source={require('../assets/success-animation.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
      ) : (
        <>
          {cart.length === 0 ? (
            <Text style={styles.message}>No products added yet</Text>
          ) : (
            <>
              <FlatList
                data={cart}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View style={styles.productBox}>
                    <View style={styles.productContainer}>
                      <Text style={styles.productName}>{item.title}</Text>
                      <Text style={styles.productDetails}>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )}
              />
              <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleOrderPlacement}>
                <Text style={styles.buttonText}>Cash on Delivery</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },
  productBox: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    
    backgroundColor: '#f9f9f9',
  },
  productContainer: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#000',
  },
  productDetails: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
    color:'green'
  },
  animation: {
    flex:1 ,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FFF',
    borderWidth:1 ,
    borderColor:'gray' ,
    padding:10 ,
  },
});

export default CheckoutScreen;
