
export default function formatarNota(nota) {
    
    if(nota >= 1) 
        return `★${nota.toFixed(1).replace('.', ',')}`

    return 'Sem nota'
  
}
