import React, { useRef, useEffect } from 'react'

const useMounted = () => {
    const mounted = useRef(false)

    //using mounted when the user login so we should not mount the setIsSubmitting 
    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    return mounted
}

export default useMounted
