import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ajustes</Text>
        <Text style={styles.option}>• Notificaciones</Text>
        <Text style={styles.option}>• Tema oscuro</Text>
        <Text style={styles.option}>• Perfil</Text>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    color: '#2df600', // verde brillante
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    color: 'gray', // gris para las opciones
    fontSize: 18,
    marginVertical: 8,
  },
});
