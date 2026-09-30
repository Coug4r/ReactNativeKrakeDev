import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChestdetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Rutina de Pecho</Text>
        <Text style={styles.subtitle}>Ejercicios recomendados:</Text>
        <Text style={styles.exercise}>• Press de banca</Text>
        <Text style={styles.exercise}>• Flexiones</Text>
        <Text style={styles.exercise}>• Aperturas con mancuernas</Text>
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
  exercise: {
    color: 'gray', // gris para los ítems
    fontSize: 16,
    marginVertical: 4,
  },
});
