import Component from '../Component.js';
import Header from '../common/Header.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import { signUp as userSignUp, signIn as userSignIn } from '../services/api.js';

function success(user) {
    localStorage.setItem('USER', JSON.stringify(user));
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || '/';
}

class AuthApp extends Component {

    onRender(dom) {
        
        const errors = dom.querySelector('.errors');
        const signInButton = dom.querySelector('.signin-button');
        const signUpButton = dom.querySelector('.signup-button');
        const signUpContainer = dom.querySelector('#signup-container');
        const signInContainer = dom.querySelector('#signin-container');
        const main = dom.querySelector('.main-child-container');
        
        const header = new Header();
        main.prepend(header.renderDOM());
        
        const signUp = new SignUp({
            onSignUp: async newUser => {
                errors.textContent = '';

                try {
                    const user = await userSignUp(newUser);
                    success(user);
                    window.location = `main/main.html`;
                }
                catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });

        signUpContainer.appendChild(signUp.renderDOM());
        
        const signIn = new SignIn({
            onSignIn: async credentials => {
                errors.textContent = '';

                try {
                    const user = await userSignIn(credentials);
                    success(user);
                    window.location = `main/main.html`;
                }
                catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });
        signInContainer.appendChild(signIn.renderDOM());

        signInButton.addEventListener('click', () => {
            signInContainer.style.display = 'block';
            signUpContainer.style.display = 'none';
        });

        signUpButton.addEventListener('click', () => {
            signUpContainer.style.display = 'block';
            signInContainer.style.display = 'none';
        });
        
    }

    renderHTML() {
        return /*html*/`
            <div class="main-container">
                <!-- header goes here -->
                <div class="main-child-container">
                    <main>
                        <p class="errors"></p>
                        <section class='home-container'>
                            <button class="signin-button">Sign In</button>
                            <button class="signup-button">Sign Up</button>
                            <div style="display:none;" id="signup-container">
                            </div>
                            <div style="display:none;" id="signin-container">
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        `;
    }
}

export default AuthApp;