import Component from '../Component.js';

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

            window.location('/main/main.html');
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form standard">

                <label for="email">Email:</label>
                <input type="email" name="email" required>
            
                <label for="password">Password:</label>
                <input type="password" name="password" required>

                <button>Sign In</button>

            </form>
        `;
    }
}

export default SignIn;