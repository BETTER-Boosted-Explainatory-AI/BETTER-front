import React, { useState } from "react";
import { LoginContainer, PaginationContainer, FormContainerStyle } from "./LoginPage.style";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import TextFieldComponent from "../../components/FormComponents/TextFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { login, register, confirmRegistration } from "../../apis/auth.api"; 
import Alert from '@mui/material/Alert';

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
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleToggleMode = () => {
        setFormMode(formMode === "login" ? "register" : "login");
        setError("");
        setForm({ username: "", password: "" }); // Optionally reset form
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        setShowError(false);
        console.log(confirmationCode)
        try {
            if (formMode === "login"){
                const response = await login(form.username, form.password);
                if (response && response.user) {
                    console.log("Login successful", response);
                    navigate("/"); // Redirect to main page
                } else {
                    setError("Login failed");
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000); // Hide error after 3 seconds
                }
            } else if (formMode === "register") {
                const response = await register(form.username, form.password);
                if (response && response.user) {
                    console.log("Registration successful", response.user);
                    setUserId(response.user.id);
                    setEmail(response.user.email);
                    setSuccess("Please check your email for the confirmation code.");
                    setTimeout(() => {
                        setSuccess("");
                        setFormMode("confirm");
                    }, 1000); // Hide success message after 3 seconds
                } else {
                    setError("Registration failed");
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000); // Hide error after 3 seconds
                }
            } else if (formMode === "confirm") { 
                const response = await confirmRegistration(userId, email, confirmationCode);
                if (response) {
                    console.log("Confirmation successful", response);
                    setSuccess("Confirmation successful! You can now login.");
                    setTimeout(() => {
                        setSuccess("");
                        setFormMode("login");
                        setForm({ username: "", password: "" });
                        setConfirmationCode("");
                    }, 2000); // Hide success message after 3 seconds
                } else {
                    setError("Confirmation failed");
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000); // Hide error after 3 seconds
                }
            }


        } catch (err) {
            const detail = err.response?.data?.detail;
            if (detail && detail.includes(":")) {
                setError(detail.split(":").pop().trim());
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000); // Hide error after 3 seconds
            } else {
                setError(detail || "An error occurred");
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000); // Hide error after 3 seconds
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <LoginContainer>
                <FormContainerStyle as="form" onSubmit={handleSubmit}>
                   {formMode !== "confirm" && (
                       <TextFieldComponent
                     inputName="username"
                     inputValue={form.username}
                     inputLabel="Username"
                     handleChange={handleChange}
                    />
                    )} 
                {formMode !== "confirm" && (
                 <TextFieldComponent
                     inputName="password"
                     inputValue={form.password}
                     inputLabel="Password"
                     inputType="password"
                     handleChange={handleChange}
                 />
                )}
                {formMode === "confirm" && (
                    <TextFieldComponent
                        inputName="confirmation_code"
                        inputValue={confirmationCode}
                        inputLabel="Confirmation Code"
                        handleChange={e => setConfirmationCode(e.target.value)}
                    />
                )}
                    <ButtonComponent
                        label={loading ? (formMode === "login" ? "Logging in..." : "Registering...") : (formMode === "login" ? "Login" : "Register")}
                        onClickHandler={handleSubmit}
                        >
                    </ButtonComponent>
                    <div>
                    <button type="button" onClick={handleToggleMode} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}>
                        {formMode === "login" ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                    </div>
                    {success && <Alert severity="success" onClose={() => setSuccess("")}>{success}</Alert>}
                    {showError && error && <Alert severity="error" onClose={() => setShowError(false)}>{error}</Alert>}
                </FormContainerStyle>
            </LoginContainer>
            <PaginationContainer>
                <BetterExplanation />

            </PaginationContainer>
        </>

    )
}

export default LoginPage;