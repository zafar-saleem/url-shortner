/* eslint no-unused-vars: 1 */

import React, { useCallback, useState, useEffect } from 'react';
import useValidate from '../hooks/useValidate';
import useFetcher from '../hooks/useFetcher';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const { validate, error, setError } = useValidate();
    const { submit, shortUrl, setShortUrl } = useFetcher(setError);

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            validate(value);

            if (!error && value) {
                submit(value);
            }
        },
        [value],
    );

    const copyUrlToClipboard = (url) => {
        if (!navigator.clipboard) {
            return;
        }

        navigator.clipboard.writeText(url).then(
            () => {
                console.log('Copied to clipboard');
            },
            (err) => {
                console.error('Async: Could not copy text: ', err);
            },
        );
    };

    useEffect(() => {
        if (value) {
            validate(value);
        } else {
            setShortUrl('');
        }
        if (shortUrl && value) {
            copyUrlToClipboard(shortUrl);
        }
    }, [value, shortUrl]);

    return (
        <form onSubmit={onSubmit}>
            {error && <span className="error">{error}</span>}
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    name="shorten"
                    value={value}
                    onChange={onChange}
                />
            </label>
            <input type="submit" value="Shorten and copy URL" />
            {/* TODO: show below only when the url has been shortened and copied */}
            <div className="url">
                {/* Show shortened url --- copied! */}
                {shortUrl}
                {!error && shortUrl && (
                    <p className="copied-text">Copied to clipboard</p>
                )}
            </div>
        </form>
    );
};

export default ShortenUrlForm;
