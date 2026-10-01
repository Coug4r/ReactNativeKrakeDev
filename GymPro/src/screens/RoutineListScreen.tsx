import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoutines } from '../context/RoutineContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function RoutineListScreen({navigation}: any) {
  const {routines, deleteRoutine} = useRoutines();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={()=>navigation.navigate('AddRoutine')}
        >
          <Ionicons name='add' size={24} color='black'/>
        </TouchableOpacity>
      </View>

      {/* Lista de rutinas */}
      <FlatList
        data={routines}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({item})=>{
          return(
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.routineName}>{item.name}</Text>
                <Text style={styles.routineGroup}>{item.muscleGroup}</Text>
                <Text style={styles.routineDuration}>{item.duration} min</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={()=> navigation.navigate('AddRoutine', {id:item.id})}
                >
                  <Ionicons name='pencil' size={22} color='#FF9800' />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={()=> navigation.navigate('Detail', {id: item.id})}
                >
                  <Ionicons name='eye' size={22} color='#00FF00'/>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={()=>deleteRoutine(item.id)}
                >
                  <Ionicons name='trash' size={22} color='#E53935'/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>Alert.alert("Empezo la Rutina!")}>
                  <Ionicons name='baseball' size={22} color='#3549e5'/>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fondo negro
  },
  header:{
    padding:16,
    alignItems:'flex-end',
  },
  addButton:{
    backgroundColor:'#00FF00', // verde brillante
    padding:12,
    borderRadius:50,
    elevation:4,
  },
  listContainer:{
    paddingHorizontal:16,
    paddingBottom:20,
  },
  card:{
    backgroundColor:'#111', // negro más suave para contraste
    borderRadius:10,
    padding:16,
    marginBottom:12,
    elevation:3,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  cardContent:{
    flex:1,
    marginRight:10,
  },
  routineName:{
    fontSize:16,
    fontWeight:'bold',
    color:'#00FF00', // verde para destacar
    marginBottom:4,
  },
  routineGroup:{
    fontSize:14,
    color:'#ccc',
    marginBottom:2,
  },
  routineDuration:{
    fontSize:13,
    color:'#888',
  },
  actions:{
    flexDirection:'row',
  },
  actionButton:{
    marginHorizontal:6,
  }
});
