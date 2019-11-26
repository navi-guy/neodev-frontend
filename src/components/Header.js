import React,{Component} from 'react';
import Create from './Create';


class Header extends Component {

	focus = () => {
		let $costo_credito = document.getElementById("costo_credito");
		$costo_credito.focus();
	}

	reload = () => ( window.location.reload(true) )	

	render(){

		return (		
						<form onSubmit={this.props.handleSubmit}>					
							<div className="card">
								<div className="card-header">
									<div>	
										<div className="float-left">	
											<span className="badge" style={{fontSize: '13px'}} >
											{this.props.description}
											</span>
										</div>
										<div className="float-left">
											{this.props.form.costo_credito===0?"":" - CostoCrédito"}
											<span className="badge badge-info" style={{color: 'black'}}>
											{this.props.form.costo_credito===0?'':'S/. '+this.props.form.costo_credito}
											</span>
										</div>																  
									</div>
									<div className="float-right">
										<button type="button" className="btn waves-effect waves-light"
										 data-toggle="collapse" data-target="#collapseExample"
										 aria-expanded="false" aria-controls="collapseExample">
											<i className="material-icons"> visibility</i>
										</button>
										&nbsp;
										<button type="button" onClick={this.reload} className="btn waves-effect waves-light">
														<i className="material-icons">add</i>
										</button>							
									</div>
								</div>
								<div className="card-body collapse show" id="collapseExample">
									<div className="row">
										<div className="col-md-2">			 
											<div className="subject form-group">
											  	<b>Escoja un programa</b>
											    <select className="form-control" value={this.props.form.id_programa} 
											    	onChange={this.props.handleProgramaChange} name="id_programa">
											    		<option value="-1" default>Choose</option>							    					      
															{
																this.props.programas.map( (programa) => 
																	<option key={programa.id} value={programa.id}> 
																		{programa.siglaPrograma}
																	</option>)
															}  
											    </select>
											</div>			
										</div>
										<div className="col-md-8">			 
											<div className="subject form-group">
											  <b>Programa descripción</b>
											    <textarea name="" id="" cols="10" className="form-control" rows="2" 
											    readOnly value={this.props.description}>								    			    
											    </textarea>
											</div>			
										</div>
										<div className="col-md-2">
											<div className="form-group ">
												<b>Costo Total</b>
												<input type="text" style={{textAlign: 'center', fontWeight: 'bold'}} 
												value={`S/. ${this.props.programaPresupuesto.costoTotal||'0.00'}`}
												className="form-control bg-info text-white" readOnly/>					
											</div>							
										</div>
									{/*</div> 
									<div className="row">*/}
										<div className="col-md-4">			 
											<div className="subject form-group">
											  <b>Escoja la programación de pagos</b>
											    <select className="form-control"  name="id_programacion_pagos"
											    value={this.props.form.id_programacion_pagos} 
											    	onChange={this.props.handleProgramacionChange}>
											    		<option value="-1" default>Choose</option>							    					      
															{
																this.props.programaciones.map( (programacion) => 
																	<option key={programacion.id} value={programacion.id}> 
																		{programacion.fechaVigenciaInicio.concat(" hasta "+programacion.fechaVigenciaFin) }
																	</option>)
															}  
											    </select>
											</div>			
										</div>	
										<div className="col-md-3">
											<div className="form-group">
												<b>Cuotas</b>
												<input type="text" className="form-control"
													value={this.props.cuotas} readOnly/>						    																																						    			
											</div>							
										</div>
										<div className="col-md-3">
											<div className="form-group">
												 <b> Costo Crédito</b> 									
												<input type="text" id="costo_credito" className="form-control" placeholder={`Costo crédito`}
													value={this.props.programaPresupuesto.costoCredito||this.props.form.costo_credito} name="costo_credito" 
													onChange={this.props.handleCostoCreditoChange}/>	
											</div>											
										</div>	
										<div className="col-md-2" >
											<button className="btn waves-effect waves-light" onClick={this.focus}
											 type="button">
												<i className="material-icons">create</i> 
											</button>
											&nbsp;
											<button className="btn waves-effect waves-light" id="save-header"  type="button">
												<i className="material-icons">save</i> 
											</button>
										</div>								
									</div>	{/*end.row*/}
								</div>	{/*end.card.body	*/}					
							</div> {/*end.card*/}
						<Create 
									  tipo_grado={this.props.tipo_grado}
										readOnly={this.props.readOnly}
										readOnlyBtn={this.props.readOnlyBtn}
										readOnlyImporte={this.props.readOnlyImporte}
										onChange={this.props.handleChange}
										onSubmit={this.props.handleSubmit}
										form = {this.props.form}
										concepto={this.props.descripcionConcepto}
										importeCalculado={this.props.importeCalculado}
										clearForm = {this.props.clearForm}
										> 
						</Create>
					</form>	
			) 
		}
}

export default Header;