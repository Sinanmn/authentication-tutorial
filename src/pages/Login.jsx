import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";




const Login = () => {

    const auth = getAuth(app)

    const [user, setUser] = useState(null)

    const googleProvider = new GoogleAuthProvider();
   


    const [showPassword, setShowPassword] = useState(false)

    const { signIn } = useContext(AuthContext);
   

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        signIn(email, password)
            .then(result => {
                console.log(result)
                toast.success('User login successfully');
            })
            .catch(error => {
                console.error(error);
                toast.error('Incorrect email or password. Please try again.');
            });
    };

    // For Google 
    const handleGoogleSignIn = () => {
      signInWithPopup(auth, googleProvider)
      .then(result => {
          const loggedInUser = result.user;
          const user = result.user;
          console.log(user);
          setUser(loggedInUser)
          toast.success('User login successfully');
          navigate(location?.state ? location.state : '/');
        
      })
      .catch(error => {
          console.log('error', error.message)
          toast.error(error.message);
      })
    }

   
    return (
        <div>
          
            <div className="hero my-10">
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-200 border-2">
                    <div>
                        <h2 className="text-2xl font-bold text-center mt-10">Login your account</h2>
                    </div>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="mb-4 relative border-2">
                                <input
                                    className=" w-full bg-white rounded-xl p-2"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Your Password"
                                    id="" required />
                                <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-green-400 text-white">Login</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <h4>Login with</h4>
                        <div className="flex space-x-5 items-center justify-center">
                            <button onClick={handleGoogleSignIn}><FcGoogle /></button>
                        </div>
                    </div>
                    <p className="text-center mb-6"> Do not have an account? <Link to='/register' className="text-red-500 font-semibold">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;