import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image  } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const SettingsScreen = () => {
  const [image, setImage] = useState(null);
  const handleFileUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Upload File" onPress={handleFileUpload} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadStatus: {
    marginTop: 20,
    color: 'red',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SettingsScreen;
