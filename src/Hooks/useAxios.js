import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useAxios({ url, method, body }) {

    const [data, setdata] = useState(null);
    const [err, seterr] = useState(undefined);
    const [loading, setloading] = useState(false);

    
    useEffect(() => {

        setloading(true);

        switch (method) {

            case "get" || "delete":

                axios.get(url)
                    .then((res) => {

                        setdata(res.data)
                        
                    }).catch((err) => {

                        seterr(err)
                    }).finally(() => {
                        setloading(false);

                    })
                break;

            case "post":

                axios.post(url, body)
                    .then((res) => {

                        setdata(res.data)
                        console.log(data);
                    }).catch((err) => {

                        seterr(err)
                    }).finally(() => {
                        setloading(false);

                    })

                break;

            case "put":

                axios.put(url, body)
                    .then((res) => {

                        setdata(res.data)
                        console.log(data);
                    }).catch((err) => {

                        seterr(err)
                    }).finally(() => {
                        setloading(false);

                    })

                break;
            default:
                break;
        }

    }, [])

    return { data, loading, err }
}
