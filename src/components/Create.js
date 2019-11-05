import React, {Component} from 'react';
// import Select from 'react-select';
import axios from 'axios';
import * as Forms from './forms';

const optionsConcepto=[
		{id: 9, label: '210-010' , value: 'MATRICULA DOCTORADO/MAESTRÍA'},//1
		{id: 21, label: '210-011' , value: 'ENSEÑANZA DOCTORADO/MAESTRÍA'},	//2		
		{id: 62, label: '210-024' , value: 'ENSEÑANZA DIPLOMATURA'},	//4
		{id: 117, label: '207-010' , value: 'MATRICULA EPG'}	,//3
	];

class Create extends Component {
	constructor(){
		super();
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
		// Uso tipico (no olvides de comparar los props):
	  if (this.props.tipo_grado !== prevProps.tipo_grado) {
	   axios.get('https://cors-anywhere.herokuapp.com/http://costoprogramas-back.herokuapp.com/programa-ciclos/'+this.props.tipo_grado)		
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
		<div className="container">
			<div className="row">
				<div className="col-md-12">					
					<div className="card">
					  <div className="card-body">
					  	<div className="row">
					  		<div className="col-md-4">
					  			<div className="subject form-group">
									  <label><b> Trámite</b></label>
									  <input type="text" value={this.props.concepto}
									  className="form-control" readOnly/>									    
									</div>								
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<label><b> Concepto</b></label>
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
					  				<label><b> Ciclo</b></label>
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
										<label><b> Importe</b></label>										
										<input type="text"  placeholder="" name="importe"
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
					  		<div className="col-md-12">
					  			<div className=" float-right">
					  				<button className="btn btn-success " type="submit" disabled={this.props.readOnlyBtn}>
										Guardar
									</button> &nbsp;
									<button className="btn btn-danger" type="button">
										Limpiar
									</button>
					  			</div>									
								</div>
					  	</div>				  	
					  </div>
					</div>
				</div>
		  </div>
		</div>
		)
	}

	renderSelectedForm( concepto ){
		if(Number(concepto) === 21 || Number(concepto) === 62 ){
				//console.log('ingreso!');
					const Formulario = Forms["Creditos"];
					return <Formulario form={this.props.form.creditos} onChange={this.props.onChange}/>
				}
	 }
}

export default Create;