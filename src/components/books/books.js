import { Component } from '../../common/component';
import { CardList } from '../card-list/card-list'
import { Loader } from '../loader/loader';
import './books.css';

export class Books extends Component {
    constructor(appState, parentState) {
        super('div');
        this.appState = appState;
        this.parentState = parentState;
    }

    render() {
        this.el.classList.add('books');
        if(this.parentState.loading) {
            return this.el.innerHTML = new Loader().render();
        }

        this.el.innerHTML = `<h1 class='title'>Found - ${this.parentState.numFound}</h1>`;
        this.el.append(new CardList(this.appState, this.parentState.list).render());
        return this.el;
    }
}