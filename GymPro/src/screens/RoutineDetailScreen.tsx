import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoutines } from '../context/RoutineContext';

export default function ChestdetailScreen({route}:any) {
  const idToView = route.params?.id;
  const {routines} = useRoutines();

  const routine = routines.find(r => r.id === idToView);
  if(!routine) return <Text style={styles.notFound}>Rutina No Encontrada!</Text>

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{routine.name}</Text>
        <Text style={styles.subtitle}>Grupo muscular: {routine.muscleGroup}</Text>
        <Text style={styles.subtitle}>Duración: {routine.duration} min</Text>
         <Text style={styles.subtitle}>Fecha de Creacion: {routine.createdAt}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fondo negro
    padding: 16,
  },
  card: {
    backgroundColor: '#111', // negro suave para contraste
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  title: {
    color: '#2df600', // verde brillante
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#2df600',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  notFound: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#E53935',
  },
});
