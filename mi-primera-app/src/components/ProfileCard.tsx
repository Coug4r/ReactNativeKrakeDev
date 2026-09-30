import { StyleSheet, Text, View, Image , ImageSourcePropType} from "react-native";

interface ProfileCardProps{
    nombre: String;
    cargo: String;
    image: ImageSourcePropType;
}

export default function ProfileCard(props: ProfileCardProps){

    const {nombre, cargo, image} = props

    return(
        <View style ={styles.card}>
            <Image
                source={image}
                style ={styles.profileImagen} 
            />
            <Text style={styles.title}>{nombre}</Text>
            <Text style={styles.subtitle}>{cargo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        elevation: 5,
        shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84 
    },
    profileImagen: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    title: {fontSize: 24, fontWeight: 'bold'},
    subtitle : {fontSize: 16, color: 'grey'}
})