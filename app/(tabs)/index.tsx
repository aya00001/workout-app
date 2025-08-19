import { Image } from 'expo-image';
import { Platform, StyleSheet, FlatList, View, Text, TouchableOpacity, Modal, TextInput, Appearance} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import AsyncStorage, {useAsyncStorage } from '@react-native-async-storage/async-storage'

type WeightUnit = 'kg' | 'lbs'

interface Workout {
    name: string;
    sets: number | '';
    reps: number | '';
    weight: number | '';
    notes: string;
  }

export default function HomeScreen() { 


  const [WeightUnit, setWeightUnit] = useState<WeightUnit>('lbs');

  const [isAddWorkoutFormVisible, setAddWorkoutFormVisible] = useState(false);
  
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  })

  const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect( () => {
      const loadWorkouts = async () => {

      try {
      const stringData = await AsyncStorage.getItem("Workouts");

      if (stringData) {
        const arrayData = JSON.parse(stringData);
        setWorkouts(arrayData);
      }
      } catch (error){
        console.log("Something went wrong loading the data.", error)
      }
    };
    loadWorkouts();
  }, []);




  const handleButtonPress = () => {
        console.log("The 'Add New Workout' button was pressed!");
        setAddWorkoutFormVisible(true);
        setCurrentWorkout({name: '', sets: '', reps: '', weight: '', notes: ''});
      };
  
  const HandleCloseform = () => {
        console.log("Closing the add workout form");
        setAddWorkoutFormVisible(false);
        setCurrentWorkout({name: '', sets: '', reps: '', weight: '', notes: ''});
      }


  const handleInputChange = (field: keyof Workout, textValue: string) => { 
      let parsedValue: string | number = textValue; 

      if ((field === 'sets' || field === 'reps' || field === 'weight') && textValue !== '') {

        parsedValue = parseFloat(textValue);

        if (isNaN(parsedValue)) {
            parsedValue = '';
        }
      }
      setCurrentWorkout(prevState => ({
        ...prevState,
        [field]: parsedValue,
      }));

      };


 const handleAddWorkout = async () => {
      if (!currentWorkout.name) {
        alert('Workout Name is required!'); 
        return; 
      }

      const newWorkout = {
        ...currentWorkout,
        id: Date.now().toString(), 
      };

      const UpdatedWorkouts = [...workouts, newWorkout];
      setWorkouts(UpdatedWorkouts);
      await AsyncStorage.setItem("Workouts", JSON.stringify(UpdatedWorkouts));

      console.log('Added workout:', newWorkout);
      console.log('Total workouts in list:', workouts.length + 1);

      HandleCloseform(); 
    };


  return ( 
    
    
    <View style={styles.container}>
      <ThemedText style={styles.headerText}>Add Workout</ThemedText> 

    <FlatList 
      data={workouts}
      keyExtractor={(item, index) => index.toString()}

      renderItem={({item}) => (
        <View style={styles.workoutCard}>

          <Text style={styles.workoutName}>{item.name}</Text>

          <Text style={styles.workoutDetails}>
            {item.sets} sets × {item.reps} reps @ {item.weight} lbs
          </Text>

          {item.notes ? (
            <Text style={styles.workoutNotes}>Notes: {item.notes}</Text>
          ) : null}

        </View>
      )}
      style={styles.workoutList}
      />
      
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

      
          <TextInput 
          style={styles.input}
          placeholder= "Workout name"
          placeholderTextColor="rgb(193, 194, 199)"
          value={currentWorkout.name}
          onChangeText={(text)=> handleInputChange('name', text)}
          ></TextInput>

          <TextInput
          style={styles.input}
          placeholder='Sets'
          placeholderTextColor="rgb(193, 194, 199)"
          value={String(currentWorkout.sets)}
          onChangeText={(text) => handleInputChange('sets', text)}
          keyboardType='numeric'
          ></TextInput>

          <TextInput
          style={styles.input}
          placeholder='Repetitions'
          placeholderTextColor="rgb(193, 194, 199)"
          value={String(currentWorkout.reps)}
          onChangeText={(text) => handleInputChange('reps', text)}
          keyboardType='numeric'
          ></TextInput>

          <TextInput
          style={styles.input}
          placeholder='Weight'
          placeholderTextColor="rgb(193, 194, 199)"
          value={String(currentWorkout.weight)}
          onChangeText={(text) => handleInputChange('weight', text)}
          ></TextInput>

          <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder='Notes'
          placeholderTextColor="rgb(193, 194, 199)"
          multiline
          numberOfLines={4}
          value={currentWorkout.notes}
          onChangeText={(text) => handleInputChange('notes', text)}
          ></TextInput>



          <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={HandleCloseform}
          >

            <Text style={styles.buttonText}>Cancel</Text> 
          </TouchableOpacity>

          <TouchableOpacity
          style={[styles.button, styles.buttonAddModal]}
          onPress={handleAddWorkout}
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
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 100,
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
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    width: 300,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  ModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EFEEEA',
  },
  buttonClose: {
    backgroundColor: '#E63946', //its red
    marginTop: 15,
  },
  buttonAddModal: {
    backgroundColor: '#66BB6A', // its green
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc', // light grey
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#f9f9f9', // white ish
    fontSize:  16,
    color: '#000000ff', // dark text
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  workoutList: {
  width: '100%',
  marginVertical: 20,
  maxHeight: 300,
},
workoutCard: {
  backgroundColor: '#f5f5f5',
  padding: 15,
  marginVertical: 8,
  marginHorizontal: 16,
  borderRadius: 12,
  borderLeftWidth: 4,
  borderLeftColor: '#007bff',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},
workoutName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 5,
},
workoutDetails: {
  fontSize: 16,
  color: '#666',
  marginBottom: 5,
},
workoutNotes: {
  fontSize: 14,
  color: '#888',
  fontStyle: 'italic',
},
});
