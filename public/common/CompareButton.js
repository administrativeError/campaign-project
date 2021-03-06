import Component from '../Component.js';

class CompareButton extends Component {
    onRender(dom) {
        const compareButtonListener = dom.querySelector('#compare-button-bottom');

        if (this.props.numberOfFavorites === 0) {
            compareButtonListener.textContent = 'Select at least 1 Candidate';
            compareButtonListener.disabled = true;
        } else if (this.props.numberOfFavorites === 1) {
            compareButtonListener.textContent = `View Candidate Information`;
        } else if (this.props.numberOfFavorites > 1) {
            compareButtonListener.textContent = `Compare ${this.props.numberOfFavorites} Candidates`;
        }
        
        compareButtonListener.addEventListener('click', () => {
            window.location = '../compare/compare-graph.html';
        });
        
    }

    renderHTML() {
        return /*html*/ `
    <div class='compare-container'>
        <button class="signin-button compare-button" id="compare-button-bottom"></button>
    </div>
        `;
    }
}

export default CompareButton;