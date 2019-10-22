import React  from "react";

const TableMatricula = ( ) => {
  // const blankRow = { concepto: "", monto: ""}
  // const [ rowState, setRowState ] = useState([ {...blankRow} ]);
  // const addRow = (e) => {
  //   e.preventDefault();
  //   setRowState( [...rowState , {...blankRow} ] );
  // } 
  // const lessRow = (e) => {
  //   e.preventDefault();
  //   rowState.pop();
  //   setRowState([ ...rowState ]);
  // };
  // const handleRowChange = (e) => {
  //   const updateRows = [...rowState ]; //creas copia
  //   updateRows[e.target.dataset.id][e.target.className.split(" ")[0]] = e.target.value;
  //   setRowState( updateRows );
  // };
  // const subtotal = (rowState) => {
  //   return rowState.map(({ monto }) => monto).reduce((sum, i) => Number(sum) + Number(i),Number(0));
  // };
  
  return (

         <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">
                #
                  {/*<div>
                    <button className="btn btn-outline-danger btn-sm " onClick={lessRow}>Quitar</button>
                    &nbsp;{rowState.length} &nbsp;
                  <button className="btn btn-outline-info btn-sm " onClick={addRow}>Añadir</button>
                  </div>  */}                
                </th> 
                <th scope="col"> 
                 MATRÍCULA 
                </th>
                <th scope="col">CONCEPTO DE PAGO</th>
                <th scope="col">Monto - Acumlado:  </th>
                <th scope="col"> Acciones</th>               
              </tr>
            </thead>
            <tbody>
            </tbody>            
          </table>
           
  );
} ; 

export default TableMatricula
