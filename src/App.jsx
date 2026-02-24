import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from "@react-oauth/google";

export default function App() {

  /* 🔹 SLIDE STATE */
  const [isSignup, setIsSignup] = useState(false);

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
    <div className="h-screen w-screen overflow-hidden">

      {/* 🔥 SLIDING CONTAINER (NEW) */}
      <div
        className={`flex w-[200%] h-full transition-transform duration-700 ${
          isSignup ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >

        {/* ================= LOGIN SECTION (UNCHANGED) ================= */}
        <div className="w-1/2 flex">

          {/* LEFT GOLD SECTION */}
          <div className="w-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 flex flex-col items-center justify-center text-white text-center px-16 rounded-r-[300px]">

            <h2 className="text-5xl font-semibold mb-6">New here ?</h2>

            <p className="text-lg mb-10 max-w-md">
              Unleash your creativity & explore a world of art.
              Join our community today and discover unique pieces
              that inspire you!
            </p>

            {/* 🔥 ONLY CHANGE: onClick added */}
            <button
              onClick={() => setIsSignup(true)}
              className="border-2 border-white px-10 py-3 rounded-full hover:bg-white hover:text-yellow-500 transition"
            >
              JOIN US
            </button>

            <div className="mt-16">
              <img
                src="https://illustrations.popsy.co/yellow/web-design.svg"
                alt="illustration"
                className="w-80"
              />
            </div>

          </div>

          {/* RIGHT LOGIN SECTION */}
          <div className="w-1/2 flex flex-col justify-center px-24">

            <h2 className="text-4xl font-semibold mb-2">LOGIN</h2>
            <p className="text-gray-500 mb-10">
              Enter Login details to get access
            </p>

            <label className="mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email"
              className={`w-full mb-2 p-4 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 ${
                loginEmail && !emailValid
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {loginEmail && !emailValid && (
              <p className="text-red-500 text-sm mb-4">
                Invalid email format.
              </p>
            )}

            <label className="mb-2 text-sm font-medium">
              Password
            </label>

            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className={`w-full p-4 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 ${
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

            <div className="text-right mb-6">
              <button
                onClick={() => {
                  setShowForgotModal(true);
                  setResetEmail("");
                  setResetMessage("");
                }}
                className="text-yellow-600 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <label className="flex items-start gap-2 text-sm mb-6">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              I Accept The Terms & Conditions & Privacy Policy.
            </label>

            <div className="mb-6">
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
              className={`w-full py-4 rounded-full text-lg text-white transition ${
                loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <div className="flex items-center my-8">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

          </div>
        </div>

        {/* ================= EMPTY SIGNUP SECTION (FOR NOW) ================= */}
        {/* ================= SIGNUP SECTION ================= */}
<div className="w-1/2 flex">

  {/* LEFT SIGNUP FORM */}
  <div className="w-1/2 flex flex-col justify-center px-24">

    <h2 className="text-4xl font-semibold mb-2">JOIN US</h2>
    <p className="text-gray-500 mb-10">
      Enter your details to get access
    </p>

    {/* FULL NAME */}
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Full Name"
  className={`w-full mb-2 p-4 border rounded-lg ${
    name && !nameValid ? "border-red-500" : "border-gray-300"
  }`}
/>

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
      onChange={(e) => setSignupEmail(e.target.value)}
      placeholder="Email"
      className={`w-full mb-2 p-4 border rounded-lg ${
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
      onChange={(e) => setSignupPassword(e.target.value)}
      placeholder="Password"
      className={`w-full mb-2 p-4 border rounded-lg ${
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
  <div className="flex gap-6 mb-4 mt-4">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="collector"
        checked={role === "collector"}
        onChange={(e) => setRole(e.target.value)}
      />
      I am an art lover / collector
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="artist"
        checked={role === "artist"}
        onChange={(e) => setRole(e.target.value)}
      />
      I am an artist
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
  <label className="flex items-start gap-2 text-sm mb-4">
    <input
      type="checkbox"
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
    className="w-full bg-yellow-500 text-white py-4 rounded-full mt-4 hover:bg-yellow-600 transition"
  >
    JOIN US
  </button>
)}

  </div>

  {/* RIGHT GOLD PANEL */}
  <div className="w-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 flex flex-col items-center justify-center text-white text-center px-16 rounded-l-[300px]">

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

    <div className="mt-16">
  <img
    src="https://illustrations.popsy.co/yellow/web-design.svg"
    alt="illustration"
    className="w-80"
  />
</div>

  </div>

</div>

      </div>

    </div>
  );
}