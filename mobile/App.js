import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Cabecalho from './components/Cabecalho';
import Creditos from './components/Creditos';
import backendClient from './src/utils/backendClient';
import Carregando from './components/Carregando';
import ListaFilmes from './components/ListaFilmes';
import Busca from './components/Busca';



export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState (null)

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

  const onBuscar = () => {
    setCarregando(true)
    backendClient.get('/filmes', {
      params: {
        busca: termo
      }
    })
    .then((result) => {
      setResultados(result.data)
      setTermoBuscado(termo)
      setErro(null)
      setCarregando(false)
    })
    .catch((erro) => {
        console.log(erro)
        erro.response.data.mensagem ?
          setErro(erro.response.data.mensagem)
        : setErro('Não foi possível buscar os filmes')
        setCarregando(false)
      }) 
  }

  const onLimpar = () => {
    setTermo('')
    setResultados(null)
    setErro(null)
  }

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.tela} >

        <Cabecalho />

        <Busca 
          termo={termo}
          onTermoAlterado={setTermo}
          onBuscar={onBuscar}
          onLimpar={onLimpar}
        />

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
              resultados === null ?
                <ListaFilmes
                  titulo={'Em alta nesta semana'}
                  filmes={emAlta}
                />
              :
              resultados.lenght === 0 ?
                <Text>
                  Nenhum filme encontrado para "${termoBuscado}"
                </Text>
              :
              <ListaFilmes
                titulo={`Resultados para "${termoBuscado}"`}
                filmes={resultados}
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
