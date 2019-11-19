import React, {Component} from 'react';
import axios from 'axios';
import * as Detalles from './detalles';

const optionsConcepto=[
		{id: 9, label: '210-010' , value: 'MATRICULA DOCTORADO/MAESTRÍA'},//1
		{id: 21, label: '210-011' , value: 'ENSEÑANZA DOCTORADO/MAESTRÍA'},	//2		
		{id: 62, label: '210-024' , value: 'ENSEÑANZA DIPLOMATURA'},	//4
		{id: 117, label: '207-010' , value: 'MATRICULA EPG'}	,//3
	];

class Create extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedOptionConcepto: -1,
			programa_ciclos: [],
			selectedOptionCiclo: null,
			descripcion: "",		
			ciclo_selected: -1
		}
		this.handleProgramaCicloChange = this.handleProgramaCicloChange.bind(this);  
	}

	handleProgramaCicloChange(e) {
	  this.setState( {ciclo_selected: Number(e.target.value) } );	  
	}	

	componentDidUpdate(prevProps){
		// Uso tipico (no olvides de comparar los props):https://cors-anywhere.herokuapp.com/
	  if (this.props.tipo_grado !== prevProps.tipo_grado) {
	   axios.get('https://costoprogramas-back.herokuapp.com/programa-ciclos/'+this.props.tipo_grado)		
			.then(response => {
				this.setState({ programa_ciclos: response.data })			
			})
			.catch( error =>{ console.log(error) 
			});
	  }				
	}

	handleChangeImporte = e =>{
		this.props.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
	}

 	handleChangeCiclo = selectedOptionCiclo => {
	    this.setState({ selectedOptionCiclo });   
  	};


	render(){	
		return (					
					<div className="card">
					  <div className="card-body">
					  	<div className="row">
					  		<div className="col-md-4">
					  			<div className="subject form-group">
									  <b> Trámite</b>
									  <input type="text" value={this.props.concepto}
									  className="form-control" readOnly/>									    
									</div>								
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<b> Concepto</b>
					  				<select className="form-control" name="id_concepto"
					  				disabled={this.props.readOnly}
					  				 value={this.props.form.id_concepto} 
								    	onChange={this.props.onChange}>
								    	<option value="-1" default>Choose</option>							    					      
												{
												 optionsConcepto.map( (concepto) => 
														<option key={concepto.id} value={concepto.id}> 
															{concepto.label}
														</option>)
												}
					  				</select>
					  				
					  			</div>					  			
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<b> Ciclo</b>
					  				<select className="form-control"  name="id_programa_ciclo"					  				
					  					disabled={this.props.readOnly}
					  					value={this.props.form.id_programa_ciclo} 
								    	onChange={this.props.onChange}>	
								    	<option value="-1" default>Choose</option>							    								    					      
												{
													this.state.programa_ciclos.map( (ciclo) => 
														<option key={ciclo.id} value={ciclo.id}> 
															{ciclo.ciclo}
														</option>)
												}  
								    </select>
					  			</div>					  			
					  		</div>					  		
					  		<div className="col-md-2">
						  		<div className="subject form-group">
										<b> Importe</b>										
										<input type="text"  placeholder="Importe" name="importe"
										  className="form-control" value={this.props.form.importe} 
										  onChange={this.props.onChange}
										   readOnly={this.props.readOnlyImporte} required/>									    
									</div>					  			
					  		</div>
					  		<div className="col-md-2">
					  		{this.renderSelectedForm(this.props.form.id_concepto)}						  							  			
					  		</div>					  		
					  	</div>{/* end.row*/}
					  	<div className="row">
					  		<div className="col s12">
					  			<div className=" float-right">
											<button className="btn waves-effect waves-light" type="submit" disabled={this.props.readOnlyBtn}>
									 		  <i className="material-icons left">save</i>		
									 		  Guardar							 		 
											</button>
					  				 &nbsp;
									  	<button className="btn red" type="button" onClick={this.props.clearForm}>
									  		 <i className="large material-icons left">cancel</i>	Limpiar
									  	</button>								 		 								 		 
				
					  			</div>									
								</div>
					  	</div>	{/*	end.row		*/}  	
					  </div> {/*end.card-body*/}
					</div>
		)
	}

	renderSelectedForm( concepto ){
		if(Number(concepto) === 21 || Number(concepto) === 62 ){
				//console.log('ingreso!');
					const Creditos = Detalles["Creditos"];
					return <Creditos form={this.props.form.creditos} onChange={this.props.onChange}/>
				}
	 }
}

export default Create;