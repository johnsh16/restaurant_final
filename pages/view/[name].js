import React from 'react'
import Menu from '../../components/Menu'
import { useRouter, pid } from 'next/router'

function View () {

    const router = useRouter()
    var { pid } = router.query

    return (
        <>
        <Menu name={"New York Restaurant"} />
        </>
    )
}

export default View