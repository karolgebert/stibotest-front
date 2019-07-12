import React from 'react';
import './App.css';
import {Table} from './common/table/Table';
import {Controls} from './app/controls/Controls';
import {Form} from './app/form/Form';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tasks: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/task')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    tasks: json
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
                        rows={this.state.tasks}
                    >
                    </Table>

                    <Form/>
                </div>
            );
        } else {
            return (
                <div>Is loading...</div>
            )
        }
    }
}

export default App;
