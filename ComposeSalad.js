import React, { Component } from 'react';
import { Button } from 'bootstrap';
class ComposeSalad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foundation: [],
            protein: [],
            extra: [],
            dressing: [],
            price: 0,
        };
    }

    cancelSubmit = (e) => {
        this.setState({
            foundation: [],
            protein: [],
            extra: [],
            dressing: [],
            price: 0,
        })
        e.preventDefault();
        console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    selectChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            price: Number(this.state.price) + Number(this.props.inventory[e.target.value].price),
        })
    }

    checkboxChange = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: [...this.state[e.target.name], e.target.value],
            price: Number(this.state.price) + Number(this.props.inventory[e.target.value].price),
        })
    }

    booleanChecked = (e) => {
        if(this.state[e.target.name]){
            return true;
        } else{
            return false;
        }

    }

    render() {
        const inventory = this.props.inventory;
        let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        let extra = Object.keys(inventory).filter(name => inventory[name].extra);
        let protein = Object.keys(inventory).filter(name => inventory[name].protein);
        let dressing = Object.keys(inventory).filter(name => inventory[name].dressing);

        return (
            <div className="container">
            <form>
                
                    <p>Välj bas</p>
                    <select name="foundation" onChange={e => this.selectChange(e)}>
                        {foundations.map(name => <option key={name} value={name}>
                        {name} ({inventory[name].price}kr)</option>)}
                    </select>
               
                <br></br>

               
                    <p>Välj protein</p>
                    {protein.map(name =>
                        <div key={name}>
                            <input name="protein" value={name} checked={e => this.booleanChecked(e)} type="checkbox" onChange={e => this.checkboxChange(e)}/>
                            {name} ({inventory[name].price}kr)
                        </div>
                    )}
              
                <br></br>

    
                    <p>Välj tillbehör</p>
                    {extra.map(name =>
                        <div key={name}>
                            <input name="extra" value={name} type="checkbox" onChange={e => this.checkboxChange(e)}/>
                            {name} ({inventory[name].price}kr)
                  </div>
                    )}
          
                <br></br>

            
                    <p>Välj dressing</p>
                    <select name="dressing" onChange={e => this.selectChange(e)}>
                        {dressing.map(name => <option key={name} value={name}>
                        {name} ({inventory[name].price}kr)</option>)}
                    </select>
      
                <br></br>
                <button type="submit" id="submit" onClick={e => this.onSubmit(e)}>
                Compose
                </button>
                <button type="submit" id="submit" onClick={e => this.cancelSubmit(e)}>
                Exit
                </button>
                </form>
            </div>
        );
    }
}

export default ComposeSalad;