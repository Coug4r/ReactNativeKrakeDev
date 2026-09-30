import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoutineListScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Lista de Rutinas</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChestRutine')}
        >
          <Text style={styles.buttonText}>Rutina de Pecho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fondo negro
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: '#00FF00', // verde brillante
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00FF00', // verde para el botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#00FF00', // sombra verde
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5, // sombra en Android
  },
  buttonText: {
    color: '#000', // texto negro sobre botón verde
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
