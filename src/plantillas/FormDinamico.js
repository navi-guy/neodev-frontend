import React from "react"
class FormDinamico extends React.Component {
  
  state ={
    cats: [{name: "", age: ""}],
    owner: "",
    description: ""
  }
  addCat = (e) => {
    this.setState((prevState) => ({
      cats: [...prevState.cats , {name: "" , age: ""}],
    }))
  }
  handleSubmit = (e) => {
   e.preventDefault() 
   console.log(this.state)

 }
  
  handleChange = (e) => {
    if ( ['name','age'].includes(e.target.className) ) {
      let cats = [...this.state.cats]
      cats[ e.target.dataset.id ][e.target.className] = e.target.value
      this.setState( { cats }, () => console.log( this.state.cats ) )
    } else{
      this.setState( { [e.target.name]: e.target.value } )
    }

  }

  render() {
    let {cats} = this.state
    return (
    <div className="container">
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="owner">Owner</label> 
              <input type="text" className="form-control" name="owner" id="owner" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="description">Description</label> 
              <input type="text" className="form-control"  name="description" id="description" />
            </div>
          </div>
        </div> 
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary float-left" onClick={this.addCat}>Add new cat</button>
            <input type="submit" className="float-right" value="Submit" />  
          </div>             
        </div>
        <br />  
        {
          cats.map((val, idx) => {
            let catId = `cat-${idx}`, ageId = `age-${idx}`;
              return (
                <div key={idx} style={{ borderStyle: 'solid', padding: '10px 5px 15px 20px'}}>
                  <div  className="form-group">
                    <label htmlFor="{cat-Id}">{`CAT #${idx +1}`}</label>
                    <input type="text"  name="{catId}" id={catId}
                    data-id={idx} className="name form-control"/>                  
                  </div>
                  <div  className="form-group">
                    <label htmlFor="{age-Id}">Age</label>
                    <input type="text"  name="{ageId}" id={ageId}
                     data-id={idx} className="age form-control"/>               
                  </div>
                </div>
                )
          })
        }
      </form>
    </div>    
    )
  }
}
export default FormDinamico