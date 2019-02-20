import React, { Component } from 'react';
import './App.css';

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
        if (e.target.checkValidity() === true) {
            e.target.classList.remove("was-validated");
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

                <div data-spy="scroll" data-target="navbar">
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#foundation">Bas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#protein">Protein</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#extra">Extra</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#dressing">Dressing</a>
                            </li>
                        </ul>
                    </nav>
                    <div id="foundation" className="container-fluid bg-light" Style="padding-top:10px;padding-bottom:10px">
                        <div className="form-group">
                            <h1>Välj bas</h1>
                            <select required value={this.state.foundation} name="foundation" onChange={e => this.selectChange(e)} className="form-control">
                                <option value='' disabled hidden>make a choice...</option>
                                {foundations.map(name => <option key={name} value={name}>
                                    {name} ({inventory[name].price}kr)</option>)}
                            </select>
                            <div className="invalid-feedback">
                                Du måste välja en bas.
                            </div>
                        </div>
                    </div>


                    <div id="protein" className="container-fluid bg-light" Style="padding-top:10px;padding-bottom:10px">
                        <div className="form-group">
                            <h1>Välj protein</h1>
                            {protein.map(name =>
                                <div key={name}>
                                    <input name="protein" checked={this.state.protein.includes(name)} value={name} ref={name} type="checkbox" onChange={e => this.checkboxChange(e)} />
                                    {name} ({inventory[name].price}kr)
                                </div>
                            )}
                        </div>
                    </div>

                    <div id="extra" className="container-fluid bg-light" Style="padding-top:10px;padding-bottom:10px">
                        <div className="form-group">
                            <h1>Välj tillbehör</h1>
                            {extra.map(name =>
                                <div key={name}>
                                    <input name="extra" value={name} checked={this.state.extra.includes(name)} ref={name} type="checkbox" onChange={e => this.checkboxChange(e)} />
                                    {name} ({inventory[name].price}kr)
                                </div>
                            )}
                        </div>
                    </div>

                    <div id="dressing" className="container-fluid bg-light" Style="padding-top:10px;padding-bottom:10px">
                        <div className="form-group">
                            <h1>Välj dressing</h1>
                            <select required value={this.state.dressing} name="dressing" onChange={e => this.selectChange(e)} className="form-control">
                                <option value='' disabled hidden>make a choice...</option>
                                {dressing.map(name => <option key={name} value={name}>
                                    {name} ({inventory[name].price}kr)</option>)}
                            </select>
                            <div className="invalid-feedback">
                                Du måste välja en dressing.
                            </div>
                        </div>
                    </div>

                    <input
                        type="submit"
                        className="btn btn-primary"
                        id="submit"
                        value="Lägg till"
                    />
                    </div>
                </form>
            </div >
        );
    }
}

export default ComposeSalad;