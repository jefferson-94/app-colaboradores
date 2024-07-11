// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, ScrollView } from 'react-native';

// Importar o arquivo com os componentes CSS
import { BtnPressedSubmitForm, BtnSubmitForm, ContainerLogin, ImageLogo, InputForm, LinkLogin, Logo, TxtSubmitForm } from '../../styles/custom';

// Importar o componente para apresentar carregando
import Loading from '../../components/Loading';

// Importar AsyncStorage para armazenar dados
import AsyncStorage from '@react-native-async-storage/async-storage';

// Incluir a função navegar entre as telas
import { useNavigation } from '@react-navigation/native';

// useState - Adicionar estado ao componente
import { useState } from 'react';

// Arquivo com as configurações da API
import api from '../../config/api';

// Validar os dados do formulário
import * as yup from 'yup';

// Criar e exportar a função com a tela login 
export default function Login() {

  // Navegar entre as telas
  const Navigation = useNavigation();

  // Armazenar as informações do usuário
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Processar/submeter os dados do formulário
  const loginSubmit = async () => {

    // Usar try e catch para gerenciar exceção/erro
    try { // Permanece no try se não houver nenhum erro

      setLoading(true);
      // Validar o formulário com Yup
      await validationSchema.validate({ matricula, password }, { abortEarly: false });

      // Requisição para a API indicando a rota e os dados
      await api.post('/login', { email: matricula, password })
        .then((response) => { // Acessar o then quando a API retornar status sucesso

          // Alert.alert("Sucesso", response.data.user.email);

          // Salvar os dados no AsyncStorage
          AsyncStorage.setItem('@token', response.data.token);
          AsyncStorage.setItem('@name', response.data.user.name);
          AsyncStorage.setItem('@email', response.data.user.email);

          // Redirecionar para página dashboard
          Navigation.navigate('Home');

        }).catch((err) => { // Acessar o catch quando a API retornar status erro
          if (err.response) { // Acessa o IF quando a API retornar erro
            Alert.alert("Ops", err.response.data.message);
          } else { // Acessa o ELSE quando a API não responder
            Alert.alert("Ops", "Tente novamente!");
          }
        });
    } catch (error) { // Acessa o catch quando houver erro no try
      Alert.alert("Ops", error.errors[0]);
    } finally {
      setLoading(false);
    }
  }

  // Validar o formulário com Yup
  const validationSchema = yup.object().shape({
    matricula: yup
      .string("Erro: Necessário preencher o campo Matricula/CPF!")
      .required("Erro: Necessário preencher o campo Matricula/CPF!"),
    password: yup
      .string("Erro: Necessário preencher o campo Senha!")
      .required("Erro: Necessário preencher o campo Senha!"),
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ContainerLogin>
        {/* Acrescentar a logo na tela */}
        <Logo>
          <ImageLogo source={require("../../../assets/logo.png")} />
        </Logo>

        {/* Criar o campo usuário */}
        <InputForm
          placeholder="CPF/Matricula"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => setMatricula(text)}
          value={matricula}
          editable={!loading}
        />

        {/* Criar o campo senha */}
        <InputForm
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          editable={!loading}
        />

        {/* Criar o botão para submeter/enviar os dados do formulário */}
        <BtnSubmitForm onPress={loginSubmit} style={({ pressed }) => BtnPressedSubmitForm(pressed)} disabled={loading}>
          <TxtSubmitForm >Acessar</TxtSubmitForm>
        </BtnSubmitForm>


        {/* Apresentar o loading */}
        {loading && <Loading />}

      </ContainerLogin>
    </ScrollView>
  )
}