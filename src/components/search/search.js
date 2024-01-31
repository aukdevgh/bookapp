import { Component } from '../../common/component'
import './search.css';

export class Search extends Component {
    constructor(state) {
        super('form');
        this.state = state;
    }

    search = (searchQuery) => {
        this.state.searchQuery = searchQuery;
    }

    render() {
        this.el.classList.add('search');
        this.el.addEventListener('submit', (e) => {
            e.preventDefault()
            const searchQuery = new FormData(e.target).get('input')
            this.search(searchQuery);
        });

        this.el.innerHTML = `
            <div class='search__field'>
                <input
                    class='search__input'
                    name='input'
                    type='text'
                    placeholder='search book or author...'
                    value='${this.state.searchQuery ? this.state.searchQuery : ''}'
                />
                <img class='search__icon' src='/static/search.svg' alt='search icon' />
            </div>

            <button type='submit' class='search__submit' aria-label='search'>
                <img class='search__icon' src='/static/search-white.svg' alt='search icon' />
            </button>
        `;

        return this.el;
    }
}