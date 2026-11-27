import { useState } from 'react';
import { TextInput, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Busca({termo, onTermoAlterado, onBuscar, onLimpar}) {
  
  return (
    <View style={{padding: 10,  width: '100%'}}>
        {/* campo de texto controlado: o valor vem do estado e cada alteração o atualiza */}
        <TextInput  style={{color:'#fff', backgroundColor:'#22263F', padding: 10, }} value={termo} onChangeText={onTermoAlterado} placeholder="Digite o título de um filme" />
        
        {
            termo !== '' ?
                <Pressable
                    onPress={() => {
                        onLimpar()
                    }}
                >
                    <Text style={{color: '#fff'}}>
                        X
                    </Text>
                </Pressable>
            : null 
        }

        <Pressable
            style={{color:'#fff', backgroundColor:'#22263F', padding: 10, }}
            onPress={() => {
                onBuscar()
            }}
        >
            <Text>
                Buscar
            </Text>

        </Pressable>
        
    </View>
  )
}
