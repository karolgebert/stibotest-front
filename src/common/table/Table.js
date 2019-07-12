import React from 'react';
import './Table.css';

export class Table extends React.Component {

    createHeaders = () => {
        return this.props.headers.map(
            (header, index) => {
                return <th key={index}>{header}</th>
            }
        )
    };

    createRows = () => {
        return this.props.rows.map((row, rIndex) => {
           return <tr key={rIndex}>{row.map((value, vIndex) => {
               return <td key={vIndex}>{value}</td>
           })}</tr>
        });
    };

    render() {
        return(
            <table>
                <thead>
                    <tr>
                        {this.createHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {this.createRows()}
                </tbody>
            </table>
        )
    }
}
