import Component from '../Component.js';

class CompareButton extends Component {
    onRender(dom) {
       
    }

    renderHTML() {
        return /*html*/ `
    <div class='compare-container'>
            <button class="signin-button">Compare</button>
    </div>
        `;
    }

}

export default CompareButton;