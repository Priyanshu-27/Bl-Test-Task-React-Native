// src/components/ProductList.js
import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StarRating from './StarRating';
import {incrementQuantity, decrementQuantity, addToCart} from '../redux/action';
import ProductModal from './ProductModal';

const ProductList = ({products}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getItemQuantity = productId => {
    const item = cart.find(cartItem => cartItem.id === productId);
    return item ? item.quantity : 0;
  };

  const handleProductPress = product => {
    setSelectedProduct(product);
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productContainer}>
              <Image source={{uri: item.image}} style={styles.productImage} />

              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  <StarRating rating={item.rating.rate} />
                  <Text style={styles.ratingCount}>({item.rating.count})</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.productPrice}>$ {item.price}</Text>
                  {getItemQuantity(item.id) > 0 && (
                    <View style={styles.cartControls}>
                      <TouchableOpacity
                        onPress={() => dispatch(decrementQuantity(item.id))}
                        style={{
                          paddingHorizontal: 12,
                          backgroundColor: 'white',
                          elevation: 2,
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {getItemQuantity(item.id)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => dispatch(incrementQuantity(item.id))}
                        style={{
                          paddingHorizontal: 12,
                          backgroundColor: 'white',
                          elevation: 4,
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <Text style={styles.productCategory}>
                  Category: {item.category}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isVisible={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderColor: '#9e9e9e',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    gap: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCount: {
    marginLeft: 5,
    fontSize: 12,
    color: '#888',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 12,
    color: '#888',
  },
  productRating: {
    fontSize: 12,
    color: '#888',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductList;
