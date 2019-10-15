import React, {Component} from 'react';
import Select from 'react-select';

const optionsConcepto=[
		{label: '210010' , value: 'MATRICULA DOCTORADO/MAESTRÍA'},
		{label: '210011' , value: 'ENSEÑANZA DOCTORADO/MAESTRÍA'},
		{label: '210024' , value: 'ENSEÑANZA DIPLOMATURA'},
		{label: '207010' , value: 'MATRICULA EPG'}
	];
	//para el tipo de grado 3
const optionsCiclo=[
		{label: '1' , value: '1'},
		{label: '2' , value: '2'},
		{label: '3' , value: '3'},
		{label: '4' , value: '4'}
	];
class Create extends Component {
	constructor(){
		super();
		this.state = {
			selectedOptionConcepto: null,
			selectedOptionCiclo: null,
			descripcion: "",
		}
	}

 	handleChangeCiclo = selectedOptionCiclo => {
	    this.setState({ selectedOptionCiclo });   
  };

 	handleChangeConcepto = selectedOptionConcepto => {
	    this.setState({ selectedOptionConcepto });
	    if(selectedOptionConcepto !== null){
	    	
	    	this.setState( {descripcion:  selectedOptionConcepto.value } )
	    		console.log(selectedOptionConcepto.value);
	    }else{
	    	this.setState( {descripcion: '' } )
	    }		   
  };
	render(){
	const { selectedOptionConcepto } = this.state;
	const { selectedOptionCiclo } = this.state;	
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
					  		<div className="col-md-3">
					  			<div className="form-group"> 
					  				<label><b> Concepto</b></label>
					  				<Select className="" value={selectedOptionConcepto}
											isClearable isSearchable
		        					onChange={this.handleChangeConcepto} 
								    	options={optionsConcepto} />
					  			</div>					  			
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<label><b> Ciclo</b></label>
					  				<Select className="" value={selectedOptionCiclo}
											isClearable isSearchable
		        					onChange={this.handleChangeCiclo} 
								    	options={optionsCiclo} />
					  			</div>					  			
					  		</div>					  		
					  		<div className="col-md-3">
						  		<div className="subject form-group">
										<label><b> Importe</b></label>
										<input type="text"  placeholder="Importe"
										  className="form-control" />									    
									</div>					  			
					  		</div>					  		
					  	</div>{/* end.row*/}
					  	<div className="row">
					  		<div className="col-md-12">
					  			<div className=" float-right">
					  				<button className="btn btn-success ">
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
  
}

export default Create;