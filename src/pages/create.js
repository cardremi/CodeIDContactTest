import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
// import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

const CreateContact = props => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState();

  const navigation = useNavigation();

  const btnUpdate = () => {
    const postData = {
      firstName: input1,
      lastName: input2,
      age: parseInt(input3, 10),
      photo:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
    const url = 'https://contact.herokuapp.com/contact';

    axios
      .post(url, postData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(response => {
        console.log('Contact created:', response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
      .finally(() => navigation.goBack());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Contacts</Text>
        <TouchableOpacity style={styles.button} onPress={btnUpdate}>
          <Feather name={'check'} size={24} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.tinyLogo}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={'white'}
          value={input1}
          onChangeText={setInput1}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={'white'}
          value={input2}
          onChangeText={setInput2}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor={'white'}
          value={input3}
          onChangeText={setInput3}
        />
      </View>
    </View>
  );
};

export default CreateContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'black',
  },
  tinyLogo: {
    borderRadius: 100,
    width: 80,
    height: 80,
    alignSelf: 'center',
    margin: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    color: 'white',
    fontWeight: '700',
    paddingLeft: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '700',
  },
});
