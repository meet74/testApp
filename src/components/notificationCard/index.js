import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constant/Colors';
import { Entypo } from '@expo/vector-icons';

const NotificationCard = ({ message, onClose }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <Entypo name="cross" size={24} color="white"  style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.notificationText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  notificationText: {
    color: "white",
    fontSize: 18,
   
    
  },
});

export default NotificationCard;
