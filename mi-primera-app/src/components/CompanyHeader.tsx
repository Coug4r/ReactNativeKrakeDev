import { StyleSheet, Text, View, Image , ImageSourcePropType} from "react-native";

export default function CompanyHeader(){
    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/imagenes/empresa.png')}
            />
            <Text style={styles.slogan}>Empresa Multinivel Se tu propio jefe en 2 dias gratis sin virus</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   // centra verticalmente
    alignItems: 'center',       // centra horizontalmente
    backgroundColor: '#fff'
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,           // hace la imagen circular
  },
  slogan: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'               // gris oscuro
  }
});