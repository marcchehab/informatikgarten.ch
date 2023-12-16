import {useState} from 'react';

const useEditor = init => {
    const [values, setValues] = useState(init);
    return [
        values,
        e => {
            setValues({
                ...values,
                ...e
            });
        }
    ];
}

export default useEditor;