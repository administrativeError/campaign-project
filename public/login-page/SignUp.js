import Component from '../Component.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignUp(user);
            
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form standard">

                    <label for="name">Name:</label>
                    <input name="name" required>
                    
                    <label for="email">Email:</label>
                    <input type="email" name="email" required>
                
                    <label for="password">Password:</label>
                    <input type="password" name="password" required>

                    <button>Sign Up</button>

            </form>
        `;
    }
}

export default SignUp;