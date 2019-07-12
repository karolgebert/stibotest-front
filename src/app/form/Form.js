import React from 'react';
import './Form.css';
import {Button} from '../../common/button/Button';
import doPost from '../../service/Http';

export class Form extends React.Component {
    render() {
        return(
            <form>
                <fieldset>
                    <input placeholder='Task name' type='text' />
                    <select>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    <Button text='Submit' onClick={() => {
                        doPost('/task')
                    }} />
                </fieldset>
            </form>
        )
    }
}
