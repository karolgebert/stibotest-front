import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import Http from '../service/Http';

describe('App tests', () => {
    test('renders Is loading when NO data has been fetched', () => {
        const app = shallow(<App />);

        expect(app).toHaveText('Is loading...');
    });

    test('renders Table when data has been fetched', () => {
        // GIVEN
        const app = mount(<App />);

        // WHEN
        app.setState({
            isLoaded: true,
            headers: ['Name', 'Status', 'Controls'],
            tasks: [{name: 'Test', done: 1, planned: 4}]
        });

        // THEN
        expect(app).toContainExactlyOneMatchingElement('table');
        expect(app).toContainMatchingElements(2, 'tr');
        expect(app).toContainMatchingElements(3, 'th');
        expect(app).toContainMatchingElements(3, 'td');
    });

    test('calls forceUpdate when Done event occurs', () => {
        // GIVEN
        const app = shallow(<App />);
        const instance = app.instance();
        jest.spyOn(instance, 'forceUpdate');

        // WHEN
        instance.whenDone();

        // THEN
        expect(instance.forceUpdate).toHaveBeenCalled();
    });

    test('calls forceUpdate when Increased event occurs', () => {
        // GIVEN
        const app = shallow(<App />);
        const instance = app.instance();
        jest.spyOn(instance, 'forceUpdate');

        // WHEN
        instance.whenIncreased();

        // THEN
        expect(instance.forceUpdate).toHaveBeenCalled();
    });

    test('calls setState when Deleted event occurs', () => {
        // GIVEN
        const app = shallow(<App />);
        app.setState({
            tasks: [{id: 1}, {id: 2}]
        });
        const instance = app.instance();
        jest.spyOn(instance, 'setState');

        // WHEN
        instance.whenDeleted(1);

        // THEN
        expect(instance.setState).toHaveBeenCalledWith({
            tasks: [{id: 2}]
        });
    });

    test('calls Http.doGet when componentDidMount', () => {
       // GIVEN
       const app = shallow(<App />);
       const instance = app.instance();
       jest.spyOn(Http, 'doGet');

       // WHEN
        instance.componentDidMount();

        // THEN
        expect(Http.doGet).toHaveBeenCalled();
    });
});
