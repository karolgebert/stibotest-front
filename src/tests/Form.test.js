import React from 'react';
import {shallow, mount} from 'enzyme';
import {Form} from '../app/form/Form';
import Http from '../service/Http';

describe('Form tests', () => {
    test('renders form with inputs', () => {
        // GIVEN
        const form = shallow(<Form/>);
        const instance = form.instance();

        // WHEN
        instance.setState({
            name: 'Test',
            isTouched: false
        });

        // THEN
        expect(form).toContainMatchingElements(2, 'input');
        expect(form).toContainMatchingElements(1, 'select');
        expect(form).toContainMatchingElements(4, 'option');
    });

    test('proper validation message is shown when no name is given', () => {
        // GIVEN
        const form = shallow(<Form />);
        const instance = form.instance();

        // WHEN
        instance.setState({
            name: '',
            isTouched: true
        });
        const validateResult = instance.validate();

        // THEN
        expect(validateResult).toEqual(<span className="validationError">You must provide a task name</span>);
    });

    test('Http.doPost will be called when submitting form', () => {
       // GIVEN
        const form = shallow(<Form />);
        const instance = form.instance();
        jest.spyOn(Http, 'doPost');

        // WHEN
        instance.submit(new Event('test'));

        // THEN
        expect(Http.doPost).toHaveBeenCalled();
    });
});