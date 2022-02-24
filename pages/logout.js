import { clearRedisAuth } from '../lib/auth'

function Logout () {
    clearRedisAuth()
    return (
        <>
        <div>Logged out!</div>
        </>
    )
}
export default Logout