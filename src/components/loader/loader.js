import { Component } from '../../common/component';
import './loader.css';

export class Loader extends Component {
    constructor() {
        super('div');
    }

    render() {
        this.el.classList.add('loader');
        return this.el;
    }
}