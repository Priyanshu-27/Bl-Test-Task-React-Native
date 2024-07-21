// src/components/StarRating.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StarRating = ({rating}) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {Array(filledStars)
        .fill()
        .map((_, index) => (
          <Icon key={`filled-${index}`} name="star" style={styles.star} />
        ))}
      {halfStar && <Icon name="star-half" style={styles.star} />}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <Icon
            key={`empty-${index}`}
            name="star-outline"
            style={styles.star}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    color: '#FFD700',
    fontSize: 16,
    marginRight: 2,
  },
});

export default StarRating;
