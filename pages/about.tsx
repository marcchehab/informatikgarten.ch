import { useState, useEffect } from "react";

export default function About() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/loadcode");
            const userData = await res.json();
            setData(userData);
        };

        fetchData();
    }, []);

    return <div>{data ? `Data: ${JSON.stringify(data)}` : "Loading..."}</div>;
}
