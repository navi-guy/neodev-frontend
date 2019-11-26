import React, {Component,Fragment } from 'react';

class TablePerfeccionamiento extends Component {  
 
  render(){
    const detalles = this.props.programaDetalle || [] ;
    const detalles_enseñanza = 
    detalles!==[]?detalles.filter(detalle => 
    	(detalle.concepto.concepto === "210024  " || detalle.concepto.concepto === "210011  ")):[];
  
       return (
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">#</th> 
                  <th scope="col">Enseñanza </th>
                  <th scope="col">Concepto de Pago</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Acción</th>                
                </tr>
              </thead>
              <tbody>
                    {detalles_enseñanza.map((detalle, i) => {
                  return (<Fragment key={`fragment_${detalle.programaCiclo.id}_${detalle.concepto.id}`}>
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>Ciclo{detalle.programaCiclo.ciclo}</td>
                        <td>{detalle.concepto.concepto}</td>
                        <td>{detalle.importe}</td>
                        <td>
                          <button className="btn btn-warning">
                          	<i className="large material-icons">create</i>
                          </button>&nbsp;
                        	<button className="btn btn-danger">
                        		<i className="large material-icons">delete</i>
                        	</button>
                        </td>
                      </tr>
                  </Fragment>)
                  })}
              </tbody>            
            </table>                   
    );
  }
} ; 

export default TablePerfeccionamiento