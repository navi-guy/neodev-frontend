import React , { useState } from "react";

const TableMatricula = ( ) => {
  const blankRow = { concepto: "", monto: ""}
  const [ rowState, setRowState ] = useState([ {...blankRow} ]);
  const addRow = (e) => {
    e.preventDefault();
    setRowState( [...rowState , {...blankRow} ] );
  } 
  const lessRow = (e) => {
    e.preventDefault();
    rowState.pop();
    setRowState([ ...rowState ]);
  };
  const handleRowChange = (e) => {
    const updateRows = [...rowState ]; //creas copia
    updateRows[e.target.dataset.id][e.target.className.split(" ")[0]] = e.target.value;
    setRowState( updateRows );
  };
  const subtotal = (rowState) => {
    return rowState.map(({ monto }) => monto).reduce((sum, i) => Number(sum) + Number(i),Number(0));
  };
  
  return (

         <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">
                  <div>
                    <button className="btn btn-outline-danger btn-sm " onClick={lessRow}>Quitar</button>
                    &nbsp;{rowState.length} &nbsp;
                  <button className="btn btn-outline-info btn-sm " onClick={addRow}>Añadir</button>
                  </div>                  
                </th> 
                <th scope="col"> 
                 MATRÍCULA UPG
                </th>
                <th scope="col">CONCEPTO DE PAGO</th>
                <th scope="col">Monto - Acumlado: {subtotal(rowState)}  </th>               
              </tr>
            </thead>
            <tbody>
            { rowState.map((val, idx ) => {
              const conceptoId = `concepto-${idx}`;
              const montoId =  `monto-${idx}`;
                return (
                  <tr key={`row-${idx}`}>
                    <td><b>{`#${idx +1}`} </b></td>
                    <td>{`${idx+1}° CICLO`}</td>
                    <td>
                      <div className="form-group">
                        <input type="text" name={conceptoId} id={conceptoId} 
                          placeholder="Ingrese concepto"  data-id={idx} value={rowState[idx].concepto}
                          onChange={handleRowChange} className="concepto form-control" />
                      </div>  
                    </td>
                    <td>
                      <div className="form-group">
                        <input type="text" name={montoId} id={montoId} 
                          placeholder="Ingrese monto"  data-id={idx} value={rowState[idx].monto}
                          onChange={handleRowChange} className="monto form-control" />
                      </div>  
                    </td>
                  </tr>
                  )
              })
            }                          
            </tbody>            
          </table>
           
  );
} ; 

export default TableMatricula