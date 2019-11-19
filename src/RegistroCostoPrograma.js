import React,{Component} from 'react';
import axios from 'axios';
import * as Detalles from './components/detalles';
import Header from './components/Header';
import swal from 'sweetalert';
import './app.css';

const optionsConcepto=[
		{id: 9, label: '210-010' , value: 'MATRICULA DOCTORADO/MAESTRÍA'},//1
		{id: 21, label: '210-011' , value: 'ENSEÑANZA DOCTORADO/MAESTRÍA'},	//2		
		{id: 62, label: '210-024' , value: 'ENSEÑANZA DIPLOMATURA'},	//4
		{id: 117, label: '207-010' , value: 'MATRICULA EPG'}	,//3
	];

class RegistroCostoPrograma extends Component {
	constructor(){
		super();
		this.state = {
			programas : [],			
			description: "",
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
				id_programa_presupuesto_det: '',
				id_programa: -1,
				id_programacion_pagos: -1,
				costo_credito: 0,
				id_programa_ciclo: -1,
				costo_total: 0,
				id_concepto: '',
				creditos: 0,
				importe: '',
				cuotas: 4
			}
		}
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
		if(  e.target.name === 'creditos'){
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
			//console.log(importeCalculado)
		}
		//para cambios en concepto
		if( e.target.name === 'id_concepto' ){
			//console.log(e.target.value);
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

	clearForm = () =>{

	  this.setState( {
			form: {
				...this.state.form,
				importe: ''
			}
		} );
		this.setState(prevState => ({
			    form: {                   
			        ...prevState.form,    
			        id_programa_ciclo: -1,
		          creditos: 0, 
			        id_concepto: -1,
			    }
			}));
	}

	
	handleSubmit = async e =>{
		e.preventDefault();
		console.log( this.state.form);
		try{
			let config = {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				crossdomain: true ,
				body: JSON.stringify(this.state.form)
			}
			let response = await
			fetch('http://costoprogramas-back.herokuapp.com/presupuestos',config)
			let json = await response.json()
			console.log(json);
			this.setState({form: {...this.state.form, importe: ''}	});
			this.setState({form: {...this.state.form, creditos: 0}	});			
			swal("Guardado exitoso!", "", "success");
		}catch( error ){
			console.log('ERROR..');
			swal("Oops, Algo salió mal!!", "", "error");
		}

	}

	handleProgramacionChange = (e) =>{ 
	  this.setState( {
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		} );
		let id_programa = this.state.form.id_programa;
		id_programa = id_programa.toString();
		let id_programacion_pagos= e.target.value;
		id_programacion_pagos =id_programa.toString();
		// let  id_programa_presupuesto_det =id_programa.concat(id_programacion_pagos) ;
		// if( Number(id_programacion_pagos) !== -1 ){
		// 	if (Number(id_programa) !==-1) {				
		// 		this.setState(prevState => ({
		// 			    form: {                   // object that we want to update
		// 			        ...prevState.form,    // keep all other key-value pairs
		// 			        id_programa_presupuesto_det: id_programa_presupuesto_det  // update the value of specific key
		// 			    }
		// 		}));
		// 	}
		// }
		//this.setState( {readOnlyBtn: readOnlyValue} ); 
	  Number(id_programacion_pagos) === -1?this.setState( {cuotas: ""}):
	  	this.setState( {cuotas: Number(e.target.value)*0+4});

	  if (Number(id_programacion_pagos) === -1 || Number(id_programa) === -1) {
			this.setState( {readOnly: true} )
			this.setState( {readOnlyBtn: true} );
 			console.log(id_programacion_pagos);
	  }	else{					 
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
		let creditos = this.state.form.creditos;
			if ( creditos  !== 0 ) {				
				let importeCalculado =0;
				let costo_credito = e.target.value;
				importeCalculado=costo_credito*Number(creditos);
				importeCalculado = Number(importeCalculado);
				this.setState({importeCalculado});
				this.setState(prevState => ({
				    form: {                   // object that we want to update
				        ...prevState.form,    // keep all other key-value pairs
				        importe: importeCalculado       // update the value of specific key
				    }
				}));
			//console.log(importeCalculado)
			}
		//VALIDACION solo cuando es ENSEÑANZA	
		//...	
	}

	handleProgramaChange = e =>{
	  this.setState( {
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
		//handle efectos	
		let id_programa = e.target.value;
		id_programa = id_programa.toString();
		//let id_programacion_pagos= this.state.form.id_programacion_pagos;
		//id_programacion_pagos =id_programa.toString();
		//let  id_programa_presupuesto_det =id_programa.concat(id_programacion_pagos) ;
		if( Number(id_programa) !== -1 ){
			// if (Number(id_programacion_pagos !==-1)) {				
				// this.setState(prevState => ({
				// 	    form: {                   // object that we want to update
				// 	        ...prevState.form,    // keep all other key-value pairs
				// 	        id_programa_presupuesto_det:  9// update the value of specific key
				// 	    }
				// }));
			//}
			this.setState( {readOnly: false} );   	
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
 	  		id_programa_presupuesto_det: '',
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
		axios.get('http://costoprogramas-back.herokuapp.com/programas',{ crossdomain: true })
		.then(response => {
			this.setState({ programas: response.data })			
		})
		.catch( error =>{ console.log(error) 
		});

		axios.get('http://costoprogramas-back.herokuapp.com/programacion-pagos',{ crossdomain: true })
		.then(response => {
			this.setState({ programaciones: response.data })			
		})
		.catch( error =>{ console.log(error) 
		});		
	}
	render(){
		return (
				<div className="app">
					<h3> Registro Costo de Programas
	            <ul id="nav-mobile" className="right  hide-on-med-and-down">
	              <li >
	                  Regresar
	                  <i className="material-icons right">reply</i>
	              </li>
	            </ul>
	        </h3>
	        <div className="container-fluid">
						<Header tipo_grado={this.state.tipo_grado}
											readOnly={this.state.readOnly}
											readOnlyBtn={this.state.readOnlyBtn}
											readOnlyImporte={this.state.readOnlyImporte}
											handleChange={this.handleChange}
											handleSubmit={this.handleSubmit}
											form = {this.state.form}
											cuotas = {this.state.cuotas}
											descripcionConcepto={this.state.descripcionConcepto}
											importeCalculado={this.state.importeCalculado}
											programas = {this.state.programas}
											programaciones = {this.state.programaciones}
											description ={this.state.description}
											esDiplomado ={this.state.esDiplomado}
											handleProgramaChange={this.handleProgramaChange}
											handleProgramacionChange = {this.handleProgramacionChange}
											handleCostoCreditoChange = {this.handleCostoCreditoChange}
											clearForm = {this.clearForm}
											>						
						</Header>
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col-md-12">							
										{this.renderSelectedForm(this.state.tipo_grado)}
									</div>																			
								</div>				
								<div className="row">
									<div className="col-md-12">
										{this.renderSelectedForm2()}
									</div>												
								</div>
							</div>	{/*end.card.body	*/}					
						</div> {/*end.card*/}
					</div>	{/* container-fluid*/}
			</div>
			) 
		}
renderSelectedForm( tipo_grado ){
	 //console.log(tipo_grado);
		if( tipo_grado !== "06" ){
			const Detalle = Detalles["Matricula"];
			return <Detalle />
		}
		
	}
renderSelectedForm2(){
		const Detalle = Detalles["Perfeccionamiento"];
		return <Detalle />		
	}
}

export default RegistroCostoPrograma;