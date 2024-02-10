import React, { useState } from "react";
import SweetAlertLoading from "./components/SweetAlertLoading";
import SweetAlertError from "./components/SweetAlertError";


const Login = ({handleLogin}) => {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // handleLogin(userid, password);
            // console.log(userid);
            // console.log(password);
            await handleLogin(userid, password);
        } catch (error) {
            setError("Login failed. Please check your credentials");
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }

    const handleCloseErrorModal = () => {
        setError(null);
      };
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block">
                                    <img
                                            src={`${process.env.PUBLIC_URL}/img/login.jpg`}
                                            alt="Example"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-user"
                                                        id="userid" aria-describedby="useridHelp"
                                                        placeholder="Enter Your Userid..." 
                                                        value={userid} 
                                                        onChange={(e) => setUserid(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="password" 
                                                        placeholder="Password" 
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-user btn-block"
                                                    >
                                                    Login
                                                </button>
                                                <hr />
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register.html">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                  </div>
                </div>

                <SweetAlertLoading show={loading} />
                <SweetAlertError show={!!error} message={error} onClose={handleCloseErrorModal} />
        </>
    );
};

export default Login;