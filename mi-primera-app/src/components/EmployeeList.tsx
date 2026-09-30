import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import ProfileCard from "./ProfileCard";

const Empleados = [
    {
        id: "1", 
        nombre: "David Burneo", 
        cargo: "Diseñador full Stak",
        fotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzlrYHeTxr5un6rP6QvkBBYdVmeVuOG9lL2vvSGpvfiA&s=10'
    },
    {
        id: "2", 
        nombre: "Andres Castillo", 
        cargo: "QA",
        fotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrobSkSoFYahvgM1284DdXR2jaOu6U5yav7ndjGzVSqw&s=10'
    },
    {
        id: "3", 
        nombre: "Pedro Pascal", 
        cargo: "Diseñador UX",
        fotoUrl: 'https://cdn-icons-png.flaticon.com/512/2830/2830524.png'
    },
    {
        id: "4", 
        nombre: "Maria Erique", 
        cargo: "Diseñadora Grafica",
        fotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2pdStmZyDiQ2K2-H6NPYXElEH8ETMIFoEK5hELE6n3w&s=10'
    }
    ,
    {
        id: "5", 
        nombre: "Lucresia Allala", 
        cargo: "Diseñadora UX",
        fotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2pdStmZyDiQ2K2-H6NPYXElEH8ETMIFoEK5hELE6n3w&s=10'
    }
]

export default function EmployeeList(){
    return(
        <View style={styles.container}>
  <Text style={styles.title}>Directorio de Empleados</Text>
  <TextInput 
    style={styles.searchInput}
    placeholder="Buscar Empleado..."
    placeholderTextColor={'#999'}
  />
  <FlatList
    data={Empleados}
    keyExtractor={(item)=> item.id}
    contentContainerStyle={styles.list}
    renderItem={({item})=>(
      <View style={styles.cardWrapper}>
        <ProfileCard
          nombre={item.nombre}
          cargo={item.cargo}
          image={{uri: item.fotoUrl}}
        />    
      </View>
    )}
  />
</View>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 16,
    color: '#333'
  },
  list: {
    flexGrow: 0
  },
  cardWrapper: {
    marginBottom: 12
  }
});
