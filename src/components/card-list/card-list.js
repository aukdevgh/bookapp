import { Component } from '../../common/component';
import { Card } from '../card/card';
import './card-list.css';

export class CardList extends Component {
    constructor(appState, list) {
        super('ul');
        this.appState = appState;
        this.list = list;
    }

    render() {
        this.el.classList.add('card_list');

        if(this.list.length == 0) {
            return this.el;
        }

        const fragment = new DocumentFragment();
        for(const item of this.list) {
            const li = new Card(this.appState, item).render();
            fragment.append(li);
        }

        this.el.append(fragment);
        return this.el;
    }
}