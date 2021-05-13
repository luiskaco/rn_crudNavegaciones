import React from 'react';
import {Button} from 'react-native-paper'

/**
 *  Nota: no puedes tener importado el boton de react native 
 *  y el de paper en un mosmio a no ser qu crees un alias
 */
const BarraSuperior = ({navigation, route}) => {
   
    // Methos
    const handlePress = () => {
        // console.log('Vamos a crear un cliente');
        navigation.navigate('NuevoCliente');  // enviamos al stack cliente
    }

    return ( 
        <Button 
            onPress={() => handlePress() }
            color="#fff"
            icon="plus"   // Algunos iconos si son soportados
        >
            Cliente
        </Button>

     );
}
 
export default BarraSuperior;