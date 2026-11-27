import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Cabecalho from './components/Cabecalho';
import Creditos from './components/Creditos';

export default function App() {
  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.tela} >

        <Cabecalho />
 
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
