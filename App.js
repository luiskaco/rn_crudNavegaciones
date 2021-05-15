import 'react-native-gesture-handler';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// importamos el conteneodr principalContainer
import {NavigationContainer} from '@react-navigation/native';

// Importamos la nevegacion tipo stack
import {createStackNavigator} from '@react-navigation/stack';

// APlicamos la navegacion tipo stack
const Stack = createStackNavigator();

//compontnes - Stack
import Inicio from './views/inicio';
import NuevoCliente from './views/nuevoCliente';
import DetalleCliente from './views/detalleCliente';

// Componentes
import BarraSuperior from './components/ui/barra';

// Corrigiendo el error de nombrar el provider
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Importando UI
import {DefaultTheme, Provider } from 'react-native-paper';

// Definiendo theme
const theme = {
  ...DefaultTheme,  // Copia del default teham
  colors: {
     ...DefaultTheme.colors, // Copia de colores
     primary: '#1774f2',   // Rescribimos la propiedad
     accent: '#0655bf'
  }
}

// console.log(theme.colors.primary);
//console.log(theme.colors)

const App = () => {
 
  return (
    <>
        <SafeAreaProvider>
          {/* NOta: Importante para paper funcione bien los */}
          <Provider theme={theme}> 
       

          <NavigationContainer>
            <Stack.Navigator
                initialRouteName='inicio'
                // PArte Superior
                screenOptions={{
                  headerTitleAlign: 'center', // Forzado centrado
                  headerStyle:{
                    backgroundColor: theme.colors.primary
                  },
                  headerTintColor: theme.colors.surface,
                  // Permite modificar los estilos de la fuente
                  headerTitleStyle:{
                    fontWeight: 'bold'
                  }
                }}
            >

              {/* DEFINIENDO LOS STACK  */}
              <Stack.Screen 
                  name="inicio"
                  component={Inicio}

                  // Ubicando componente en la barra
                  options={
                
                    ({navigation, route}) => ({  // Destructurin

                          //  Pasar props al componente
                      // headerLeft: (props) => <BarraSuperior  
                      //                         {...props} // COpia de los props proveniente d ela nevacion
                      //                         navigation={navigation}
                      //                         route={route}
                                              
                      //                         />
                    })
                  }
              />

              <Stack.Screen 
                  name="NuevoCliente"
                  component={NuevoCliente}
                  options={{
                    title:"Nuevo Cliente"
                  }}
              />

              <Stack.Screen 
                  name="DetalleCliente"
                  component={DetalleCliente}
                  options={{
                    title:"Detalle Cliente"
                  }}
              />
              
            </Stack.Navigator>
          </NavigationContainer>

            </Provider>
          </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
