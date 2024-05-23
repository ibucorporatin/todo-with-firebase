import React from "react";
import logo from "../../assets/images/Group.png";
import google from "../../assets/images/grommet-icons_google.png";
import boy from "../../assets/images/Rectangle.png";
import light from "../../assets/images/lamp.png";
import background from "../../assets/images/background.png";
import "./login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config";
function Login() {
  const onLogin = () => {
    try {
      signInWithPopup(auth, provider).then((data) => {
        localStorage.setItem("uid", data?.user?.uid);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="max-container padding-container login-container">
      <img src={logo} alt="logo" className="login" />
      <img src={boy} alt="boy" className="img-boy" />
      <img src={light} alt="light" className="img-light" />
      <img src={background} alt="background" className="img-background" />

      <div className="child-container">
        <h2>LOGIN</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at
          eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae
          faucibus nibh dolor dui.
        </p>
        <button onClick={onLogin}>
          <span className="google-logo-container">
            <img src={google} alt="google" className="login" />
          </span>
          <span className="login-button-text">Sign in using Facebook</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
