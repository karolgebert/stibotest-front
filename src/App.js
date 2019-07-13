import React from 'react';
import './App.css';
import {Table} from './common/table/Table';
import {Controls} from './app/controls/Controls';
import {Form} from './app/form/Form';
import {Http} from './service/Http';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tasks: []
        };
    }

    getRows(tasks) {
        const rows = [];
        tasks.forEach(task => {
            const row = [];
            row.push(task.name);
            row.push(`${task.done}/${task.planned} tasks`);
            row.push(<Controls task={task} whenDeleted={this.whenDeleted.bind(this)} whenDone={this.whenDone.bind(this)} whenIncreased={this.whenIncreased.bind(this)} />);
            rows.push(row);
        });
        return rows;
    }

    whenDeleted(id) {
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== id)
        });
    }

    whenDone() {
        this.forceUpdate();
    }

    whenIncreased() {
        this.forceUpdate();
    }

    componentDidMount() {
        Http.doGet('/task')
            .then(res => res.json())
            .then(tasks => {
                this.setState({
                    isLoaded: true,
                    tasks: tasks.sort((a, b) => b.id - a.id)
                })
            })
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div className='App'>
                    <Table
                        headers={['Task name', 'Status (done/planned)', 'Controls']}
                        rows={this.getRows(this.state.tasks)}
                    >
                    </Table>

                    <Form onSubmit={(task) => {
                        this.state.tasks.push(task);
                        this.forceUpdate();
                    }} />
                </div>
            );
        } else {
            return (
                <div className='centered'>Is loading...</div>
            )
        }
    }
}

export default App;
