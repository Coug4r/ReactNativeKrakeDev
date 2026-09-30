import {Text, Button, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen({navigation}:any){
    return(
        <SafeAreaView>
            <Text>Pantalla de Inicio</Text>
            <Button 
                title='Ir a detalles' 
                onPress={()=>navigation.navigate('Detail')}
            />
        </SafeAreaView>
    );
}