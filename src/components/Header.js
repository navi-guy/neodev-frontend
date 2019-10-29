import React,{Component} from 'react';
import axios from 'axios';
import * as Forms from './forms';
import Create from './Create';
import swal from 'sweetalert';

const optionsConcepto=[
		{id: 9, label: '210-010' , value: 'MATRICULA DOCTORADO/MAESTRÍA'},//1
		{id: 21, label: '210-011' , value: 'ENSEÑANZA DOCTORADO/MAESTRÍA'},	//2		
		{id: 62, label: '210-024' , value: 'ENSEÑANZA DIPLOMATURA'},	//4
		{id: 117, label: '207-010' , value: 'MATRICULA EPG'}	,//3
	];


class Header extends Component {
	constructor(){
		super();
		this.state = {
			programas : [],			
			description: "gaa",
			descripcionConcepto: "",
			programaciones: [],
			tipo_grado: "-1",
			cuotas: "",
			importeCalculado: 0,
			readOnly: true,
			readOnlyBtn: true,
			esDiplomado: false,
			readOnlyImporte: true,
			form: {
				id_programa: -1,
				id_programacion_pagos: -1,
				costo_credito: 0,
				costo_total: '',
				id_concepto: '',
				id_programa_ciclo: '',
				creditos: 0,
				importe: '',
				cuotas: ''
			}
		}
	this.handleProgramaChange = this.handleProgramaChange.bind(this);  
	this.handleProgramacionChange = this.handleProgramacionChange.bind(this);	
	}



	handleChange = e =>{
		//<CREATE /> HANDLE CHANGE
		//console.log('cambió algo del componente hijo')

		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});	
		//para cambios en creditos
		if(  e.target.name === 'creditos' ){
			//calcaular IMPORTE
			let creditos = e.target.value;
			let importeCalculado =0;
			let costo_credito = this.state.form.costo_credito;
			importeCalculado=costo_credito*Number(creditos);
			importeCalculado = Number(importeCalculado);
			this.setState({importeCalculado});
			this.setState(prevState => ({
			    form: {                   // object that we want to update
			        ...prevState.form,    // keep all other key-value pairs
			        importe: importeCalculado       // update the value of specific key
			    }
			}));
		//	console.log(importeCalculado)

		}
		//para cambios en concepto
		if( e.target.name === 'id_concepto' ){
			if( Number(e.target.value) !== -1 ){
			  if( Number(e.target.value) === 9 || Number(e.target.value) === 117){
					this.setState({ readOnlyImporte: false });//MATRICULA					
					}else{
					this.setState({ readOnlyImporte: true });//ENSEÑANZA
					}			
					optionsConcepto.forEach( (programa) =>{				
						if( programa.id === Number(e.target.value) ){
							this.setState( {descripcionConcepto: programa.value } );				  	
				  	}
					});		
			}else{		 	  	
				 	this.setState( {descripcionConcepto: "" } ); 	 	
				}
		}

		let importe = this.state.form.importe;
		if(  importe !== ''){
			this.setState({readOnlyBtn: false});				
		}else{
			this.setState({readOnlyBtn: true});	
		}
	//	this.state.readOnlyBtn
	}

	handleSubmit = async e =>{
		e.preventDefault()
		console.log(this.state.form)
		try{
			let config = {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			}
			let response = await
			fetch('https://cors-anywhere.herokuapp.com/http://costoprogramas-back.herokuapp.com/presupuesto_store',config)
			let json = await response.json()
			console.log(json);
			swal("Guardado exitoso!", "", "success");
			console.log('paso guardado')
		}catch( error ){
			console.log('ERROR..');
			swal("Oops, Algo salió mal!!", "", "error");
		}

	}

	handleProgramacionChange(e) {
	  this.setState( {
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		} );
		let id_programa = this.state.form.id_programa;
		//this.setState( {readOnlyBtn: readOnlyValue} ); 
	  if (Number(e.target.value) === -1 || Number(id_programa) === -1) {
			this.setState( {cuotas: ""})
			this.setState( {readOnly: true} )
			this.setState( {readOnlyBtn: true} );
 			
	  }	else{
			this.setState( {cuotas: Number(e.target.value)+3})		 
			this.setState( {readOnly: false} );	
			this.setState( {readOnlyBtn: true} );	 
	  }  	  

	}

	handleCostoCreditoChange = e =>{
	  this.setState( {
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		} );
		//VALIDACION solo cuando es ENSEÑANZA	
		//...	
	}

	handleProgramaChange(e) {
	  this.setState( {
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		} );
		let id_programacion_pagos = this.state.form.id_programacion_pagos;

		if( Number(e.target.value) !== -1 ){

			if ( Number(id_programacion_pagos) !== -1  ) {
				console.log(id_programacion_pagos)
				this.setState( {readOnly: false} ); 	  
			}		
			this.state.programas.forEach( (programa) =>{				
				if( programa.id === Number(e.target.value) ){
			  	this.setState( {description: programa.nombrePrograma } );
			  	this.setState( {tipo_grado: programa.tipoGrado.id } );
			  	//console.log(programa.tipoGrado.id); 
			  }
			});		
 	  }else{
 	  	//Mejorar luego, clean inputs
 	  	this.setState( {form: {
				id_programa: -1,
				id_programacion_pagos: -1,
				costo_credito: '',
				costo_total: '',
				id_concepto: '',
				id_programa_ciclo: '',
				creditos: '',
				importe: '',
				cuotas: ''
				} } );
 	  	this.setState( {description: "" } );	
 	  	this.setState( {tipo_grado: -1 } );
 	  	this.setState( {readOnly: true} ); 
 	  	this.setState( {readOnlyBtn: true} ); 	  	
 	  }
	}

	componentDidMount(){
		axios.get('https://cors-anywhere.herokuapp.com/http://costoprogramas-back.herokuapp.com/programas')
		.then(response => {
			this.setState({ programas: response.data })			
		})
		.catch( error =>{ console.log(error) 
		});

		axios.get('https://cors-anywhere.herokuapp.com/http://costoprogramas-back.herokuapp.com/programacion_pagos')
		.then(response => {
			this.setState({ programaciones: response.data })			
		})
		.catch( error =>{ console.log(error) 
		});		
	}
	
	
	render(){
		return (
				<div className="container">			
					<h1>&bull; RF21-Registrar Costos de Programas &bull; 						
					</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-md-2">			 
								<div className="subject form-group">
								  <label ><b>Escoja un programa</b></label>
								    <select className="form-control"  value={this.state.form.id_programa} 
								    	onChange={this.handleProgramaChange} name="id_programa">
								    		<option value="-1" default>Choose</option>							    					      
												{
													this.state.programas.map( (programa) => 
														<option key={programa.id} value={programa.id}> 
															{programa.siglaPrograma}
														</option>)
												}  
								    </select>
								</div>			
							</div>
							<div className="col-md-8">			 
								<div className="subject form-group">
								  <label > <b>Programa descripción</b> </label>
								    <textarea name="" id="" cols="10" className="form-control" rows="2" 
								    readOnly value={this.state.description}>								    			    
								    </textarea>
								</div>			
							</div>

							<div className="col-md-2">
								<div className="form-group ">
									<label htmlFor="costo_total"><b>Costo Total</b> </label>
									<input type="text" value="S/ 0.00" className="form-control bg-info text-white" readOnly/>					
								</div>							
							</div>
						</div>
						<div className="row">
							<div className="col-md-8">			 
								<div className="subject form-group">
								  <label ><b>Escoja la programación de pagos</b> </label>
								    <select className="form-control"  name="id_programacion_pagos"
								    value={this.state.form.id_programacion_pagos} 
								    	onChange={this.handleProgramacionChange}>
								    		<option value="-1" default>Choose</option>							    					      
												{
													this.state.programaciones.map( (programa) => 
														<option key={programa.id} value={programa.id}> 
															{programa.fechaVigenciaInicio.concat(" hasta "+programa.fechaVigenciaFin) }
														</option>)
												}  
								    </select>
								</div>			
							</div>	
							<div className="col-md-2">
								<div className="form-group">
									<label htmlFor="tipo_presupuesto"><b>Cuotas</b> </label>
									<input type="text" className="form-control"
										value={this.state.cuotas} readOnly/>
								    																															
								    			
								</div>							
							</div>
							<div className="col-md-2">
								<div className="form-group">
									<label htmlFor="costo_credito"> <b> Costo Crédito</b> 									
									</label>
									<input type="text" className="form-control" placeholder={`Costo crédito`}
										value={this.state.form.costo_credito} name="costo_credito" onChange={this.handleCostoCreditoChange}/>	
								</div>											
							</div>									
						</div>	
						<div className="row">
							<div className="col-md-12">
								<Create tipo_grado={this.state.tipo_grado}
									readOnly={this.state.readOnly}
									readOnlyBtn={this.state.readOnlyBtn}
									readOnlyImporte={this.state.readOnlyImporte}
									onChange={this.handleChange}
									onSubmit={this.handleSubmit}
									form = {this.state.form}
									concepto={this.state.descripcionConcepto}
									importeCalculado={this.state.importeCalculado}
									/>
							</div>												
						</div>
					</form>	{/*end.form*/}
					< br />
					<div className="container">
						<div className="row">
						<div className="col-md-12">
						<div className="card">
							<div className="card-body">
								{this.renderSelectedForm(this.state.tipo_grado)}
							</div>
						</div>
							
						</div>												
					</div>
					</div>
					
					< br />
					<div className="row">
						<div className="col-md-12">
							{this.renderSelectedForm2()}
						</div>												
					</div>
				</div>
			) 
		}
renderSelectedForm( tipo_grado ){
	 //console.log(tipo_grado);
		if( tipo_grado !== "06" ){
			const Formulario = Forms["Matricula"];
			return <Formulario />
		}
		
	}
renderSelectedForm2(){
		const Formulario = Forms["Perfeccionamiento"];
		return <Formulario />		
	}
}

	

export default Header;