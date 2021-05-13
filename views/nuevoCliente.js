import React,{useState} from 'react';
import {View, StyleSheet} from 'react-native';

// Importando paper
import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
// Nota: headline es como si fuera un h1

// Importando extilos globales
import globalStyles from '../styles/global';

const NuevoCliente = () => {

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setcorreo] = useState('');
    const [empresa, setEmpresa] = useState('');

    // Modal
    const [alerta, setAlerta] = useState(false);

    
    // Guardar Clientes
    const guardarCliente = () => {
        // Validar
        if(nombre.trim() === '' || telefono.trim() === '' || correo.trim() === '' || empresa.trim() === ''){
            // console.log('No pueden quedar vacios');
            setAlerta(true);
            return;
        }

        // Generar Clientes


        // Guardar cliente en el api


        // Redirecconar


        // limpiar el form (opcional)
        console.log('Guardar Cliente')
    }

    return ( 
       <View style={globalStyles.contenedor}>            
            
            <Headline
                style={globalStyles.titulo}
            > Añadir Nuevo Cliente
            </Headline>

            <TextInput 
                label = "Nombre"
                placeholder="Escribir tu nombre"
                onChangeText={texto => setNombre(texto)}
                style={styles.input}
                value={nombre}
            />
            
            <TextInput 
                label = "Correo"
                placeholder="Ejemplo: correo@correo.com"
                onChangeText={(texto) => setcorreo(texto)}
                style={styles.input}
                value={telefono}
            />

            <TextInput 
                label = "Empresa"
                placeholder="Escribir tu empresa"
                onChangeText={(texto) => setEmpresa(texto)}
                style={styles.input}
                value={correo}
            />

            <TextInput 
                label = "Teléfono"
                placeholder="Escribir tu teléfono"
                style={styles.input}
                onChangeText={(texto) => setTelefono(texto)}
                value={empresa}
            />

            <Button  
                icon="pencil-circle" // Agregamos iconos
                mode="contained" // Cambia la apariencia del boton
                onPress={() => guardarCliente()}
            > Guardar Cliente </Button>


            {/* // Alerta */}
            <Portal>
                <Dialog
                    visible={alerta}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                        {/* Nota: paragraps hace los texto pequeños */}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button>Ok</Button>
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