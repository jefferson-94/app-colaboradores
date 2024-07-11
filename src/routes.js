// Gerenciar a navegação, atua como o contêiner na pilha de telas
import { NavigationContainer } from '@react-navigation/native';

// Gerenciar a navegação entre as telas
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Configuração e gestão da navegação entre as telas
const Stack = createNativeStackNavigator();

// Importar as páginas
import NewUser from "./pages/NewUser";
import RecoverPassword from "./pages/RecoverPassword";
import Home from './pages/Home';
import Login from './pages/Login';

// Criar e exportar a função com as rotas
export default function Routes() {
    return (
        // Agrupar as rotas
        <NavigationContainer>
            {/* Criar uma pilha de páginas */}
            <Stack.Navigator>
                {/* Carregar as telas */}
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="NewUser" component={NewUser} options={{ headerShown: false }} />
                <Stack.Screen name="RecoverPassword" component={RecoverPassword} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}