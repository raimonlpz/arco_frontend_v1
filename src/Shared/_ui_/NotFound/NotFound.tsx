import { Layout } from "../Layout/Layout";
import { TbFaceIdError } from 'react-icons/tb';
import { Spacer } from "@nextui-org/react";

export default function NotFoundPage() {

    return (
        <Layout>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <Spacer />
                <TbFaceIdError size="80" />
                <Spacer />
                <p>
                    <i>Page Not Found</i>
                </p>
            </div>
        </Layout>
    );
}