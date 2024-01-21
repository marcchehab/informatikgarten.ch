import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { Nav } from "@portaljs/core";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import log from "./logger";

function LoginBtn() {
    const router = useRouter();
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <button
                    title="Go to dashboard"
                    onClick={() => router.push("/dashboard")}
                >
                    {session.user && session.user.image ? (
                        <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="w-7 h-7 rounded-full opacity-90 m-4 hover:opacity-100"
                        />
                    ) : (
                        <FeatherIcon
                            icon="user"
                            className="opacity-50 m-4 hover:opacity-70"
                        />
                    )}
                </button>
            </>
        );
    }
    return (
        <>
            <button
                title="Login"
                onClick={() =>
                    signIn(
                        "azure-ad",
                        { callbackUrl: "/dashboard" }
                    )
                }
            >
                <FeatherIcon
                    icon="log-in"
                    className="opacity-50 m-4 hover:opacity-70"
                />
            </button>
        </>
    );
}

const NavWithAuth = (props) => {
    const { data: session } = useSession();
    const [navElement, setNavElement] = useState(null);

    useEffect(() => {
        setNavElement(document.querySelector("nav"));
    }, []);

    return (
        <>
            <Nav {...props} />
            {navElement && createPortal(<LoginBtn />, navElement)}
        </>
    );
};

export default NavWithAuth;
