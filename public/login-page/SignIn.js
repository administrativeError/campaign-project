import Component from '../Component.js';
import MainApp from '../main/MainApp.js';

class SignIn extends Component {

    onRender(form) {
        const onSignIn = this.props.onSignIn;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignIn(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form standard">

                <label for="email">Email: <input type="email" name="email" required></label>
                
            
                <label for="password">Password: <input type="password" name="password" required></label>
                

                <button class="signin-button">Sign In</button>
                <p class="go-back-link"><a href="../index.html">Go Back</a></p>
            </form>
        `;
    }
}

export default SignIn;