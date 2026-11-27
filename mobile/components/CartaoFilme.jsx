import { Image, Text, View, StyleSheet} from 'react-native'
import formatarNota from '../src/utils/formatacao'

export default function CartaoFilme({titulo, ano, nota, poster}) {
  return (
    <View style={{flexDirection: 'row' , padding: 10}}>
        {
            poster ? 
                <Image source={{ uri: poster }} style={{ width: 70, height: 105 }} />
            :
            <View style={{ width: 70, height: 105, backgroundColor:'#888888'}}>
                <Text style={{color: '#fff'}}>
                    Sem pôster
                </Text>
            </View>
        }

        <View style={{ alignItems: 'right', padding: 5, color: '#fff' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold'}}>
                {titulo}
            </Text>


            <Text style={{ color: '#fff'}}>
                {ano}
            </Text>


            <Text style={{ color: '#fff'}}>
                {formatarNota(nota)}
            </Text>
        </View>
        
    </View>
  )
}
