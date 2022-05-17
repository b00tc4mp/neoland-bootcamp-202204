// como result es un componente que no tiene estados, es una funcion
// si quisiera meterle estados, seria una class
function Result(props) { // recibo a traves de props el resultado
    return <div className="Result">{Math.round(props.value*100)/100}</div> // devuelvo un div con el valor del resultado
}