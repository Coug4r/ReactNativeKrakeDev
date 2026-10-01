import React, {useState, useEffect} from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoutines } from '../context/RoutineContext';
import { TextInput } from 'react-native-gesture-handler';

export default function AddRoutineScreen({navigation, route}: any){
    const {addRoutine, updateRoutine, routines} = useRoutines();
    const idToEdit = route.params?.id;

    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(()=>{
        if(idToEdit){
            const routineFound = routines.find(r => r.id === idToEdit)
            if(routineFound){
                setName(routineFound.name)
                setMuscleGroup(routineFound.muscleGroup)
                setDuration(routineFound.duration.toString())
            }
        }
    }, [idToEdit])

    const handlerSave = ()=>{
        if(!name || !muscleGroup){
            Alert.alert('Error', 'Faltan datos requeridos!')
            return
        }
        const durationNumber = parseInt(duration);
        if(isNaN(durationNumber)){
            Alert.alert('Error', 'La duración debe ser un número!')
            return
        }

        if(idToEdit){
            updateRoutine(idToEdit, {name, muscleGroup, duration:durationNumber})
        }else{
            addRoutine({name, muscleGroup, duration:durationNumber})
        }

        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>Nombre de la rutina:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='Ingrese el nombre'
                    placeholderTextColor="#888"
                />

                <Text style={styles.label}>Grupo muscular:</Text>
                <TextInput
                    style={styles.input}
                    value={muscleGroup}
                    onChangeText={setMuscleGroup}
                    placeholder='Ingrese el grupo muscular'
                    placeholderTextColor="#888"
                />

                <Text style={styles.label}>Duración (minutos):</Text>
                <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={setDuration}
                    placeholder='Ingrese la duración'
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.saveButton} onPress={handlerSave}>
                    <Text style={styles.saveButtonText}>
                        {idToEdit ? 'Actualizar' : 'Guardar'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#000', // fondo negro
    padding:16,
  },
  card:{
    backgroundColor:'#111', // negro suave para contraste
    borderRadius:12,
    padding:20,
    elevation:4,
  },
  label:{
    fontSize:14,
    fontWeight:'bold',
    color:'#00FF00', // verde brillante
    marginBottom:6,
  },
  input:{
    borderWidth:1,
    borderColor:'#00FF00',
    borderRadius:8,
    padding:10,
    marginBottom:12,
    fontSize:14,
    color:'#fff',
    backgroundColor:'#222', // campo oscuro
  },
  saveButton:{
    backgroundColor:'#00FF00',
    paddingVertical:12,
    borderRadius:8,
    alignItems:'center',
    marginTop:10,
    shadowColor:'#00FF00',
    shadowOpacity:0.6,
    shadowRadius:6,
    elevation:5,
  },
  saveButtonText:{
    color:'#000',
    fontSize:16,
    fontWeight:'bold',
  }
});
