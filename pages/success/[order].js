import React from 'react'
import { useRouter } from 'next/router'

function Success () {

    const router = useRouter()
    const {order} = router.query
    
    return (
        <>
        </>
    )
}

export default Success