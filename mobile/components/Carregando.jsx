import { ActivityIndicator, Text, View, StyleSheet} from 'react-native'

export default function Carregando({mensagem= "Carregando..."}) {
  return (
    <View style={styles.conteudo}>
        <ActivityIndicator  size="large" color="#E0473C" />
        <Text style={styles.msg}>{mensagem}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    conteudo: {
        AlignItems: 'center'
    },
    msg: {
        color: '#A2A8C3'
    }
})