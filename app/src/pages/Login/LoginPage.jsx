import React, { useState } from "react";
import { LoginContainer, PaginationContainer, FormContainerStyle } from "./LoginPage.style";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import TextFieldComponent from "../../components/FormComponents/TextFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import {login} from "../../apis/auth.api"; 

const LoginPage = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login(form.username, form.password);
            if (response && response.user) {
                console.log("Login successful", response);
                navigate("/"); // Redirect to main page
            } else {
                setError("Login failed");
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <LoginContainer>
                <FormContainerStyle as="form" onSubmit={handleSubmit}>
                    <TextFieldComponent
                        inputName="username"
                        inputValue={form.username}
                        inputLabel="Username"
                        handleChange={handleChange}
                    />
                    <TextFieldComponent
                        inputName="password"
                        inputValue={form.password}
                        inputLabel="Password"
                        inputType="password"
                        handleChange={handleChange}
                    />
                    <ButtonComponent
                        label={loading ? "Logging in..." : "Login"}
                        onClickHandler={handleSubmit}
                        >
                    </ButtonComponent>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                </FormContainerStyle>
            </LoginContainer>
            <PaginationContainer>
                <BetterExplanation />

            </PaginationContainer>
        </>

    )
}

export default LoginPage;