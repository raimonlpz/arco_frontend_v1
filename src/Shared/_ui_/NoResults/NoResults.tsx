import { Spacer } from "@nextui-org/react";
import { TbFaceIdError } from "react-icons/tb";
import { Layout } from "../Layout/Layout";


export default function NoResults() {

    return (
        <Layout>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <h1>Oops!</h1>
                <p>Sorry, we haven't found any result for your search.</p>
                <Spacer />
                <TbFaceIdError size="80" />
                <Spacer />
                <p>
                    <i>Try again!</i>
                </p>
            </div>
        </Layout>
    );
}