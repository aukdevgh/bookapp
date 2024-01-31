import { AbstractView } from '../../common/view.js'
import onChange from 'on-change';
import { Header } from '../../components/header/header.js'
import { CardList } from '../../components/card-list/card-list.js';

export class FavoritesView extends AbstractView {

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));

        this.setTitle('Поиск книг');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if(path === 'favorites') {
            this.render();
        }
    }

    render() {
        const main = document.createElement('main');
        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = 'Favorite books';
        main.append(title);
        main.append(new CardList(this.appState, this.appState.favorites).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
   }

 }