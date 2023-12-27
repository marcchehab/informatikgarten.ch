import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react";
import { Nav } from "@portaljs/core";
import { createPortal } from "react-dom";

const LoginIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        viewBox="0 0 32 32"
        version="1.1"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.219 26.156h6.094c1.156 0 2.125-0.406 2.875-1.188 0.75-0.75 1.219-1.75 1.219-2.875v-12.219c0-1.125-0.469-2.125-1.219-2.875s-1.75-1.188-2.875-1.188h-6.094v2.563h6.094c0.875 0 1.531 0.656 1.531 1.5v12.219c0 0.844-0.656 1.531-1.531 1.531h-6.094v2.531zM0 13.563v4.875c0 0.563 0.469 1.031 1.031 1.031h5.688v3.844c0 0.344 0.156 0.625 0.469 0.781 0.125 0.031 0.281 0.031 0.344 0.031 0.219 0 0.406-0.063 0.563-0.219l7.344-7.344c0.281-0.281 0.25-0.844 0-1.156l-7.344-7.313c-0.25-0.25-0.563-0.281-0.906-0.188-0.313 0.156-0.469 0.406-0.469 0.75v3.875h-5.688c-0.563 0-1.031 0.469-1.031 1.031z">
            {" "}
        </path>
    </svg>
);

const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
            opacity="0.4"
            d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"
            />
        <path
            d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"
        />
        <path
            d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z"
        />
    </svg>
);

function LoginBtn() {
    const router = useRouter();
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <button onClick={() => router.push('/dashboard')}>
                    <ProfileIcon className="w-8 h-8 fill-white opacity-50 m-4 hover:opacity-70" />
                </button>
            </>
        );
    }
    return (
        <>
            <button
                onClick={() =>
                    signIn(
                        "azure-ad",
                        { callbackUrl: "/dashboard" },
                        { prompt: "login" }
                    )
                }
            >
                <LoginIcon className="w-8 h-8 fill-white opacity-50 m-4 hover:opacity-70" />
            </button>
        </>
    );
}

const NavWithAuth = (props) => {
    const { data: session } = useSession();
    const navElement = document.querySelector("nav");

    return (
        <>
            <Nav {...props} />
            {navElement && createPortal(<LoginBtn />, navElement)}
        </>
    );
};

export default NavWithAuth;
