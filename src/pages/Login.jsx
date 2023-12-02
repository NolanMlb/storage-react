import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Authenticate } from "../services/UserService";

export const Login = () => {
    const navigate = useNavigate();  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) =>{
        const response  = await Authenticate(data);
        localStorage.clear();
        localStorage.setItem('user-token',response.data.token);
        localStorage.setItem('user-email',response.data.email);
        setTimeout(() => {
            navigate('/dashboard');
        }, 500);
    };
    return (
        <main className="main-wrapper">
        <section className="signin-section">
            <div className="container-fluid">
            <div className="title-wrapper pt-30">
                <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="title">
                    <h2>Sign in</h2>
                    </div>
                </div>
                </div>
            </div>
            <div className="row g-0 auth-row">
                <div className="col-lg-6">
                <div className="auth-cover-wrapper bg-primary-100">
                    <div className="auth-cover">
                    <div className="title text-center">
                        <h1 className="text-primary mb-10">Welcome Back</h1>
                        <p className="text-medium">
                        Sign in to your Existing account to continue
                        </p>
                    </div>
                    <div className="cover-image">
                        <img src="assets/images/auth/signin-image.svg" alt="" />
                    </div>
                    <div className="shape-image">
                        <img src="assets/images/auth/shape.svg" alt="" />
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-6">
                <div className="signin-wrapper">
                    <div className="form-wrapper">
                    <h6 className="mb-15">Sign In Form</h6>
                    <p className="text-sm mb-25">
                        Start creating the best possible user experience for you
                        customers.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                        <div className="col-12">
                            <div className="input-style-1">
                            <label>Email</label>
                            <input defaultValue="test@test.fr" {...register("login",{ required: true })} />
                            {errors.login && <span>Ce champ est requis</span>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-style-1">
                            <label>Password</label>
                            <input type="password" defaultValue="test@test.fr" {...register("password",{ required: true })} />
                            {errors.password && <span>Ce champ est requis</span>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="button-group d-flex justify-content-center flex-wrap">
                            <button type="submit" className="main-btn primary-btn btn-hover w-100 text-center">
                                Sign In
                            </button>
                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="singin-option pt-40">
                        <p className="text-sm text-medium text-center text-gray">
                        Easy Sign In With
                        </p>
                        <p className="text-sm text-medium text-dark text-center">
                        Don’t have any account yet?
                        <Link to={`/signup`} >
                            Create an account
                        </Link>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </main>
    );
}