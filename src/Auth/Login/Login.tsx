import { Layout } from "../../Shared/Layout/Layout"
import { FaUserNinja } from "react-icons/fa";
import { Button, Grid, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "../../Shared/_utils_/routes";
import { useAuthStore } from "../_store_/auth";
import { AuthService } from "../_services_";
import { AuthError, TokenResponse } from "../_models_";
import { LocalStorage } from "../../Shared/_services_";

export const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    const [ setToken, session ] = useAuthStore((state) => [
        state.setToken, 
        state.access_token
    ])

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

    const validateForm = (): boolean => {
        return validateEmail(email)! && validatePassword(password);
    }

    const login = () => {
        const auth = new AuthService();
        auth.signin({ email, password }).then(res => {
            const I = auth.mapType(res);
            switch (I) {
                case 'TokenResponse':
                    const { access_token } = res as TokenResponse;
                    LocalStorage.setToken(access_token);
                    setToken(access_token);
                    break;
                case 'AuthError':
                    const autherr = res as AuthError;
                    setLoginError(true);
                    setLoginErrorMsg(`${autherr.error} | ${autherr.message}`);
                    break;
                case 'Error':
                    const err = res as Error; 
                    setLoginError(true);
                    setLoginErrorMsg(`${err.message}`);
                    break;
            }
        });
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

    return (
        <Layout >
            <Grid.Container css={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Grid>
                    <FaUserNinja size="50" />
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
                        color={validatePassword(password) ? "success" : "warning"}
                        initialValue="123"
                        helperText="Encrypted password 🔒"
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
                        onClick={() => login()}
                    >
                        Login
                    </Button>
                </Grid>
                <Spacer />
                <Button auto size="lg" css={{background: "none"}} onClick={() => navigate(pages.signup)}>
                    <Text size={15}>
                        Don't have an account yet? <Text b size={15}>Signup here</Text>
                    </Text>
                </Button>
            </Grid.Container>

            <Modal
                 closeButton 
                 blur 
                 aria-labelledby="Error"    
                 open={loginError}
                 onClose={() => setLoginError(false)}
            >
                <Modal.Header>
                    <Text id="Login Error" size={18}>
                        Login <Text b size={18}> Error</Text>
                    </Text>
                </Modal.Header>
                <Modal.Body css={{alignItems:"center"}}>
                    <Text size={15}>
                        {loginErrorMsg}
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={() => setLoginError(false)}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>
        </Layout>
    )
}