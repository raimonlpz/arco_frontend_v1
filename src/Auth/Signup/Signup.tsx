import { Button, Grid, Input, Spacer, Text, useInput } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Layout } from "../../Shared/Layout/Layout"
import { FaUserAstronaut } from "react-icons/fa";
import { pages } from "../../Shared/_utils_/routes";
import { AuthService } from "../_services_";
import { LocalStorage } from "../../Shared/_services_";
import { TokenResponse } from "../_models_";
import { useAuthStore } from "../_store_/auth";

export const SignupPage = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { value, reset, bindings } = useInput("");

    const setToken = useAuthStore((state) => state.setToken);

    const validateEmail = (value: string): RegExpMatchArray | null => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    }

    const validatePassword = (value: string): boolean => {
        return value.trim().length > 0;
    }

    // To-do: fix this reactive check
    const helper = useMemo(() => {
        if (!value) {
            return {
                text: "",
                color: ""
            }
        }
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Correct email" : "Enter a valid email",
            color: isValid ? "success" : "error"
        }
    }, [value])

    const validateForm = (): boolean => {
        return validateEmail(email)! && validatePassword(password);
    }

    const signUp = () => {
        const auth = new AuthService();
        auth.signup({ email, password }).then(res => {
            const I = auth.resolveInterface(res);
            switch (I) {
                case 'TokenResponse': 
                    const { access_token } = res as TokenResponse;
                    LocalStorage.setToken(access_token);
                    setToken(access_token)
                    navigate('/search');
                    break;
                case 'AuthError':
                case 'Error':
                    // To-do: handle error with UI Helpers
                    break;
            }
        })
    }

    return (
        <Layout>
            <Grid.Container css={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Grid>
                    <FaUserAstronaut size="60" />
                </Grid>
                <Spacer />
                <Grid>
                    <Input
                        {...bindings}
                        clearable 
                        shadow={false}
                        onClearClick={reset}
                        status={helper.color as any}
                        color={helper.color as any}
                        helperColor={helper.color as any}
                        helperText={helper.text}
                        type="email"
                        label="Email"
                        placeholder="user_web3@mail.com"
                        css={{width: "300px"}}
                        onChange={(e) => setEmail(e.target.value)}
                    />
            
                </Grid>
                <Spacer />
                <Grid>
                    <Input.Password 
                        clearable 
                        color="warning"
                        initialValue="123"
                        helperText="Insecure password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password with eye"
                        css={{width: "300px"}}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Spacer /> 
                <Spacer />
                <Grid>
                    <Button 
                        color="gradient" 
                        auto 
                        ghost 
                        disabled={!validateForm()}
                        onClick={() => signUp()}
                    >
                        Signup
                    </Button>
                </Grid>
                <Spacer />
                <Button 
                    auto 
                    size="lg" 
                    css={{background: "none"}} 
                    onClick={() => navigate(pages.login)}
                >
                    <Text size={15}>
                        Already have an account? Login here
                    </Text>
                </Button>

            </Grid.Container>
        </Layout>
    )
}