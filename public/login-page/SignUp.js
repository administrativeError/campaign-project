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

                    <label for="name">Name: <input name="name" required></label>
                    
                    
                    <label for="email">Email: <input type="email" name="email" required></label>
                    
                
                    <label for="password">Password: <input type="password" name="password" required></label>
                    

                    <button class="signin-button">Sign Up</button>

            </form>
        `;
    }
}

export default SignUp;