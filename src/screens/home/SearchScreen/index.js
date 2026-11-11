import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../../constant/Colors'
import { Feather } from '@expo/vector-icons'
import { dummyCities } from '../../../constant/DummyData'
import Card from '../../../components/Card'
import { useSelector } from 'react-redux'

const SearchScreen = (props) => {
  const eventData = useSelector(state => state.event);
  const [searchData, setSearchData] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (searchData.trim() === "") {
      // If search query is empty, display all events
      setFilteredEvents(eventData.events);
    } else {
      // Filter events based on search query
      const filtered = eventData.events.filter(event =>
        event.eventName.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchData, eventData.events]);

  const search = (text) => {
    setSearchData(text);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Search</Text>
        <View style={styles.inputDecoration}>
          <Feather name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search"
            style={styles.inputText}
            onChangeText={search}
            value={searchData}
          />
        </View>
        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => {
            return <Card event={item} showAddress={false} props={props} />
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  titleText: {
    margin: 15,
    letterSpacing: 0.5,
    fontSize: 25,
    marginTop: 20,
    color: Colors.primaryColor,
  },
  inputDecoration: {
    borderWidth: 1,
    margin: 10,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  inputText: {
    padding: 10,
    flex: 1,
    fontSize: 16
  },
})

export default SearchScreen
