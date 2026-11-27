import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Cabecalho from './components/Cabecalho';
import Creditos from './components/Creditos';
import backendClient from './src/utils/backendClient';
import Carregando from './components/Carregando';
import ListaFilmes from './components/ListaFilmes';



export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    backendClient.get('/em-alta')
      .then((result) => {
        setEmAlta(result.data)
        setCarregando(false)
      })
      .catch((erro) => {
        console.log(erro)
        setErro('Não foi possível carregar os filmes. Verifique se o backend está no ar')
        setCarregando(false)
      })
  }, [])

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.tela} >

        <Cabecalho />

        {
          carregando ?
            <Carregando
              mensagem={'Buscando os filmes em alta...'}
            />
            :
            erro ?
              <Text>
                {erro}
              </Text>
              :
              <ListaFilmes
                titulo={'Em alta nesta semana'}
                filmes={emAlta}
              />
        }

        <Creditos />

      </SafeAreaView>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#13162B',
    alignItems: 'center',
    justifyContent: 'space-between'
  },


})
