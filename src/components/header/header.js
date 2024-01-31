import { Component } from '../../common/component'
import './header.css';

export class Header extends Component {
    constructor(appState) {
        super('header');
        this.appState = appState;
    }

    render() {
        this.el.classList.add('header');
        this.el.innerHTML = `
            <img src='/static/logo.svg' alt='logo' />

            <nav class='menu'>

                <a class='menu__item' href='#'>
                    <img src='/static/search.svg' alt='search icon' />
                    Search book
                </a>
                <a class='menu__item' href='#favorites'>
                    <img src='/static/favorites.svg' alt='search icon' />
                    Favorites
                    <div class='menu__counter'>${this.appState.favorites.length}</div>
                </a>
            </nav>
        `;

        return this.el;
    }
}