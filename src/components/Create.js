import React, {Component} from 'react';
// import Select from 'react-select';
import axios from 'axios';
import * as Forms from './forms';

const optionsConcepto=[
		{id: 1, label: '210-010' , value: 'MATRICULA DOCTORADO/MAESTRÍA'},
		{id: 2, label: '210-011' , value: 'ENSEÑANZA DOCTORADO/MAESTRÍA'},	
		{id: 3, label: '207-010' , value: 'MATRICULA EPG'}	,
		{id: 4, label: '210-024' , value: 'ENSEÑANZA DIPLOMATURA'},	
	];
// const optionsConcepto2=[
// 		{label: '210-024' , value: 'ENSEÑANZA DIPLOMATURA'}		
// 	];
	//para el tipo de grado 3
// const optionsCiclo=[
// 		{label: '1' , value: '1'},
// 		{label: '2' , value: '2'},
// 		{label: '3' , value: '3'},
// 		{label: '4' , value: '4'}
// 	];
class Create extends Component {
	constructor(){
		super();
		this.state = {
			selectedOptionConcepto: -1,
			programa_ciclos: [],
			// readOnly: true,
			selectedOptionCiclo: null,
			descripcion: "",
			readOnly: true,
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
	   axios.get('https://cors-anywhere.herokuapp.com/http://costoprogramas-back.herokuapp.com/programa_ciclos/'+this.props.tipo_grado)		
			.then(response => {
				this.setState({ programa_ciclos: response.data })			
			})
			.catch( error =>{ console.log(error) 
			});

	  }
				
	}

 	handleChangeCiclo = selectedOptionCiclo => {
	    this.setState({ selectedOptionCiclo });   
  	};

 	handleChangeConcepto = e => {
	    
	    this.setState( {selectedOptionConcepto: e.target.value } );
	    	if( Number(e.target.value) !== -1 ){
	    		//console.log(e.target.value);
		    	if( Number(e.target.value) === 1 || Number(e.target.value) === 3){
		    		//console.log(e.target.value);
						this.setState({ readOnly: false });
					 }else{
						this.setState({ readOnly: true });
					}			
					optionsConcepto.forEach( (programa) =>{				
						if( programa.id === Number(e.target.value) ){
					  	this.setState( {descripcion: programa.value } );				  	
					  }
					});		
			 	  }else{		 	  	
			 	  	this.setState( {descripcion: "" } ); 	 	
			 	  }
  
  };	
	render(){	
	//const { selectedOptionConcepto } = this.state;
	// const { selectedOptionCiclo } = this.state;	
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
									  <input type="text" value={this.state.descripcion}
									  className="form-control" readOnly/>									    
									</div>								
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<label><b> Concepto</b></label>
					  				<select className="form-control" readOnly={this.props.readOnly}
					  				 value={this.state.selectedOptionConcepto} 
								    	onChange={this.handleChangeConcepto}>
								    	<option value="-1" default>Choose</option>							    					      
												{
												 optionsConcepto.map( (ciclo) => 
														<option key={ciclo.id} value={ciclo.id}> 
															{ciclo.label}
														</option>)
												}
					  				</select>
					  				
					  			</div>					  			
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<label><b> Ciclo</b></label>
					  				<select className="form-control"  value={this.state.ciclo_selected} 
								    	onChange={this.handleProgramaCicloChange}>
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
										<input type="text"  placeholder=""
										  className="form-control" readOnly={this.state.readOnly} />									    
									</div>					  			
					  		</div>
					  		<div className="col-md-2">
					  		{this.renderSelectedForm(this.state.selectedOptionConcepto)}						  							  			
					  		</div>					  		
					  	</div>{/* end.row*/}
					  	<div className="row">
					  		<div className="col-md-12">
					  			<div className=" float-right">
					  				<button className="btn btn-success " disabled={this.props.readOnly}>
										Guardar
									</button> &nbsp;
									<button className="btn btn-danger">
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
		if(Number(concepto) === 2 || Number(concepto) === 4 ){
				//console.log('ingreso!');
					const Formulario = Forms["Creditos"];
					return <Formulario />
				}
				else{
					//console.log('no ingresó');
				}
	 }
}

export default Create;