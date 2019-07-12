import React from 'react';
import './Controls.css';
import {Button} from "../../common/button/Button";

export class Controls extends React.Component {
    onDone = () => {

    };

    onIncrease = () => {

    };

    onDelete = () => {

    };

    render() {
        return <React.Fragment>
            <Button text='Done' onClick={this.onDone}/>
            <Button text='Increase Task Count' onClick={this.onIncrease}/>
            <Button text='Delete Task' onClick={this.onDelete}/>
        </React.Fragment>
    }
}
