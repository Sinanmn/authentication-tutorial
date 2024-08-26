import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../provider/AuthProvider";


const Reg = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const image = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        // Password validation
        if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            toast.error('Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long');
            return;
        }

        // Create user and update profile
        createUser(email, password, name, image)
            .then(result => {
                console.log(result);
                toast.success('User created successfully');
                updateUserProfile(name,image)
                .then(() => {
                    toast.success('Update user profile successfully');
                })
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div>
            
            <div className="hero my-10">
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-200 border-2">
                    <div>
                        <h2 className="text-2xl font-bold text-center mt-10">Please Register</h2>
                    </div>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="photo URL" className="input input-bordered" required /> {/* Provide input for photo URL */}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="mb-4 relative border-2">
                                <input
                                    className=" w-full bg-white rounded-lg p-2"
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
                            <button className="btn bg-green-400 text-white">Register</button>
                        </div>
                    </form>
                    <p className="text-center mb-6">Already have an account? <Link to='/login' className="text-blue-500 font-semibold">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Reg;