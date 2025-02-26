import { View, Text, StyleSheet, Button} from "react-native";
import axios from 'axios';
import { SERVERURL } from "../config";
import { useSignUp } from "@clerk/clerk-expo";


// const testConnection = () => {
//   console.log()
//   axios.get(`${SERVERURL}/`)
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }


const SignUpScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Sign up</Text>
        {/* <Button title="test connection" onPress={testConnection}></Button> */}
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
});

export default SignUpScreen;