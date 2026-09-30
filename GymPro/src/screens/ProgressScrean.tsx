import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProgressScrean() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Progreso</Text>
        <Text style={styles.subtitle}>Tus estadísticas:</Text>
        <Text style={styles.stat}>• Rutinas completadas: 12</Text>
        <Text style={styles.stat}>• Peso levantado total: 450 kg</Text>
        <Text style={styles.stat}>• Días entrenados: 20</Text>
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
  stat: {
    color: 'gray', // gris para estadísticas
    fontSize: 16,
    marginVertical: 4,
  },
});
