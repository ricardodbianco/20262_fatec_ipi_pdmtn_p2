import { Text, View, StyleSheet} from 'react-native'

export default function Cabecalho() {
  return (
    <View>
        <Text style={styles.titulo}>
            🍿 OndePassa
        </Text>
        <Text style={styles.subtitulo}>
            Descubra onde assistir qualquer filme
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    titulo: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 28
    },
    subtitulo: {
        fontSize: 20,
        color: '#A2A8C3'
    }
})