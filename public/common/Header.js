import Component from '../Component.js';

class Header extends Component {
    // onRender(header) {
    //     const logoutLink = header.querySelector('.logout');
    //     logoutLink.addEventListener('click', () => {

    //     });
    // }
    renderHTML() {
        return /*html*/ `
    <header>
        <h1>Administrative Error</h1> 
        <p>
            <a href="../main/main.html">Candidates</a>
            <a href="../compare/compare-graph.html">Compare</a>
            <a class="logout" href="../login-page/login.html">Logout</a>
        </p>
    </header>
        `;
    }

}

export default Header;