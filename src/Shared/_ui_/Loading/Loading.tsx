import { Loading } from "@nextui-org/react";

export default function LoadingSpinner(props: { loading: boolean }) {
    if (!props.loading) return <></>;
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: "10" }}>
            <Loading size="xl" color="error" />
        </div>
    )
}