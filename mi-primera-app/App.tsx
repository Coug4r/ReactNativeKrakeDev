import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EmployeeList from './src/components/EmployeeList';
import CompanyHeader from './src/components/CompanyHeader';
export default function App() {
  return (
      <SafeAreaProvider>

        <SafeAreaView style={styles.safeArea} edges={['top']}>

          <StatusBar style='light' backgroundColor='#2196F3'/>

          <View style={styles.appContainer}>

            <View style={styles.header}><CompanyHeader/></View>

            <View style={styles.list}><EmployeeList/></View>

          </View>

        </SafeAreaView>

      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  header: {
    flex: 0.5,
    alignItems: 'center'   
  },
  list: {
    flex: 1,
    alignSelf: 'stretch'
  }
});
