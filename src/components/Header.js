import React,{Component} from 'react';
import axios from 'axios';
import * as Forms from './forms';
import Create from './Create';
import Select from 'react-select';

const optionsTipoPresupuesto=[
		{value: 1 , label: 'CICLO'},
		{value: 2 , label: 'CREDITO'}
	];

class Header extends Component {
	constructor(){
		super();
		this.state = {
			programas : [],
			programa_selected : -1,
			description: "gaa",
			programaciones: [],
			programacion_selected: -1,
			tipo_grado: "-1",
			tipo_p_selected: -1,
			costo_name: "",
			selectedOption: null,
		}
	this.handleProgramaChange = this.handleProgramaChange.bind(this);  
	this.handleProgramacionChange = this.handleProgramacionChange.bind(this);  
	this.handleTipoPresupuestoChange = this.handleTipoPresupuestoChange.bind(this); 
	}


	handleProgramacionChange(e) {
	  this.setState( {programacion_selected: Number(e.target.value) } );
	}

	handleTipoPresupuestoChange(e) {
		console.log(e.target);
	  //  this.setState( {tipo_p_selected: Number(e.target.value) } );

	  // if( Number(e.target.value) !== -1 ){	  	
			// Number(e.target.value)  === 1 ? 
  	// 	:this.setState( {costo_name: "CREDITO" } );	
	  // }  else{
	  // 	this.setState( {costo_name: "" } )
	  // }
	}
 	handleChange = selectedOption => {
	    this.setState({ selectedOption });
	    if(selectedOption !== null){
 			selectedOption.value === 1 ? 
		    	this.setState( {costo_name: "CICLO" } ):		    
		    	this.setState( {costo_name: "CREDITO" } );	    
	    }else{
	    	this.setState( {costo_name: "" } )
	    }
		   
  	};

	handleProgramaChange(e) {
	  this.setState( {programa_selected: Number(e.target.value) } );	  
		if( Number(e.target.value) !== -1 ){
			this.state.programas.forEach( (programa) =>{				
				if( programa.id === Number(e.target.value) ){
			  	this.setState( {description: programa.nombrePrograma } );
			  	this.setState( {tipo_grado: programa.tipoGrado.id } ); 
			  }
			});		
 	  }else{
 	  	this.setState( {description: "selecciona pes" } );	
 	  	this.setState( {tipo_grado: -1 } );
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
		//console.log(Forms["Matricula"])
		//console.log(this.state.tipo_p_selected);	
		const { selectedOption } = this.state;	
		return (
				<div className="container">			
					<h1>&bull; RF21-Registrar Costos de Programas &bull; 						
					</h1>
						
					<div className="row">
						<div className="col-md-2">			 
							<div className="subject form-group">
							  <label ><b>Escoja un programa</b></label>
							    <select className="form-control"  value={this.state.programa_selected} 
							    	onChange={this.handleProgramaChange}>
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
								<label htmlFor="costo_credito"><b>Costo Total</b> </label>
								<input type="text" value="S/. 322.00" className="form-control bg-info text-white" readOnly/>					
							</div>							
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">			 
							<div className="subject form-group">
							  <label ><b>Escoja la programación de pagos</b> </label>
							    <select className="form-control"  value={this.state.programacion_selected} 
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
								<label htmlFor="tipo_presupuesto"><b>Tipo Presupuesto</b> </label>
								<Select className="" value={selectedOption}
									isClearable isSearchable
        							onChange={this.handleChange} 
							    	options={optionsTipoPresupuesto} />
							    																															
							    			
							</div>							
						</div>
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="costo_credito"> <b> Costo</b> 
								 {" "+this.state.costo_name}
								</label>
								<input type="text" className="form-control" placeholder={`Costo ${this.state.costo_name}`}/>	
							</div>											
						</div>									
					</div>	
					<div className="row">
						<div className="col-md-12">
							<Create />
						</div>												
					</div>	
					< br />
					<div className="container">
						<div className="row">
						<div className="col-md-12">
							{this.renderSelectedForm(this.state.tipo_grado)}
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