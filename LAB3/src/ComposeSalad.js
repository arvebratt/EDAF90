import React, { Component } from 'react';
// import { Button } from 'bootstrap';
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
        this.onSubmit = this.onSubmit.bind(this);
    }


    clearState = () => {
        this.setState({
            foundation: [],
            protein: [],
            extra: [],
            dressing: [],
            price: 0,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        e.target.classList.add("was-validated");
        if (e.target.checkValidity() === true){
            console.log(this.state);
            this.props.onSubmit(this.state);
            this.unCheck();
            this.clearState();
            this.props.history.push('/ViewOrder');
        }
    }

    onCancel = (e) => {
        e.preventDefault();
        this.unCheck();
        this.clearState();
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

    unCheck = () => {
        const inventory = this.props.inventory;

        let extra = Object.keys(inventory).filter(name => inventory[name].extra);
        let protein = Object.keys(inventory).filter(name => inventory[name].protein);

        for (var i = 0; i < extra.length; i++) {
            if (this.refs[extra[i]].checked) {
                this.refs[extra[i]].checked = !this.refs[extra[i]].checked;
            }
        }
        for (i = 0; i < protein.length; i++) {
            if (this.refs[protein[i]].checked) {
                this.refs[protein[i]].checked = !this.refs[protein[i]].checked;
            }
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
                <form onSubmit={e => this.onSubmit(e)} noValidate>
                <div className="row">
                    <div className="form-group col-sm">
                    <p>Välj bas</p>
                    <select required name="foundation" onChange={e => this.selectChange(e)} className="form-control">
                        <option selected value='' disabled hidden>make a choice...</option>
                        {foundations.map(name => <option key={name} value={name}>
                            {name} ({inventory[name].price}kr)</option>)}
                    </select>
                    <div className="invalid-feedback">
                            Du måste välja en bas.
                    </div>
                    </div>

                    <br></br>

                    <div className="form-group col-sm">
                    <p>Välj protein</p>
                    {protein.map(name =>
                        <div key={name}>
                            <input name="protein" value={name} ref={name} type="checkbox" onChange={e => this.checkboxChange(e)} />
                            {name} ({inventory[name].price}kr)
                        </div>
                    )}
                    </div>
                    <br></br>

                    <div className="form-group col-sm">
                    <p>Välj tillbehör</p>
                    {extra.map(name =>
                        <div key={name}>
                            <input name="extra" value={name} ref={name} type="checkbox" onChange={e => this.checkboxChange(e)} />
                            {name} ({inventory[name].price}kr)
                  </div>
                    )}
                    </div>

                    <br></br>

                    <div className="form-group col-sm">
                    <p>Välj dressing</p>
                    <select required name="dressing" onChange={e => this.selectChange(e)} className="form-control">
                    <option selected value='' disabled hidden>make a choice...</option>
                        {dressing.map(name => <option key={name} value={name}>
                            {name} ({inventory[name].price}kr)</option>)}
                    </select>
                    <div className="invalid-feedback">
                            Du måste välja en dressing.
                    </div>
                    </div>
                    </div>
                    <br></br>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        id="submit"
                        value="Lägg till"
                    />
                </form>
            </div>
        );
    }
}

export default ComposeSalad;