import React, {Component,Fragment } from 'react';

class TableMatricula extends Component {  
  // const blankRow = { concepto: "", monto: ""}
  // const [ rowState, setRowState ] = useState([ {...blankRow} ]);
  
  // const subtotal = (rowState) => {
  //   return rowState.map(({ monto }) => monto).reduce((sum, i) => Number(sum) + Number(i),Number(0));
  // };
  
  render(){
    const detalles = this.props.programaDetalle || [] ;
    const detalles_matricula = detalles!==[]?detalles.filter(detalle =>detalle.concepto.concepto === "210010  "):[];//9 es conceptode enseñanza
    const detalles_matricula_epg = detalles!==[]?detalles.filter(detalle =>detalle.concepto.concepto === "207010  "):[];//9 es conceptode enseñanza
       return (
        <div className="row">
          <div className="col-md-6">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th> 
                  <th scope="col">Matrícula </th>
                  <th scope="col">Concepto de Pago</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Acción</th>                
                </tr>
              </thead>
              <tbody>
                    {detalles_matricula.map((detalle, i) => {
                  return (<Fragment key={`fragment_${detalle.programaCiclo.id}_${detalle.concepto.id}`}>
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>Ciclo{detalle.programaCiclo.ciclo}</td>
                        <td>{detalle.concepto.concepto}</td>
                        <td>{detalle.importe}</td>
                        <td>
                          <button className="btn btn-warning" onClick={this.props.btnEdit}
                              importe={detalle.importe}
                              concepto={detalle.concepto.id} 
                              ciclo={detalle.programaCiclo.id}>
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
          </div>
          <div className="col-md-6">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th> 
                  <th scope="col">Matrícula EPG</th>
                  <th scope="col">Concepto de Pago</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Acción</th>               
                </tr>
              </thead>
              <tbody>
                    {detalles_matricula_epg.map((detalle, i) => {
                  return (<Fragment key={`fragment_${detalle.programaCiclo.id}_${detalle.concepto.id}`}>
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>Ciclo&nbsp;{detalle.programaCiclo.ciclo}</td>
                        <td>{detalle.concepto.concepto}</td>
                        <td>{detalle.importe}</td>
                        <td>
                          <button className="btn btn-warning" onClick={this.props.btnEdit}
                              importe={detalle.importe}
                              concepto={detalle.concepto.id} 
                              ciclo={detalle.programaCiclo.id}>
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
          </div>
        </div>                   
    );
  }
} ; 

export default TableMatricula
