import React,{useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';

// Importando axios
import axios from 'axios';

// Importando paper
import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
// Nota: headline es como si fuera un h1

// Importando extilos globales
import globalStyles from '../styles/global';

const NuevoCliente = ({navigation ,route}) => {   // route: esta capturando todo loq ue es enviado por navigate
    // console.log(route.params);
    // Extraemos funcion proveniente del route

    const { setConsultarAPI } = route.params;

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setcorreo] = useState('');
    const [empresa, setEmpresa] = useState('');

    // Modal
    const [alerta, setAlerta] = useState(false);

    
    // Guardar Clientes
    const guardarCliente = async () => {
        // Validar
        if(nombre.trim() === '' || telefono.trim() === '' || correo.trim() === '' || empresa.trim() === ''){
            // console.log('No pueden quedar vacios');
            setAlerta(true);
            return;
        }

        // Generar Clientes
        const cliente = {nombre,telefono,correo,empresa};
        console.log(cliente)

        // Guardar cliente en el api
            try {
                
                if(Platform.OS === 'ios'){
                    // Para IOS
                    await axios.post('http://localhost:3000/clientes', cliente);
                    /*
                        nota: para ios es el local host que te de tu api
                    */
                }else{
                    // Para Android
                    await axios.post('http://192.168.1.2:3000/clientes', cliente);
                    /**
                     *  Nota:  para android es el localhost que tiene tu maquina
                     */
                }
      
            } catch (error) {
                console.log(error)
            }

            // console.log('Guardado correctamente')

            // Redirecconar
            navigation.navigate('inicio');

             // limpiar el form (opcional)
            setNombre('');
            setTelefono('');
            setcorreo('');
            setEmpresa('');

            // Cambiar a true mpara traernos el nuevo cliente
            setConsultarAPI(true);
    }

    return ( 
       <View style={globalStyles.contenedor}>            
            
            <Headline
                style={globalStyles.titulo}
            > Añadir Nuevo Cliente
            </Headline>

            <TextInput
                label="Nombre"
                placeholder="ingresar su nombre"
                onChangeText={ texto => setNombre(texto) }
                value={nombre}
                style={styles.input}
            />
            <TextInput
                label="Teléfono"
                placeholder="Ingresar su numero de telefono"
                onChangeText={ texto => setTelefono(texto) }
                value={telefono}
                style={styles.input}
            />
            <TextInput
                label="Correo"
                placeholder="correo@correo.com"
                onChangeText={ texto => setcorreo(texto) }
                value={correo}
                style={styles.input}
            />
            <TextInput
                label="Empresa"
                placeholder="ingresar nombre Empresa"
                onChangeText={ texto => setEmpresa(texto) }
                value={empresa}
                style={styles.input}
            />

            <Button  
                icon="pencil-circle" // Agregamos iconos
                mode="contained" // Cambia la apariencia del boton
                onPress={() => guardarCliente()}
            > Guardar Cliente </Button>


            {/* // Alerta */}
            <Portal>
                <Dialog
                    // Pros del dialog
                    visible={alerta} // nota: propiedad por default es false para mantener oculto

                    onDismiss={() =>  setAlerta(false)} //nota:  Usamos onDismiss para ocultar en cualquier espacio de pantalla que se toque 
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                        {/* Nota: paragraps hace los texto pequeños */}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setAlerta(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

       </View>
     );
}


const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
});
 
export default NuevoCliente;