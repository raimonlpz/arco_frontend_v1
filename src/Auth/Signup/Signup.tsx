import { Button, Grid, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Layout } from "../../Shared/Layout/Layout"
import { FaUserAstronaut } from "react-icons/fa";
import { pages } from "../../Shared/_utils_/routes";
import { AuthService } from "../_services_";
import { LocalStorage } from "../../Shared/_services_";
import { AuthError, TokenResponse } from "../_models_";
import { useAuthStore } from "../_store_/auth";

export const SignupPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [signupError, setSignupError] = useState(false);
    const [signupErrorMsg, setSignupErrorMsg] = useState('');

    const [ setToken, session ] = useAuthStore((state) => [ state.setToken, state.access_token ]);

    useEffect(() => {
        if (session) navigate('/search');
    }, [
        session, 
        navigate
    ])

    const validateEmail = (value: string): RegExpMatchArray | null => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    }

    const validatePassword = (value: string): boolean => {
        return value.trim().length > 0;
    }

    const validate2Password = (): boolean => {
        return password === password2 && 
            validatePassword(password) && 
            validatePassword(password2);
    }

    const validateForm = (): boolean => {
        return validateEmail(email)! && validate2Password();
    }

    const signUp = () => {
        const auth = new AuthService();
        auth.signup({ email, password }).then(res => {
            const I = auth.mapType(res);
            switch (I) {
                case 'TokenResponse': 
                    const { access_token } = res as TokenResponse;
                    LocalStorage.setToken(access_token);
                    setToken(access_token)
                    break;
                case 'AuthError':
                    const autherr = res as AuthError;
                    setSignupError(true);
                    setSignupErrorMsg(`${autherr.error} | ${autherr.message}`);
                    break;
                case 'Error':
                    const err = res as Error;
                    setSignupError(true);
                    setSignupErrorMsg(`${err.message}`);
                    break;
            }
        })
    }

    /**
     * UI form helpers
     */
    const emailStats = (): {
        color: "success" | "warning",
        msg: string
    } => {
        return validateEmail(email) ? 
        {
            color: 'success',
            msg: 'Correct email'
        } : 
        {
            color: 'warning',
            msg: 'Enter a valid email'
        };
    }

    const passwordStats = (): {
        color: "success" | "error",
        msg: string
    } => {
        return validate2Password() ?
        {
            color: "success",
            msg: ""
        } : 
        {
            color: "error",
            msg: "Passwords do not match"
        }
    }

    return (
        <Layout>
            <Grid.Container css={{display: "flex", flexDirection:"column", alignItems: "center"}}>
            <Spacer />
            <Spacer />
                <Grid>
                    <FaUserAstronaut size="50" />
                </Grid>
                <Spacer />
                <Grid>
                    <Input
                        autoComplete="false"
                        clearable 
                        shadow={false}
                        status={emailStats().color}
                        color={emailStats().color}
                        helperColor={emailStats().color}
                        helperText={emailStats().msg}
                        type="email"
                        label="Email"
                        placeholder="user@mail.com"
                        css={{width: "300px"}}
                        onChange={(e) => setEmail(e.target.value)}
                    />
            
                </Grid>
                <Spacer />
                <Grid>
                    <Input.Password 
                        autoComplete="false"
                        clearable 
                        color={validate2Password() ? "success" : "warning"}
                        initialValue="123"
                        helperText="Encrypted password 🔒"
                        type="password"
                        label="Password"
                        placeholder="Enter your password with eye"
                        css={{width: "300px"}}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                {
                    password.length > 0 && (
                        <>
                            <Spacer /> 
                            <Grid>
                                <Input.Password 
                                    clearable 
                                    color={passwordStats().color}
                                    status={passwordStats().color}
                                    helperText={passwordStats().msg}
                                    initialValue="123"
                                    type="password"
                                    label="Repeat Password"
                                    placeholder="Enter your same password"
                                    css={{width: "300px"}}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                            </Grid>
                        </>
                    )
                }

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
                        Already have an account? <Text b size={15}>Login here</Text>
                    </Text>
                </Button>

            </Grid.Container>

            <Modal
                closeButton 
                blur 
                aria-labelledby="Error"    
                open={signupError}
                onClose={() => setSignupError(false)}
            >
                <Modal.Header>
                    <Text id="Signup Error" size={18}>
                        Sign up <Text b size={18}> Error</Text>
                    </Text>
                </Modal.Header>
                <Modal.Body css={{alignItems:"center"}}>
                    <Text size={15}>
                        {signupErrorMsg}
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={() => setSignupError(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}