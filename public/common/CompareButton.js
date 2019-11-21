import Component from '../Component.js';

class CompareButton extends Component {
    onRender(dom) {
        const compareButtonListener = dom.querySelector('#compare-button-bottom');
        compareButtonListener.addEventListener('click', () => {
            window.location = '../compare/compare-graph.html';
        });
    }

    renderHTML() {
        return /*html*/ `
    <div class='compare-container'>
            <button class="signin-button" id="compare-button-bottom">Compare</button>
    </div>
        `;
    }

}

export default CompareButton;