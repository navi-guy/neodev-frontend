import React, {Component} from 'react';

class Table extends Component {

  handleClick = () => {
    console.log('this is:', this.title);
  //  this.title.collapse('toggle');
  }

  constructor() {
    super()
    this.title = React.createRef()
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
					    <div id="collapseOne" ref={this.title} className="collapse show" 
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
										<table className="table">
										  <thead className="thead-dark">
										    <tr>
										      <th scope="col">#</th>
										      <th scope="col">MATRICULA UPG</th>
										      <th scope="col">Concepto de Pago</th>
										      <th scope="col">Monto</th>
										      <th scope="col">Acciones </th>
										    </tr>
										  </thead>
										  <tbody>
										    <tr>
										      <th scope="row">1</th>
										      <td>1er CICLO</td>
										      <td>
														<input type="text" value="210-010" readOnly/>
										      </td>
										      <td>481.00</td>
										      <td> 
											      <button className="btn btn-warning">
											      	Edit
											      </button>
											      &nbsp;
											      <button className="btn btn-primary">
											      	Save
											      </button>
										      </td>
										    </tr>
										    <tr>
										      <th scope="row">2</th>
										      <td>2do CICLO</td>
										      <td>210-010</td>
										      <td>481.00</td>
										      <td> 
											      <button className="btn btn-warning">
											      	Edit
											      </button>
											      &nbsp;
											      <button className="btn btn-primary">
											      	Save
											      </button>
										      </td>
										    </tr>
										    <tr>
										      <th scope="row">3</th>
										      <td>3er CICLO</td>
										      <td>210-010</td>
										      <td>481.00</td>
										      <td> 
											      <button className="btn btn-warning">
											      	Edit
											      </button>
											      &nbsp;
											      <button className="btn btn-primary">
											      	Save
											      </button>
										      </td>
										    </tr>
										    <tr>
										    	<th scope="row">3</th>
										      <td>4to CICLO</td>
										      <td>210-010</td>
										      <td>481.00</td>
										      <td> 
											      <button className="btn btn-warning">
											      	Edit
											      </button>
											      &nbsp;
											      <button className="btn btn-primary">
											      	Save
											      </button>
										      </td>
										    </tr>
										  </tbody>
										</table>

										<table className="table">
										  <thead className="thead-light">
										    <tr>
										      <th scope="col">#</th>
										      <th scope="col">First</th>
										      <th scope="col">Last</th>
										      <th scope="col">Handle</th>
										    </tr>
										  </thead>
										  <tbody>
										    <tr>
										      <th scope="row">1</th>
										      <td>Mark</td>
										      <td>Otto</td>
										      <td>@mdo</td>
										    </tr>
										    <tr>
										      <th scope="row">2</th>
										      <td>Jacob</td>
										      <td>Thornton</td>
										      <td>@fat</td>
										    </tr>
										    <tr>
										      <th scope="row">3</th>
										      <td>Larry</td>
										      <td>the Bird</td>
										      <td>@twitter</td>
										    </tr>
										  </tbody>										 
										   <tfoot>
										   <tr>
										   		<th colSpan="3">TOTAL MONTO MATRÍCULA</th>
										  		<th>S/. 2222.00</th>
										   </tr>										 
										  </tfoot>

										</table>
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
					    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
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