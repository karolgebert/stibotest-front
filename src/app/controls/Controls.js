import React from 'react';
import './Controls.css';
import {Button} from '../../common/button/Button';
import {Http} from '../../service/Http';

export class Controls extends React.Component {
    onDone = () => {
        this.props.task.done = this.props.task.planned;
        Http.doPut('/task', this.props.task).then(() => {
            this.forceUpdate();
            this.props.whenDone();
        });
    };

    onIncrease = () => {
        this.props.task.done++;
        Http.doPut('/task', this.props.task).then(() => {
            this.forceUpdate();
            this.props.whenIncreased();
        });
    };

    onDelete = () => {
        Http.doDelete('/task', this.props.task.id).then(() => {
            this.props.whenDeleted(this.props.task.id);
        });
    };

    render() {
        if (this.props.task.done === this.props.task.planned) {
            return <React.Fragment>
                Finished
                <Button text='Delete Task' onClick={this.onDelete}/>
            </React.Fragment>
        }
        return <React.Fragment>
            <Button text='Done' onClick={this.onDone}/>
            <Button text='Increase Done Count' onClick={this.onIncrease}/>
            <Button text='Delete Task' onClick={this.onDelete}/>
        </React.Fragment>
    }
}
