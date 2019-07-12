import React from 'react';
import './Button.css';

export const Button = ({text, onClick, type}) => (
    <button
        type={type || 'submit'}
        onClick={onClick}
        className='button'
    >
        {text}
    </button>
);
