import "./AppEnhancement.css";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import assistant from "./assets/assistant.svg";
import logo from "./assets/Logo.png";

export default function App() {

  /* 🔹 SLIDE STATE */
  const [isSignup, setIsSignup] = useState(false);
  const [signupStep, setSignupStep] = useState(0);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // 🔹 Signup States
const [name, setName] = useState("");
const [signupEmail, setSignupEmail] = useState("");
const [signupPassword, setSignupPassword] = useState("");
const [role, setRole] = useState("");
const [signupTerms, setSignupTerms] = useState(false);
const [signupCaptchaVerified, setSignupCaptchaVerified] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const recaptchaRef = useRef();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail);
  const passwordValid = loginPassword.length >= 6;
  const resetEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail);

  // 🔹 Signup Validations
const nameValid = /^[A-Za-z ]{3,}$/.test(name);
const signupEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail);
const signupPasswordValid =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(signupPassword);

  const handleLogin = () => {
    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }
    if (!passwordValid) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!termsAccepted) {
      setError("Please accept Terms & Conditions.");
      return;
    }
    if (!captchaVerified) {
      setError("Please verify that you are not a robot.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        loginEmail === "admin@gmail.com" &&
        loginPassword === "Admin@123"
      ) {
        setShowSuccess(true);
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
      recaptchaRef.current.reset();
      setCaptchaVerified(false);
    }, 1200);
  };

  const handleResetPassword = () => {
    if (!resetEmailValid) {
      setResetMessage("Enter a valid email address.");
      return;
    }

    setResetMessage("Sending reset link...");

    setTimeout(() => {
      setResetMessage("Password reset link sent successfully!");
    }, 1000);
  };

  const handleGoogleSuccess = () => {
    setShowSuccess(true);
  };

  const handleGoogleError = () => {
    setError("Google Login Failed.");
  };

  return (

    /* 🔥 OUTER WRAPPER (NEW) */
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
    <img
  src={logo}
  alt="logo"
  className="absolute top-3 right-4 lg:top-4 z-50 w-12 lg:w-20 bg-white p-2 rounded-xl shadow-lg transition-all duration-700"
  style={{
    right: isSignup ? "auto" : "20px",
    left: isSignup ? "20px" : "auto"
  }}
/>

    <motion.div
  className="hidden lg:block absolute top-0 h-full w-[50%] bg-yellow-400 z-0"
  animate={{
    left: isSignup ? "50%" : "0%",
    clipPath: isSignup
      ? "polygon(15% 0%,100% 0%,100% 100%,15% 100%,0% 50%)"
      : "polygon(0% 0%,85% 0%,100% 50%,85% 100%,0% 100%)"
  }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
/>

      

      {/* 🔥 SLIDING CONTAINER (NEW) */}
      <div
  className={`relative z-10 flex flex-col lg:flex-row w-full lg:w-[200%] h-full transition-transform duration-700 ${
    isSignup ? "lg:-translate-x-1/2" : "translate-x-0"
  }`}
>

        {/* ================= LOGIN SECTION (UNCHANGED) ================= */}
        <div className={`w-full lg:w-1/2 flex flex-col lg:flex-row ${isSignup ? "hidden lg:flex" : ""}`}>

          {/* LEFT GOLD SECTION */}
          <div
          className="w-full lg:w-1/2 flex flex-col items-center justify-center text-black lg:text-white text-center px-6 lg:px-16 mt-0 lg:mt-0 bg-yellow-400 lg:bg-transparent pt-12 pb-8 lg:py-0"
  style={{
  clipPath: "ellipse(120% 85% at 50% 0%)"
}}
>
            <h2 className="text-3xl lg:text-5xl font-semibold mb-4 lg:mb-6">New here ?</h2>

            <p className="text-sm lg:text-lg mb-2 lg:mb-10 max-w-md">
              Unleash your creativity & explore a world of art.
              Join our community today and discover unique pieces
              that inspire you!
            </p>

            {/* 🔥 ONLY CHANGE: onClick added */}
            <button
  onClick={() => {
    setIsSignup(true);
    setSignupStep(1);
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}}
              className="border-2 border-black lg:border-white px-10 py-3 rounded-full hover:bg-white hover:text-yellow-500 transition mt-2"
            >
              JOIN US
            </button>

            <div className="mt-4">
              <img
                src="https://illustrations.popsy.co/yellow/web-design.svg"
                alt="illustration"
                className="hidden lg:block w-full max-w-xs animate-float"
              />
            </div>
            

          </div>

          {/* RIGHT LOGIN SECTION */}
          <div className="relative w-full lg:w-1/2 flex flex-col justify-start lg:justify-center px-6 lg:px-24 mt-0 lg:mt-0 opacity-0 animate-fadeIn items-center">

            <h2 className="text-3xl lg:text-4xl font-semibold mb-1 text-center lg:text-left">LOGIN</h2>
            <p className="text-gray-500 mb-6 lg:mb-10 text-center lg:text-left">
              Enter Login details to get access
            </p>

            
  <div className="mb-4 w-full max-w-xs">
  <input
    type="email"
    value={loginEmail}
    onChange={(e) => setLoginEmail(e.target.value)}
    placeholder="Email Address"
    className={`w-full px-4 py-2 border rounded-lg outline-none 
    transition-all duration-300 
    focus:ring-2 focus:ring-yellow-500 
    focus:shadow-md focus:-translate-y-1 ${
      loginEmail && !emailValid
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />
</div>

            {loginEmail.length > 3 && !emailValid && (
              <p className="text-red-500 text-sm mb-4">
                Invalid email format.
              </p>
            )}

            

            <div className="relative mb-2 w-full max-w-xs">
              <input
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg outline-none 
transition-all duration-300 
focus:ring-2 focus:ring-yellow-500 
focus:shadow-md focus:-translate-y-1 ${
  loginPassword && !passwordValid
    ? "border-red-500"
    : "border-gray-300"
}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {loginPassword && !passwordValid && (
              <p className="text-red-500 text-sm mb-4">
                Password must be at least 6 characters.
              </p>
            )}

            <div className="w-full max-w-xs flex justify-end items-center mt-1 mb-3">
              <button
                onClick={() => {
                  setShowForgotModal(true);
                  setResetEmail("");
                  setResetMessage("");
                }}
                className="text-yellow-600 hover:underline text-sm ml-auto pr-3"
              >
                Forgot Password?
              </button>
            </div>

           <label className="mb-3 flex items-center gap-2 w-full max-w-xs mx-auto lg:mx-0">
  <input
    type="checkbox"
    className="mt-1 flex-shrink-0"
    checked={termsAccepted}
    onChange={(e) => setTermsAccepted(e.target.checked)}
  />
  <span className="text-xs lg:text-sm leading-tight">
    I Accept The Terms & Conditions & Privacy Policy.
  </span>
</label>

            <div className="mb-3">
              <ReCAPTCHA
                sitekey="6Le_DHQsAAAAAAJW1W3PhcnsUWmmLx_bBdh6m-Pw"
                onChange={() => setCaptchaVerified(true)}
                ref={recaptchaRef}
              />
            </div>

            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}

            <button
  onClick={handleLogin}
  disabled={loading}
  className={`mx-auto lg:mx-auto w-60 py-3 rounded-full text-base font-medium text-white transition-all duration-200 ${
  loading
    ? "bg-yellow-300 cursor-not-allowed"
    : "bg-yellow-600 hover:bg-yellow-700 hover:scale-105 active:scale-95 active:shadow-inner"
}`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <div className="flex items-center my-5 w-full max-w-xs mx-auto">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <div className="mx-auto w-60 flex justify-center lg:mx-auto">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={handleGoogleError}
    theme="outline"
    size="large"
    text="signin_with"
    shape="pill"
    width="240"
  />
</div>

          </div>
        </div>

        {/* ================= EMPTY SIGNUP SECTION (FOR NOW) ================= */}
        {/* ================= SIGNUP SECTION ================= */}
<div className={`w-full lg:w-1/2 flex flex-col lg:flex-row ${!isSignup ? "hidden lg:flex" : ""}`}>

  {/* LEFT SIGNUP FORM */}
  <div className="relative w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-center pt-16 pb-20 lg:pb-0 lg:pt-0 px-6 lg:px-24">
  

    <h2 className="text-4xl font-semibold mb-2">JOIN US</h2>
    <p className="text-gray-500 mb-4">
      Enter your details to get access
    </p>

{/* FULL NAME */}
<div className="relative w-full max-w-xs mx-auto mb-3 lg:mb-6">

  <input
    type="text"
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      if (e.target.value.length >= 3) setSignupStep(2);
    }}
    placeholder="Full Name"
    className={`px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-yellow-500 transition ${
      name && !nameValid ? "border-red-500" : "border-gray-300"
    }`}
  />

  {isSignup && signupStep < 5 && !role && (
    <>
      <motion.img
  src={assistant}
  alt="assistant"
  className="hidden lg:block absolute right-[-120px] w-28"
  animate={{
    top:
      signupStep === 1
        ? 10
        : signupStep === 2
        ? 80
        : signupStep === 3
        ? 150
        : 220,
  }}
  transition={{ duration: 0.5 }}
/>

      <motion.div
  className="hidden lg:block absolute right-[-250px] bg-white text-black px-4 py-2 rounded-xl shadow-lg text-sm whitespace-nowrap"
  animate={{
    top:
      signupStep === 1
        ? -45
        : signupStep === 2
        ? 25
        : signupStep === 3
        ? 95
        : 165,
  }}
  transition={{ duration: 0.5 }}
>
        {
  signupStep === 1
    ? "Hey! What's your name?"
    : signupStep === 2
    ? "Great! What's your email?"
    : signupStep === 3
    ? "Create a strong password."
    : "Select your role to continue."
}
      </motion.div>
    </>
  )}

</div>

{name && !nameValid && (
  <p className="text-red-500 text-sm mb-4">
    Name must be at least 3 letters (no special characters).
  </p>
)}

{/* EMAIL (SHOW ONLY IF NAME VALID) */}
{nameValid && (
  <>
    <input
      type="email"
      value={signupEmail}
      onChange={(e) => {
  setSignupEmail(e.target.value);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
    setSignupStep(3);
  }
}}
      placeholder="Email"
      className={`px-4 py-2 border rounded-lg w-full max-w-xs mb-3 lg:mb-6 focus:ring-2 focus:ring-yellow-500 transition ${
  signupEmail && !signupEmailValid
    ? "border-red-500"
    : "border-gray-300"
}`}
    />

    {signupEmail && !signupEmailValid && (
      <p className="text-red-500 text-sm mb-4">
        Enter a valid email address.
      </p>
    )}
  </>
)}

{/* PASSWORD (SHOW ONLY IF EMAIL VALID) */}
{signupEmailValid && (
  <>
    <input
      type="password"
      value={signupPassword}
      onChange={(e) => {
  setSignupPassword(e.target.value);
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(e.target.value)
  ) {
    setSignupStep(4);
  }
}}
      placeholder="Password"
      className={`px-4 py-2 border rounded-lg w-full max-w-xs mb-3 lg:mb-6 focus:ring-2 focus:ring-yellow-500 transition ${
  signupPassword && !signupPasswordValid
    ? "border-red-500"
    : "border-gray-300"
}`}
    />

    {signupPassword && !signupPasswordValid && (
      <p className="text-red-500 text-sm mb-4">
        Password must contain 1 uppercase, 1 lowercase,
        1 number, 1 special character (min 8 chars).
      </p>
    )}

    {/* ROLE SELECTION (SHOW ONLY IF PASSWORD VALID) */}
{signupPasswordValid && (
  <div className="flex w-full justify-between items-center mb-1 mt-0 lg:flex-col lg:max-w-xs">

    <label className="flex items-center gap-2 text-xs">
      <input
        type="radio"
        value="collector"
        checked={role === "collector"}
        onChange={(e) => setRole(e.target.value)}
      />
      Art Lover / Collector
    </label>

    <label className="flex items-center gap-2 text-xs">
      <input
        type="radio"
        value="artist"
        checked={role === "artist"}
        onChange={(e) => setRole(e.target.value)}
      />
      Artist
    </label>

  </div>
)}




{/* SIGNUP CAPTCHA (SHOW ONLY IF ROLE SELECTED) */}
{role && (
  <div className="mb-4">
    <ReCAPTCHA
      sitekey="6Le_DHQsAAAAAAJW1W3PhcnsUWmmLx_bBdh6m-Pw"
      onChange={() => setSignupCaptchaVerified(true)}
    />
  </div>
)}

{/* TERMS (SHOW ONLY IF CAPTCHA VERIFIED) */}
{signupCaptchaVerified && (
  <label className="flex items-center gap-2 text-xs mb-6">
    <input
type="checkbox"
className="mt-0"
checked={signupTerms}
onChange={(e) => setSignupTerms(e.target.checked)}
/>
    By registering, I accept the Terms & Conditions & Privacy Policy.
  </label>
)}
  </>
)}

   {/* JOIN BUTTON (SHOW ONLY IF TERMS ACCEPTED) */}
{signupTerms && (
  <button
className="w-full bg-yellow-500 text-white py-4 rounded-full mt-2 -mb-20 lg:mb-0 hover:bg-yellow-600 transition"
>
    JOIN US
  </button>
)}

<div
className="lg:hidden fixed bottom-0 left-0 w-screen bg-yellow-400 text-center pt-2 pb-10"
style={{clipPath:"ellipse(160% 85% at 50% 100%)"}}
>

 <h2 className="text-xl font-semibold mt-10 mb-2">One of us?</h2>

  <p className="text-xs mb-3 px-6">
    Welcome back to your artistic haven! Log in to continue.
  </p>

  <button
    onClick={() => setIsSignup(false)}
    className="border-2 border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition"
  >
    LOGIN
  </button>

</div>

  </div>

  {/* RIGHT GOLD PANEL */}
  <div className="hidden lg:flex relative w-full lg:w-1/2 flex-col items-center justify-center text-white text-center px-6 lg:px-16">

    <h2 className="text-5xl font-semibold mb-6">One of us ?</h2>

    <p className="text-lg mb-10 max-w-md">
      Welcome back to your artistic haven! Log in to continue.
    </p>

    <button
      onClick={() => setIsSignup(false)}
      className="border-2 border-white px-10 py-3 rounded-full hover:bg-white hover:text-yellow-500 transition"
    >
      LOGIN
    </button>

    <div className="mt-16 relative w-full max-w-xs">

  {/* Background Illustration */}
  <img
  src="https://illustrations.popsy.co/yellow/creative-work.svg"
  alt="illustration"
  className="hidden lg:block w-full max-w-xs animate-float"

/>

  

</div>

  </div>

</div>

      </div>

    </div>
  );
}