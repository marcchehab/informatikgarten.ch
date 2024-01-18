import { useSession } from "next-auth/react";
import FeatherIcon from "feather-icons-react";
import { saveToRemote } from "../autosave";

function ButtonCloud({c}) {
    const { data: session } = useSession();

    if (!session) return null; // If no session exists, return null

    // If session exists, render your component
    return (
        <a
            className="cursor-pointer"
            title="Save local history to remote"
            onClick={() => saveToRemote(c)}
        >
            <FeatherIcon size="16" icon="upload-cloud" />
        </a>
    );
}

export default ButtonCloud;
