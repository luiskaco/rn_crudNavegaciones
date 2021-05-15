import React, {useEffect, useState} from 'react';
import {Text, View, Platform ,FlatList, StyleSheet} from 'react-native';

// Importando paper
import {Headline ,List ,Button, FAB} from 'react-native-paper';

// Importando axios
import axios from 'axios';

// importando estilos globales
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {
    const [clientes, setClientes] = useState([]);
    const [consultarAPI, setConsultarAPI] = useState(true);


    useEffect(() => {

        const obtenerClientesApi = async () => {
            try {
                if(Platform.OS === 'ios'){
                    // Para IOS
                   const resultado = await axios.get('http://localhost:3000/clientes');
                    /* nota: para ios es el local host que te de tu api*/

                     // Guardar clientes 
                     setClientes(resultado.data);
                }else{
                    // Para Android
                    const resultado = await axios.get('http://192.168.1.2:3000/clientes');
                    /**Nota:  para android es el localhost que tiene tu maquina*/
                    // console.log(resultado.data)

                    // Guardar clientes 
                    setClientes(resultado.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        // LLamado de funcio
            if(consultarAPI){
                obtenerClientesApi();
                setConsultarAPI(false); // veolvemos a false
            }
      
    },[consultarAPI]);  // nota: Siempre recordar Para que se ejecute una vez, dejamos un arrglo vacio de dependencias.

    return ( 
        <View style={globalStyles.contenedor}>
            <Button 
                icon="plus-circle"
                onPress={() => navigation.navigate('NuevoCliente', {setConsultarAPI})}   
                // De esta manera pasamos funciones u objeyo al componentes. todo lo que es enviado por navigate, debe ser recibido en la variable route en el compontne
            >
                 Nuevo Cliente
            </Button>

            {/* Cabecera conficionada */}
            <Headline
                style={globalStyles.titulo}
            > {clientes.length > 0 ? 'Clientes' : 'Aún no hay Clientes'}</Headline>
            

            {/* Listando clientes */}
            <FlatList 
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString() } //  Colocando el id unico en string
                renderItem={ ({item}) => (   // item variable temporal que crea flatlist
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}

                        onPress={() => navigation.navigate('DetalleCliente', { item, setConsultarAPI })} // vista detalle
                    /> // Componente similiar al flalist
                )}

                /**
                 * Nota: Render item es lo que va hacer que se vean los resultados
                 */
            />


            {/* // Agregando boton  fab*/}
            <FAB 
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('NuevoCliente', {setConsultarAPI})}
                >

            </FAB>
        </View>
     );
}

// Estilos locales
const styles = StyleSheet.create({
    fab:{
        position: 'absolute',
        margin: 20, 
        right: 0,
        bottom: 20
    }
})
 
export default Inicio;