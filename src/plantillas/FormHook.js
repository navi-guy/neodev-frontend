import React , { useState } from "react"
const FormHook = () => {
  const [ ownerState, setOwnerState ] = useState([ {
    owner: '',
    description: ''
  } ]);
  const blankCat = { name: '' , age: '' } ;
  const [ catState , setCatState ] = useState([ {...blankCat} ]);
  const blankRow = { concepto: "", monto: ""}
  const [ rowState, setRowState ] = useState([ {...blankRow} ]);

  const addRow = (e) => {
    e.preventDefault();
    setRowState( [...rowState , {...blankRow} ] );
  }

 

  const handleRowChange = (e) => {
    const updateRows = [...rowState ]; //creas copia
    updateRows[e.target.dataset.id][e.target.className.split(" ")[0]] = e.target.value;
    setRowState( updateRows );
  };

  const handleOwnerChange = (e) => setOwnerState({
    ...ownerState,
    [ e.target.name ]: [ e.target.value],
  });
  
  const addCat = (e) => {     
    e.preventDefault() ;
    setCatState( [...catState, {...blankCat} ] );
  } ; 

  const lessRow = (e) => {
    e.preventDefault();
    rowState.pop();
    setRowState([ ...rowState ]);
  };


  const handleCatChange = (e) => {
    const updatedCats = [ ...catState ];
    updatedCats[e.target.dataset.id][e.target.className.split(" ")[0]] = e.target.value;
    setCatState( updatedCats );
  }; 

  return (
    <div className="container">
      <form >
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="owner">Owner</label> 
              <input type="text" className="form-control" value={ownerState.owner || ''} 
                onChange={handleOwnerChange} name="owner" id="owner" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="description">Description</label> 
              <input type="text" className="form-control"  name="description" 
                value={ownerState.description || ''} onChange={handleOwnerChange} id="description" />
            </div>
          </div>
        </div> 
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary float-left" onClick={addCat}>Add new cat</button>
            <input type="submit" className="float-right" value="Submit" />  
          </div>             
        </div>
        <br />        
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
                <th scope="col">MONTO</th>               
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
          {catState.map((val, idx) => {
            const catId = `name-${idx}`;
            const ageId = `age-${idx}`;
              return (            
                <div key={`cat-${idx}`} style={{ borderStyle: 'solid', padding: '10px 5px 15px 20px'}}>
                  <div  className="form-group">
                    <label htmlFor={catId}>{`CAT #${idx +1}`}</label>
                    <input type="text"  name={catId} id={catId}  data-id={idx}
                    className="name form-control" value={catState[idx].name} onChange={handleCatChange}/>                  
                  </div>
                  <div  className="form-group">
                    <label htmlFor={ageId} >Age</label>
                    <input type="text"  name={ageId} id={ageId}  data-id={idx} 
                    className="age form-control" value={catState[idx].age}  onChange={handleCatChange}/>               
                  </div>
                </div>
                )
          })
        }
      </form>
    </div>    
  );
} ; 

export default FormHook