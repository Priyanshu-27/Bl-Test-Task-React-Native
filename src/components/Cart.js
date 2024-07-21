// src/components/Cart.js
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Cart = ({cart, onIncrement, onDecrement}) => (
  <View style={styles.cart}>
    {cart.map(item => (
      <View key={item.id} style={styles.cartItem}>
        {/* <Text>{item.title}</Text> */}
        <View style={styles.cartControls}>
          <Button title="-" onPress={() => onDecrement(item.id)} />
          <Text>{item.quantity}</Text>
          <Button title="+" onPress={() => onIncrement(item.id)} />
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  cart: {
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Cart;
