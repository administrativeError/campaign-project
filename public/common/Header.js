import Component from '../Component.js';

class Header extends Component {
    onRender(header) {
        if (!localStorage.getItem('USER')) {
            const nav = header.querySelector('.main-nav');
            nav.style.display = 'none';
        }
        const logoutLink = header.querySelector('.logout');
        logoutLink.addEventListener('click', () => {
            if (localStorage.getItem('USER')) {
                localStorage.removeItem('USER');
            } 
        });
    }
    renderHTML() {
        return /*html*/ `
    <header>
        <h1 class="title-header">Administrative<br> Error</h1> 
        <nav class="main-nav">
            <a href="../main/main.html">Candidates</a>
            <a href="../compare/compare-graph.html">Compare</a>
            <a href="../about-us/about-us.html">About Us</a>
            <a class="logout" href="../index.html">Logout</a>
        </nav>
    </header>
        `;
    }

}

export default Header;