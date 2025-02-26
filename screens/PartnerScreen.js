import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet} from "react-native";

const PartnerScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Partner Screen</Text>
      </View>
    );
  };


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#B8EDCE',
    alignItems: 'center',
    justifyContent: 'center',
},
});



export default PartnerScreen;