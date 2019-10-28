import React, {Component} from 'react';


class Creditos extends Component {
		render(){
			return(
					<div className="subject form-group">
							<label><b>N° de creditos</b></label>
							<input type="number" name="creditos" placeholder="" value={this.props.creditos}
								className="form-control" required min="1" onChange={this.props.onChange}/>						    						
					</div>
				)
		}	
};
export default Creditos
