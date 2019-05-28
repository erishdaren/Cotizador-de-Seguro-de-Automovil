import React, {Component} from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import Resultado from './Resultado';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} 
        from '../componentes/helper'

class App extends Component {
  

state = {
 
    resultado : '',
    datos : {}
    
}

cotizarSeguro = (datos) => {
    const { marca, plan, year} = datos;
    // agregar una base de 2000.
    let resultado = 2000; 

    // obtener la diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);
    
    //por cada año restar el 3% al valor del seguro
    resultado -= ((diferencia * 3) * resultado ) / 100;

    //americano 15% asiatico 5% europeo 30% de incremento al valor actual
    resultado = calcularMarca(marca) * resultado;
   
    //plan del auto, basico incrementa el valor 20% y cobertura completa 50%
    let incrementoPlan = obtenerPlan (plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    //crear objeto para el resumen 
    const datosAuto = {
      marca: marca, plan: plan, year: year
    }

    //obtenemos el costo
    this.setState({
      datos: datosAuto,
      resultado : resultado
     
    })

}

  render(){
        return (
             <div className="contenedor">

                  <Header titulo ='Cotizador de Seguro de Auto' />

          <div className = "contenedor-formulario">

                <Formulario 
                      cotizarSeguro = {this.cotizarSeguro} />

                <Resumen 
                      datos = {this.state.datos}//no se muestra en el developertools de react en el elemento chacar porque...?
                      // resultado = {this.state.resultado}
                />
                <Resultado 
                      resultado = {this.state.resultado}
                />
                  </div>                  
               </div> //termina contenedor
               );
           }
}
export default App;
