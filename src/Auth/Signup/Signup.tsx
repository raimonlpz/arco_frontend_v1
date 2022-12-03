import { Button, Grid, Input, Spacer, Text, useInput } from "@nextui-org/react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom"
import { Layout } from "../../Shared/Layout/Layout"
import { FaUserAstronaut } from "react-icons/fa";
import { pages } from "../../Shared/_utils_/routes";

export const SignupPage = () => {

    const navigate = useNavigate();

    const { value, reset, bindings } = useInput("");

    const validateEmail = (value: string) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    }

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
                    />
                </Grid>
                <Spacer /> 
                <Spacer />
                <Grid>
                    <Button color="gradient" auto ghost>
                        Signup
                    </Button>
                </Grid>
                <Spacer />
                <Button auto size="lg" css={{background: "none"}} onClick={() => navigate(pages.login)}>
                    <Text size={15}>
                        Already have an account yet? Login here
                    </Text>
                </Button>

            </Grid.Container>
        </Layout>
    )
}