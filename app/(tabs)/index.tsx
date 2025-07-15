import { Image } from 'expo-image';
import { Platform, StyleSheet, FlatList, View, Text, TouchableOpacity, Modal} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() { 



  const [isAddWorkoutFormVisible, setAddWorkoutFormVisible] = useState(false);
  
  const handleButtonPress = () => {
    console.log("The 'Add New Workout' button was pressed!");
    setAddWorkoutFormVisible(true);
  };
  
  const HandleCloseform = () => {
    console.log("Closing the add workout form");
    setAddWorkoutFormVisible(false);
  }

  return ( 
    
    
    <View style={styles.container}>
      <ThemedText style={styles.headerText}>Add Workout</ThemedText> 

      
      <TouchableOpacity 
      style={styles.button} 
      onPress={handleButtonPress}>

        <Text style={styles.buttonText}>Add New Workout</Text>
      </TouchableOpacity>

      <Modal
      animationType = "slide"
      transparent = {true}
      visible= {isAddWorkoutFormVisible}
      onRequestClose={HandleCloseform}
      >
        <View style={styles.modalCentreView}>
          <View style={styles.ModalView}>

          <Text style={styles.ModalTitle}>New Workout</Text>

          
          <Text>Workout Name: [TextInput here]</Text>
          <Text>Sets: [TextInput here]</Text>
          <Text>Reps: [TextInput here]</Text>
          <Text>Weight: [TextInput here]</Text>
          <Text>Notes: [TextInput here]</Text>

          <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={HandleCloseform}
          >

            <Text style={styles.buttonText}>Cancel</Text> 
          </TouchableOpacity>

          <TouchableOpacity
          style={[styles.button, styles.buttonAddModal]}
          onPress={() => console.log('Add workout button was pressed')} //temp until function made
          >
            <Text style={styles.buttonText}>Add Workout</Text>

          </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View> 
  ); 
} 

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
   container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
   },
     headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
   },
     button: {
    backgroundColor: '#007bff', // its blue
    padding: 15, 
    borderRadius: 10, 
    marginTop: 20, 
    width: '80%', 
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  modalCentreView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)' //black with 50% opacity
  },
  ModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  ModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#333",
  },
  buttonClose: {
    backgroundColor: '#dc3545', //its red
    marginTop: 15,
  },
  buttonAddModal: {
    backgroundColor: '#28a745', // its green
    marginTop: 10,
  }
});
