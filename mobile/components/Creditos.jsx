import { Text, View, StyleSheet} from 'react-native'

export default function Creditos() {
  return (
    <View>
        <Text style={styles.credito}>
            Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    credito: {
        padding: 10,
        textAlign: 'center',
        color: '#A2A8C3'
    }
})
