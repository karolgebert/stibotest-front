import React from 'react';
import { shallow, mount } from 'enzyme';
import Http from '../service/Http';
import {Controls} from "../app/controls/Controls";

describe('Controls tests', () => {
    test('renders Finished when done === planned', () => {
        // GIVEN
        const task = {done: 4, planned: 4};

        // WHEN
        const controls = shallow(<Controls task={task} />);

        // THEN
        expect(controls).toHaveText('Finished<Button />');
    });

    test('renders Buttons when done !== planned', () => {
        // GIVEN
        const task = {done: 1, planned: 4};

        // WHEN
        const controls = mount(<Controls task={task} />);

        // THEN
        expect(controls).toContainMatchingElements(3, 'button');
    });

    test('Http.doPut is called when onDone method is invoked', () => {
        // GIVEN
        const task = {done: 1, planned: 4};
        jest.spyOn(Http, 'doPut');
        const controls = shallow(<Controls task={task} />);
        const instance = controls.instance();

        // WHEN
        instance.onDone();

        // THEN
        expect(Http.doPut).toHaveBeenCalled();
        expect(instance.props.task.done).toBe(4);
    });

    test('Http.doPut is called when onIncrease method is invoked', () => {
        // GIVEN
        const task = {done: 1, planned: 4};
        jest.spyOn(Http, 'doPut');
        const controls = shallow(<Controls task={task} />);
        const instance = controls.instance();

        // WHEN
        instance.onIncrease();

        // THEN
        expect(Http.doPut).toHaveBeenCalled();
        expect(instance.props.task.done).toBe(2);
    });

    test('Http.doDelete is called when onDelete method is invoked', () => {
        // GIVEN
        const task = {done: 1, planned: 4};
        jest.spyOn(Http, 'doDelete');
        const controls = shallow(<Controls task={task} />);
        const instance = controls.instance();

        // WHEN
        instance.onDelete();

        // THEN
        expect(Http.doDelete).toHaveBeenCalled();
    });

});