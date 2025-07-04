import React, { useState } from "react";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import TextFieldComponent from "../../components/FormComponents/TextFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import AlertComponent from "../../components/AlertComponent/AlertComponent";
import FormContainer from "../../components/FormContainer/FormContainer";
import LoginSlogan from "../../components/LoginSlogan/LoginSlogan";
import { LoginContainer, PaginationContainer } from "./LoginPage.style";
import { Login, Register, confirmRegistration } from "../../apis/auth.api";
import { ROUTES } from "../../consts/routes";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState("login"); // "login" or "register"
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggleMode = () => {
    setFormMode(formMode === "login" ? "register" : "login");
    setError("");
    setForm({ username: "", password: "" }); // Optionally reset form
  };

  const handleLogin = async () => {
    const response = await Login(form.username, form.password);
    if (response && response.user) {
      window.location.href = ROUTES.HOME;
    } else {
      showErrorWithTimeout("Login failed");
      setForm({ username: "", password: "" });
    }
  };

  const handleRegister = async () => {
    const response = await Register(form.username, form.password);
    if (response && response.user) {
      setUserId(response.user.id);
      setEmail(response.user.email);
      setSuccess("Please check your email for the confirmation code.");
      setSuccess("");
      setFormMode("confirm");
    } else {
      showErrorWithTimeout("Registration failed");
      setForm({ username: "", password: "" });
    }
  };

  const handleConfirm = async () => {
    const response = await confirmRegistration(userId, email, confirmationCode);
    if (response) {
      setSuccess("Confirmation successful! You can now login.");
      setTimeout(() => {
        setSuccess("");
        setFormMode("login");
        setForm({ username: "", password: "" });
        setConfirmationCode("");
      }, 2000);
    } else {
      showErrorWithTimeout("Confirmation failed");
    }
  };

  const showErrorWithTimeout = (msg) => {
    setError(msg);
    setShowError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setShowError(false);

    try {
      if (formMode === "login") await handleLogin();
      else if (formMode === "register") await handleRegister();
      else if (formMode === "confirm") await handleConfirm();
    } catch (err) {
      const detail = err.response?.data?.detail;
      showErrorWithTimeout(
        detail && detail.includes(":")
          ? detail.split(":").pop().trim()
          : detail || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    if (formMode === "confirm") {
      return (
        <TextFieldComponent
          inputName="confirmation_code"
          inputValue={confirmationCode}
          inputLabel="Confirmation Code"
          handleChange={(e) => setConfirmationCode(e.target.value)}
        />
      );
    }
    return (
      <>
        <TextFieldComponent
          inputName="username"
          inputValue={form.username}
          inputLabel="Email"
          handleChange={handleChange}
        />
        <TextFieldComponent
          inputName="password"
          inputValue={form.password}
          inputLabel="Password"
          inputType="password"
          handleChange={handleChange}
        />
      </>
    );
  };

  return (
    <>
      <LoginContainer>
        <LoginSlogan />
        <FormContainer
          as="form"
          onSubmit={handleSubmit}
          width="50%"
          align="center"
          dropShadow={true}
          showTitle={false}
        >
          {renderFields()}
          <ButtonComponent
            label={
              formMode === "login"
                ? "Login"
                : formMode === "register"
                ? "Register"
                : "Confirm"
            }
            loading={loading}
            onClickHandler={handleSubmit}
            hideParagraph={true}
          />
          {formMode !== "confirm" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={handleToggleMode}
                style={{
                  background: "none",
                  border: "none",
                  color: "#222831",
                  cursor: "pointer",
                }}
              >
                {formMode === "login"
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </button>
            </div>
          )}
          {success && (
            <AlertComponent
              severity="success"
              onClose={() => setSuccess("")}
              message={success}
            ></AlertComponent>
          )}
        </FormContainer>
        {showError && error && (
          <AlertComponent
            severity="error"
            onClose={() => setShowError(false)}
            message={error}
          ></AlertComponent>
        )}
      </LoginContainer>
      <PaginationContainer>
        <BetterExplanation />
      </PaginationContainer>
    </>
  );
};

export default LoginPage;
