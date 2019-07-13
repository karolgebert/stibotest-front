import React from 'react';
import './Form.css';
import {Button} from '../../common/button/Button';
import Http from '../../service/Http';

export class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            planned: 1,
            done: 0,
            isTouched: false
        };

        this.onSubmit = props.onSubmit;
        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.handleCountChanged = this.handleCountChanged.bind(this);
    }

    handleKeyPress(event) {
        if (event.target.charCode === 13) {
            // ENTER PRESSED
            event.preventDefault();
            this.submit(event);
        }
    }

    handleNameChanged(event) {
        this.setState({name: event.target.value, isTouched: true})
    }

    handleCountChanged(event) {
        this.setState({planned: event.target.value})
    }

    submit(event) {
        event.preventDefault();
        Http.doPost('/task', this.state)
            .then((res) => res.status === 200 ? res.json() : new Error(res.statusText))
            .then(task => {
                if (task instanceof Error) {
                    this.setState({isTouched: true});
                    this.validate();
                } else {
                    this.props.onSubmit(task);
                    this.setState({
                        name: '',
                        planned: 1,
                        done: 0,
                        isTouched: false
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    validate() {
        if (this.state.name.length === 0 && this.state.isTouched) {
            return <span className='validationError'>You must provide a task name</span>;
        }
    }

    render() {
        return (
            <form onKeyPress={(event) => this.handleKeyPress(event)}>
                <fieldset>
                    <legend>Add New</legend>
                    <label>
                        <input value={this.state.name} placeholder='Task name' type='text'
                               onChange={this.handleNameChanged}/>
                    </label>
                    <label>
                        Planned
                        <select value={this.state.planned} onChange={this.handleCountChanged}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </label>
                    <input value={this.state.done} type='hidden'/>
                    <Button text='Submit' onClick={(event) => {
                        this.submit(event)
                    }}/>

                    <div>
                        {this.validate()}
                    </div>
                </fieldset>
            </form>
        )
    }
}
