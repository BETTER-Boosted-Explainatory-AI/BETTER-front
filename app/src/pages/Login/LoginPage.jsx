import React from "react";
import { LoginContainer, PaginationContainer, FormContainerStyle } from "./LoginPage.style";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import TextFieldComponent from "../../components/FormComponents/TextFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const LoginPage = () => {

    return (
        <>
            <LoginContainer>
                <FormContainerStyle>
                    <TextFieldComponent
                        inputName="username"
                        inputValue=""
                        inputLabel="Username"
                        handleChange={() => { }}
                    />
                    <TextFieldComponent
                        inputName="password"
                        inputValue=""
                        inputLabel="Password"
                        inputType="password"
                        handleChange={() => { }}
                    />
                    <ButtonComponent
                        label="Login">
                    </ButtonComponent>
                </FormContainerStyle>
            </LoginContainer>
            <PaginationContainer>
                <BetterExplanation />

            </PaginationContainer>
        </>

    )
}

export default LoginPage;