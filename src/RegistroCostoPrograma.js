import React,{Component} from 'react';
import axios from 'axios';
import * as Detalles from './components/detalles';
import Header from './components/Header';
import swal from 'sweetalert';
//import './app.css';

const optionsConcepto=[
		{id: 9, label: '210-010' , value: 'MATRICULA DOCTORADO/MAESTRÍA'},
		{id: 21, label: '210-011' , value: 'ENSEÑANZA DOCTORADO/MAESTRÍA'},		
		{id: 62, label: '210-024' , value: 'ENSEÑANZA DIPLOMATURA'},	
		{id: 117, label: '207-010' , value: 'MATRICULA EPG'}	
	];

class RegistroCostoPrograma extends Component {
	constructor(){
		super();
		this.state = {
			programas : [],			
			programaDetalle: [],
			programaPresupuesto: "",
			description: "",
			descripcionConcepto: "",
			programaciones: [],
			tipo_grado: "-1",
			cuotas: "",
			importeCalculado: 0,
			tipo_save: 0,
			readOnly: true,
			readOnlyBtn: true,
			esDiplomado: false,
			readOnlyImporte: true,
			readOnlyHeader: false,
			readOnlyCostoCredito: false,
			form: {
				id_programa_presupuesto: -1,
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



	createEditableEnseñanza= (e) => {	
		let $importe = document.getElementById("importe");
		let importe_edit = e.currentTarget.getAttribute('importe');		
		let ciclo_edit =  e.currentTarget.getAttribute('ciclo');
		let concepto_edit =  Number(e.currentTarget.getAttribute('concepto'));
		let creditos_edit = Number(e.currentTarget.getAttribute('creditos'));
		$importe.readOnly = true;
		console.log(creditos_edit);
		this.setState({tipo_save: 2});
		//change Description CIclo					
		optionsConcepto.forEach( (programa) =>{				
			if( programa.id === concepto_edit ){
				this.setState( {descripcionConcepto: programa.value } );				  	
			}
		});
		this.setState(prevState =>  ({
			form: {
				...prevState.form,
				id_concepto: concepto_edit,	
				importe: importe_edit,
				id_programa_ciclo: ciclo_edit,
				creditos: creditos_edit
			}
		}) );					
		window.scrollTo(0, 0);
		$importe.focus();
	}

	createEditableMatricula= (e) => {	
		let $importe = document.getElementById("importe");
		let importe_edit = e.currentTarget.getAttribute('importe');		
		let ciclo_edit =  e.currentTarget.getAttribute('ciclo');
		let concepto_edit =  Number(e.currentTarget.getAttribute('concepto'));
		let stateUpdateDetalle = 2;
		$importe.disabled = false;
		$importe.readOnly = false;	
		this.changeTipoSave(stateUpdateDetalle);
		//change Description CIclo					
		optionsConcepto.forEach( (programa) =>{				
			if( programa.id === concepto_edit ){
				this.setState( {descripcionConcepto: programa.value } );				  	
			}
		});
		this.setState( {
			form: {
				...this.state.form,
				importe: importe_edit,
				id_programa_ciclo: ciclo_edit,
				id_concepto: concepto_edit
			}
		} );
		window.scrollTo(0, 0);
		$importe.focus();
	}

	changeTipoSave = (tipo) =>{
		this.setState({tipo_save: tipo});
	}

	clearForm = () =>{
	  this.setState( {
			form: {
				...this.state.form,
				importe: ''
			}
		} );
		this.setState({descripcionConcepto: ""});
		let stateCreateDetalle = 1;
		this.changeTipoSave(stateCreateDetalle);
		this.setState(prevState => ({
			    form: {                   
			        ...prevState.form,    
			        id_programa_ciclo: -1,
		          creditos: 0, 
			        id_concepto: -1,
			    }
			}));
	}
/*---------------------------------DELETE DETALLE PROGRAMA PRESUPUESTO------------------------------------*/
	btnDeleteDetalle = (e) => {

		let ciclo_delete =  e.currentTarget.getAttribute('ciclo');
		let concepto_delete =  Number(e.currentTarget.getAttribute('concepto'));
		let url ='https://cors-anywhere.herokuapp.com/https://costoprogramas-back.herokuapp.com/presupuesto-detalles?'
								+'id-ciclo='+ciclo_delete
								+'&id-concepto='+concepto_delete
								+'&id-presupuesto='+this.state.form.id_programa_presupuesto;
			swal({
			  title: "Estás seguro?",
			  text: "Una vez hayas eliminado, no podrás recuperar el registro!",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			    axios.delete(url).then(res => {
			      	console.log(res);
			      	this.callProgramaPresupuestoDetalles();					
								swal("Poof! Tu registro detalle presupuesto ha sido eliminado!", {
								   icon: "success",
								 });       
			      }).catch(err => {
			        console.log(err);
			      });
  				} else {
			    swal("Tu registro está seguro!");
			  }
			});
		}

	handleSubmit = async e =>{
		e.preventDefault();
		let tipo_save = e.currentTarget.getAttribute('tipo_save');
	
			switch (Number(tipo_save) ) {
			  case 0:
			/*----------------------- CREAR HEADER PROGRAMA PRESUPUESTO------------------------------- */
				console.log( 'create Header Programa presupuesto:',this.state.form);
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
			fetch('https://cors-anywhere.herokuapp.com/https://costoprogramas-back.herokuapp.com/presupuestos',config)
						let json = await response.json()
						console.log(json);
					this.setState(prevState => ({
					    form: {                   
					        ...prevState.form,    
					        id_programa_presupuesto: json.id,
					        costo_credito: json.costoCredito   
					    }
					}));
					this.setState(prevState => ({			                      
					        ...prevState,    
					        readOnlyHeader: true,
					        readOnlyCostoCredito: true      
					}));
					swal("Guardado exitoso!", "", "success");
					}catch( error ){
						console.log('ERROR..');
						swal("Oops, Algo salió mal!!", "", "error");
					}
			    break;

			  case 1: 
			 /*-----------------------   CREAR DETALLE PROGRAMA PRESUPUESTO ----------------------*/
					console.log( 'create Detalle Programa presupuesto:',this.state.form);

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
		fetch('https://cors-anywhere.herokuapp.com/https://costoprogramas-back.herokuapp.com/presupuestos/'+
			this.state.form.id_programa_presupuesto+'/detalle',config)
						let json = await response.json()
						console.log(json);
						if (json.error) {
							console.log('ERROR..',json.error);
							swal("Oops, Algo salió mal!!", "", "error");
						}else{
							this.setState({form: {...this.state.form, importe: ''}	});
							this.setState({form: {...this.state.form, creditos: 0}	});
							this.callProgramaPresupuestoDetalles();		
							swal("Guardado exitoso,!", "", "success");								
						}
					}catch( error ){
						console.log('ERROR..',error);
						swal("Oops, Algo salió mal!!", "", "error");
					}
			    break;
			  case 2:			   
		 /*-----------------------   UPDATE DETALLE PROGRAMA PRESUPUESTO  ----------------------*/
					console.log( 'UPDATE Detalle Programa presupuesto:',this.state.form);
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
		fetch('https://cors-anywhere.herokuapp.com/https://costoprogramas-back.herokuapp.com/presupuesto-detalles?id-ciclo='+
						this.state.form.id_programa_ciclo+'&id-concepto='+
						this.state.form.id_concepto+'&id-presupuesto='+this.state.form.id_programa_presupuesto,config)
						let json = await response.json()
						console.log(json);
						if (json.error) {
							console.log('ERROR..',json.error);
							swal("Oops, Algo salió mal!!", "", "error");
						}else{
							this.clearForm();			
							this.callProgramaPresupuestoDetalles();		
							swal("Actualización exitosa!", "", "success");
						}					
					}catch( error ){
						console.log('ERROR..',error);
						swal("Oops, Algo salió mal!!", "", "error");
					}
			    break; 
			  case 3:
		 /*-----------------------   UPDATE HEADER PROGRAMA PRESUPUESTO  ----------------------*/
			  console.log( 'UPDATE HEADER Programa presupuesto:',this.state.form);
					try{
					let config = {
						method: 'PATCH',
						headers:{
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						crossdomain: true ,
						body: JSON.stringify(this.state.form)
					}
						let response = await
		fetch('https://cors-anywhere.herokuapp.com/https://costoprogramas-back.herokuapp.com/presupuestos/'+
			this.state.form.id_programa_presupuesto,config)
						let json = await response.json()
						console.log(json);	
					let $costo_credito = document.getElementById("costo_credito");
					let $btn_save_header = document.getElementById("save-header");
					$btn_save_header.disabled = true;
					$costo_credito.disabled = true ;
					this.changeTipoSave(1);
					this.callProgramaPresupuestoDetalles();	
					swal("Actualización exitosa!", "", "success");

					}catch( error ){
						console.log('ERROR..',error);
						swal("Oops, Algo salió mal!!", "", "error");
					}  
			    break;
			  default:
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
				    form: {              
				        ...prevState.form,   
				        importe: importeCalculado      
				    }
				}));
			}
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
		if( Number(id_programa) !== -1 ){
			this.setState( {readOnly: false} );   	
			this.state.programas.forEach( (programa) =>{				
				if( programa.id === Number(e.target.value) ){
			  	this.setState( {description: programa.nombrePrograma } );
			  	this.setState( {tipo_grado: programa.tipoGrado.id } );
			  	//console.log(programa); 
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

	callProgramaPresupuestoDetalles = () =>{
		// Uso tipico (no olvides de comparar los props):https://cors-anywhere.herokuapp.com/
	   axios.get('https://costoprogramas-back.herokuapp.com/presupuestos?idPrograma='
	   		+this.state.form.id_programa+'&idProgramacionPago='+this.state.form.id_programacion_pagos)		
			.then(response => {
				let readOnlyHeader = false;
				this.setState({readOnlyHeader: readOnlyHeader});
				this.setState({readOnlyCostoCredito: readOnlyHeader});				
				this.setState({ programaPresupuesto: response.data })		  	  
				//console.log('call again programaPresupuesto',response.data)
			})
			.catch( error =>{ console.log(error) 
			});				
	}

	componentDidUpdate(prevProps, prevState){
		// Uso tipico (no olvides de comparar los props):https://cors-anywhere.herokuapp.com/
	  if (this.state.form.id_programa !== prevState.form.id_programa
	   || this.state.form.id_programacion_pagos!== prevState.form.id_programacion_pagos ) {
	  	console.log(this.state.form.id_programacion_pagos)
	   axios.get('https://costoprogramas-back.herokuapp.com/presupuestos?idPrograma='
	   		+this.state.form.id_programa+'&idProgramacionPago='+this.state.form.id_programacion_pagos)		
			.then(response => {
				
				this.setState({ programaPresupuesto: response.data })				
				let id_programa_presupuesto = (response.data)?response.data.id:-1;
				this.setState({id_programa_presupuesto: id_programa_presupuesto})
				let readOnlyHeader = (response.data)?true:false;	
				this.setState({readOnlyHeader: readOnlyHeader});
				this.setState({readOnlyCostoCredito: readOnlyHeader});
			  if(id_programa_presupuesto!==-1){
					this.setState({tipo_save: 1});
			  	this.setState( {
						form: {
							...this.state.form,
							costo_credito: response.data.costoCredito,
							id_programa_presupuesto: response.data.id 
						}
					})	
 					let $bodyHeader = document.getElementById("collapseExample");
					$bodyHeader.classList.toggle('show');
			  }	
				console.log(response.data);
			})
			.catch( error =>{ console.log(error) 
			});
	  }				
	}

	componentDidMount(){
		axios.get('https://costoprogramas-back.herokuapp.com/programas',{ crossdomain: true })
		.then(response => {
			this.setState({ programas: response.data })			
		})
		.catch( error =>{ console.log(error) 
		});

		axios.get('https://costoprogramas-back.herokuapp.com/programacion-pagos',{ crossdomain: true })
		.then(response => {
			this.setState({ programaciones: response.data })			
		})
		.catch( error =>{ console.log(error) 
		});		
	}
	render(){
	//console.log('tipo save',this.state.tipo_save);
		const mystyle = {
			backgroundColor:'black',
			color:  'lightblue',
			padding: '20px',
			textAlign: 'center',
			fontSize: '28px',
			margin: '0',
			width:'100%',
			fontWeight: 'bold',
			fontFamily: 'Exo',
		};
		//console.log('Tipo grado  ', this.state.form.creditos );
		return (
				<div className="app">
					<h3 style={mystyle}
							> Registro Costo de Programas
	            <ul id="nav-mobile" className="right  hide-on-med-and-down">
	              <li >
	                  Regresar
	                  <i className="material-icons right" style={{fontSize: '40px'}}>reply</i>
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
											programaPresupuesto={this.state.programaPresupuesto}
											readOnlyHeader ={this.state.readOnlyHeader}
											readOnlyCostoCredito = {this.state.readOnlyCostoCredito}
											btnAddCreate = {this.addCreate}
											tipo_save = {this.state.tipo_save}
											changeTipoSave = {this.changeTipoSave}											
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
			return <Detalle 
			programaDetalle={this.state.programaPresupuesto.programaPresupuestoDetalles}
			btnEdit = {this.createEditableMatricula}
			btnDeleteDetalle = {this.btnDeleteDetalle}
			/>
		}		
	}
renderSelectedForm2(){
		const Detalle = Detalles["Perfeccionamiento"];
		return <Detalle 
		programaDetalle={this.state.programaPresupuesto.programaPresupuestoDetalles}
		btnDeleteDetalle = {this.btnDeleteDetalle}
		btnEdit = {this.createEditableEnseñanza}
		/>		
	}
}

export default RegistroCostoPrograma;