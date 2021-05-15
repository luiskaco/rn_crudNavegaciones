import React from 'react';
import { View , StyleSheet, Alert} from 'react-native';

// Importando paper
import { Headline, Text , Subheading , Button, FAB} from 'react-native-paper';

// Importando global
import globalStyles from '../styles/global';

// Importando axios
import axios from 'axios'


// Importando

const DetalleCliente = ({navigation, route}) => {
     console.log(route);
    const { nombre, telefono, correo, empresa, id} = route.params.item;

    // Extrayendo metodos
    const { setConsultarAPI } = route.params;

    // method
    const mostrarConfirmacion = () => {
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'un contacto eliminado no se puede recuperar',
            // Arreglo de botones
            [
                {text: 'Si, Eliminar', onPress: () => eliminarContacto() },
                {text: 'Cancelar', style: 'cancel'}
            ]
        )
    }

    // method - Eliminar
    const eliminarContacto = async () => {
        // console.log("elimnar", id)
        const url= `http://192.168.1.2:3000/clientes/${id}`;
    
        try {
             await axios.delete(url);
        } catch (error) {
            console.log(error)
        }

        // Redirecionar 
        navigation.navigate('inicio');

        //volver a consultar el api
        setConsultarAPI(true);
    
    }

    return ( 
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>
                {nombre}
            </Headline>
            <Text>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text>Correo: <Subheading>{correo}</Subheading></Text>
            <Text>Telefono: <Subheading>{telefono}</Subheading></Text>
        
            <Button
                style={styles.boton} // estilos locales
                mode="contained"
                icon="cancel"
                onPress={() => mostrarConfirmacion()}
            >
                Eliminar Cliente
            </Button>


            {/* // Agregando boton  fab*/}
            <FAB 
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate('NuevoCliente', {cliente: route.params.item ,setConsultarAPI})}
                //  nota: pasamos el objeto cliente

                >

            </FAB>

        </View>
     );
}

const styles = StyleSheet.create({
    texto:{
        marginBottom: 20, 
        fontSize:18
    }, 
    boton: {
        marginTop:100,
        backgroundColor: 'red'
    }
});
 
export default DetalleCliente;