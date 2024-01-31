import { Component } from '../../common/component'
import './card.css';

export class Card extends Component {
    constructor(appState, cardState) {
        super('li');
        this.appState = appState;
        this.cardState = cardState;
    }
    #addToFavorites() {
        this.appState.favorites.push(this.cardState);
    }
    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(b => b.key !== this.cardState.key);
    }

    render() {
        this.el.classList.add('card');
        const existInFavorites = this.appState.favorites.find(b => b.key === this.cardState.key);

        this.el.innerHTML =`
            <div class='card__img'>
                <img src='https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg' alt='card thumb' />
            </div>
            <div class='card__info'>
                <div class='card__tag'>
                    ${this.cardState.subject ? this.cardState.subject[0] : 'undefined'}
                </div>
                <div class='card__title'>
                    ${this.cardState.title}
                </div>
                <div class='card__author'>
                    ${this.cardState.author_name ? this.cardState.author_name[0] : 'undefined'}
                </div>
                <div class='card__footer'>
                    <button class="card__add ${existInFavorites ? 'card__active' : ''}">
                        ${existInFavorites
                            ? '<img src="/static/favorites.svg" alt="favorites" />'
                            : '<img src="/static/favorites-white.svg" alt="favorites" />'
                        }
                    </button>
                </div>
            </div>
        `;

        if(existInFavorites) {
            this.el.querySelector('button')
            .addEventListener('click', this.#deleteFromFavorites.bind(this))
        } else {
            this.el.querySelector('button')
            .addEventListener('click', this.#addToFavorites.bind(this))
        }
        return this.el;
    }
}