import React, {Component} from 'react';
import Matricula from './Matricula';

class Table extends Component {
	constructor(props) {
	    super(props);
	    this.state = {value: '' };
	  }
	StyleInput() {
		return {
			border: 'none',
			width : '150px'
		}
	}
	WidthInput(){
		return {
			width : '150px'
		}
	}

	handleChangeMonto = e => {
	  this.setState({monto: e.target.monto});  
	}
	 
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });   
  }

	render(){
		return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="accordion" id="accordionExample">
					  <div className="card" id="card">
					    <div className="card-header">
					      <div className="btn btn-info btn-block" data-toggle="collapse"
					        	 data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">						        
					      		<label  htmlFor="header">PRESUPUESTO MATRÍCULA</label>	
					      </div>  
					    </div>
					    <div id="collapseOne" ref={this.title} className="collapse" 
					    aria-labelledby="headingOne" data-parent="#accordionExample">
					      <div className="card-body">
					      	<div className="row">
					      		<div className="col-md-9">
					      			<h4 className="float-right">BANCO PICHINCHA - NÚMERO DE CUENTA UNMSM: 270016684</h4>
					      		</div>
					      		<div className="col-md-3">
					      			<div className="form-group">
					      				<label htmlFor="costo-matricula">
					      				Costo MATRÍCULA
					      				</label>
					      				<input type="text" className="form-control" value="S/. 0.00" readOnly/>
					      			</div>					      			
					      		</div>					      		
					      	</div>
								<Matricula />
					      </div>
					    </div>
					  </div>
					  <div className="card">
					    <div className="card-header">
					      <div className="btn btn-info btn-block" data-toggle="collapse"
					        	 data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">						        
					      		<label  htmlFor="header">PRESUPUESTO PERFECCIONAMIENTO</label>	
					      </div>  
					    </div>
					    <div id="collapseTwo" className="collapse" 
					    	aria-labelledby="headingTwo" data-parent="#accordionExample">
					      <div className="card-body">
					        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
					      </div>
					    </div>
					  </div>
					</div>		
				</div>			
			</div>
			<br/>
			<div className="row">
				<div className="col-md-8"></div>
				<div className="col-md-4">
					<button className="btn btn-lg btn-success float-right">
						REGISTRAR
					</button>
				</div>							
			</div>
		</div>
			)
	}
  
}

export default Table;