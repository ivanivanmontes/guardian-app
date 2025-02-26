import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SERVERURL } from "../config";



const PinScreen = () => {
  const [pins, setPins] = useState([]);

  const retrievePins = () => {
      axios.get(`${SERVERURL}/getPins/0`) // TODO: replace 0 with stored redux user_id
          .then(response => {
              // console.log('Pins:', response.data);
              setPins(response.data); // 
          })
          .catch(error => {
              console.error("Error fetching pins:", error);
          });
  };

  const handleItemPress = (title, description) => {
    console.log(`Title: ${title}, Description: ${description}`);
  };  

  useEffect(() => { // right, this gets done everytime it refreshes 
      retrievePins(); // Fetch pins when the component mounts
  }, []);



  return (
    <View style={styles.container}>
        <Text>Pin Screen</Text>
        <FlatList
            style={styles.flatListContainer}
            data={pins}
            keyExtractor={item => item.pin_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
              style={styles.touchableContainer}
              onPress={() => handleItemPress(item.title, item.description)}
              >
              <View style={styles.pinContainer} >
                  <Image 
                      source={require("../assets/pinMarker.png")}
                      style={styles.image}
                  />
                  <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text 
                        style={styles.description} 
                        numberOfLines={2} // Limit to 2 lines
                        ellipsizeMode="tail" // Show "..." at the end of truncated text
                      >
                        {item.description}
                      </Text>
                  </View>
              </View>
          </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CADEF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  flatListContainer: {
    width: '85%',
    // borderColor: "black",
    // borderWidth: 1, // Adds a border with 1 pixel width
  },
  touchableContainer : {
    width: "100%"
  },
  pinContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    padding: 20,
    paddingHorizontal: 30,
    paddingRight: 20,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'flex-start', 
    width: '100%',
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
},

image: {
  // borderWidth: 1,
  width: 60,
  height: 60,
  tintColor: "#C0C1EE",
  marginRight: 20,
  // marginBottom: 10,
  // paddingLeft: 20,
},
textContainer: {
  // borderWidth: 1,
  flex: 1,
  maxWidth: '70%',
  alignItems: 'flex-start',
},
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',

},
});

export default PinScreen;