import { useState } from 'react';

const useValidate = () => {
    const [error, setError] = useState(false);

    const isFormEmpty = (formValue) => {
        if (!formValue) {
            throw new Error('Enter URL');
        } else {
            setError(false);
        }
    };

    const isValidUrl = (url) => {
        const pattern = new RegExp(
            '(http|https:\\/\\/)?' +
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
                '((\\d{1,3}\\.){3}\\d{1,3}))' +
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                '(\\?[;&a-z\\d%_.~+=-]*)?' +
                '(\\#[-a-z\\d_]*)?$',
            'i',
        );

        if (!pattern.test(url)) {
            throw new Error('Invalid URL');
        } else {
            setError(false);
        }
    };

    const validate = (value) => {
        try {
            isFormEmpty(value);
            isValidUrl(value);
            setError(false);
        } catch (err) {
            setError(false);
            setError(err.message);
        }
    };

    return {
        validate,
        error,
        setError,
    };
};

export default useValidate;
