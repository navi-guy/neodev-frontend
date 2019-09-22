import React, {Component} from 'react';
import data from './data.json';

console.log(data);
class Header extends Component {
	state = {
		show: true
	}
	toggleShow = () => {
		this.setState({show: !this.state.show });
		console.log(this.state.show);

	}
	//console.log(state.show);
	render(){
		return (
				<div className="container">
					<h1>&bull; {this.props.mytext} &bull; 
						<button className="btn btn-info" onClick={this.toggleShow}> 
							Toggle Show
						</button>
					</h1>
					<div className="row">
						<div className="col-md-4">			 
							<div className="subject form-group">
							  <label >Escoja un programa</label>
							    <select className="form-control"  required>
							        <option>GTIC</option>
							        <option>DISI</option>
							        <option>ASTI</option>
							    </select>
							</div>
			
						</div> 	
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="costo_credito">Costo crédito</label>
								<input type="number" className="form-control"/>					
							</div>
							
						</div>
						<div className="col-md-4">			 
							<div className="subject form-group">
							  <label >Programa descripción</label>
							    <textarea name="" id="" cols="10" className="form-control" rows="3" 
							    readOnly value="Maestría en Ingeniería de Sistemas e Informática en GTIC">					    
							    </textarea>
							</div>
			
						</div> 	
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="costo_credito">Costo total</label>
								<input type="text" className="form-control" value="S/. 322.00" readOnly />	
							</div>
											
						</div>							
					</div>
				</div>
			)
	}
  
}

export default Header;