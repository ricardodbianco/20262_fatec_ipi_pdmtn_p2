import { FlatList, Text, View, StyleSheet} from 'react-native'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes({titulo, filmes}) {
  return (
    <View>
        <Text style={{ fontWeight: 'bold', color: '#fff', padding: 10 }}>
            {titulo}
        </Text>
        <FlatList
            data={filmes}
            keyExtractor={(filme) => String(filme.id)}
            renderItem={({ item }) => (
                <CartaoFilme 
                    titulo={item.titulo}
                    ano={item.ano}
                    nota={item.nota}
                    poster={item.poster}
                />
            )}
        />
    </View>
  )
}
