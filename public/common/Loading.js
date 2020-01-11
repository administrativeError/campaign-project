import Component from '../Component.js';

class Loading extends Component {
    renderHTML() {
        const loading = this.props.loading;
        if (!loading) {
            return /*html*/`<div></div>`;
        }

        return /*html*/`
            <div class="loading-container">
                <img class="loading-spinner" src="../assets/loading/quater-spin-nobackground.gif">
            </div>
        `;
    }
}

export default Loading;