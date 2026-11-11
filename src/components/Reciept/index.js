import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constant/Colors';

const Receipt = ({price = 15,quantity = 1}) => {
  // Define ticket price
  const ticketPrice = price * quantity;

  // Calculate your fee (10% of ticket price)
  const yourFee = ticketPrice * 0.10;

  // Calculate total amount
  const totalAmount = ticketPrice + yourFee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Receipt</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>Ticket Charges</Text>
        <Text style={styles.itemPrice}>£{ticketPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>Ticket Booking Fee (10%)</Text>
        <Text style={styles.itemPrice}>£{yourFee.toFixed(2)}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>£{totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.primaryColor,
    margin: 25,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    color: 'white',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Receipt;
