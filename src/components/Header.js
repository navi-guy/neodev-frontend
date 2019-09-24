import React,  { useState } from 'react';
import data from '../plantillas/data.json';

const Header = () => {
	const [programaId , setProgramaId] = useState(-1);
	const [ description , setDescription ] = useState(' ');
	const handleProgramaIdChange = (e) => {
		setProgramaId(Number(e.target.value));
		if( Number(e.target.value) !== -1 ){
			const description = data[Number(e.target.value)].desc;
			setDescription(description);	
		} else{
			setDescription(' xd ');
		}
	
	}
		return (
				<div className="container">			
					<h1>&bull; HELLO GAAA &bull; 						
					</h1>
					<div className="row">
						<div className="col-md-4">			 
							<div className="subject form-group">
							  <label >Escoja un programa</label>
							    <select className="form-control"  value={programaId} 
							    	onChange={handleProgramaIdChange}>
							    		<option value="-1" default> Selecciona un prgrama</option>							    					      
											{
												data.map( (programa) => 
													<option key={programa.id} value={programa.id}> 
														{programa.title}
													</option>)
											}  
							    </select>
							</div>
			
						</div> 	
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="costo_credito">Costo crédito</label>
								<input type="number" className="form-control"/>					
							</div>
							
						</div>
						<div className="col-md-4">			 
							<div className="subject form-group">
							  <label >Programa descripción</label>
							    <textarea name="" id="" cols="10" className="form-control" rows="3" 
							    readOnly value={description}>								    			    
							    </textarea>
							</div>
			
						</div> 	
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="costo_credito">Costo total</label>
								<input type="text" className="form-control" value="S/. 322.00" readOnly />	
							</div>
											
						</div>							
					</div>
				</div>
			) 
	}


export default Header;