import { AbstractView } from '../../common/view.js'
import onChange from 'on-change';
import { Header } from '../../components/header/header.js'
import { Search } from '../../components/search/search.js'
import { Books } from '../../components/books/books.js'

export class MainView extends AbstractView {
    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск книг');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if(path === 'favorites') {
            this.render();
        }
    }


    async stateHook(path) {
        if(path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;


            this.state.list = data.docs;
            this.state.numFound = data.numFound;
        }
        if(path === 'loading') {
            this.render();
        }
        if(path === 'list') {
            this.render();
        }
        if(path === 'numFound') {
            this.render()
        }
    }

    async loadList(query, offset) {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&offset=${offset}`);

        return response.json();
    }

    render() {
        const main = document.createElement('main');
        main.append(new Search(this.state).render())
        main.append(new Books(this.appState, this.state).render())
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
   }

 }