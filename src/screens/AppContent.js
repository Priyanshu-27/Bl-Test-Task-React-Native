// AppContent.js
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FETCH_PRODUCTS, addToCart} from '../redux/action';
import ProductList from '../components/ProductList';
import ProductModal from '../components/ProductModal';

const AppContent = ({navigation}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      dispatch({type: FETCH_PRODUCTS, payload: data});
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleAddToCart = product => {
    dispatch(addToCart(product));
    setSelectedProduct(null);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          width: width,
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Text
          style={{
            color: '#000',
            fontWeight: '500',
            fontSize: 18,
            letterSpacing: 2,
          }}>
          B.I. Shopping
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CheckoutScreen')}>
          <Icon name="basket-outline" style={{color: '#000', fontSize: 20}} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{flex: 1, justifyContent: 'center'}}
        />
      ) : (
        <ProductList products={products} onProductPress={setSelectedProduct} />
      )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isVisible={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </SafeAreaView>
  );
};

export default AppContent;
