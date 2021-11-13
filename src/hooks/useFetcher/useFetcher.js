import { useState } from 'react';
import axios from 'axios';

const useFetcher = (setError) => {
    const [shortUrl, setShortUrl] = useState('');
    const { REACT_APP_BITLY_AUTHORIZATION_TOKEN, REACT_APP_URL } = process.env;

    const submit = async (url) => {
        try {
            const response = await axios.post(
                REACT_APP_URL,
                {
                    long_url: url,
                    domain: 'bit.ly',
                },
                {
                    headers: {
                        Authorization: `Bearer ${REACT_APP_BITLY_AUTHORIZATION_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.status === 200 || response.status === 201) {
                setShortUrl(response.data.link);
                setError(false);
            } else {
                setError(response.statusText);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return {
        submit,
        shortUrl,
        setShortUrl,
    };
};

export default useFetcher;
