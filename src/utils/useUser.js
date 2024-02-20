import {useCallback, useContext, useState} from "react";
import {Context} from '../components/AuthProvider/AuthProvider'
import { login } from "../api/login";


export function useUser () {
    const {jwtToken, setJWTToken} = useContext(Context)
    const [state, setState] = useState({loading:false, error:false})
    const [isAdmin, setIsAdmin] = useState(false);

    const logInAuth = useCallback((credentials) => {
        setState({loading:true, error:false})
        login(credentials)
        .then(res => {
            if (res.isAdmin === 1) setIsAdmin(true)
            window.sessionStorage.setItem('token', res.token)
            setState({loading:false, error:false})
            setJWTToken(res.token)
        }).catch (err =>{
            window.sessionStorage.removeItem('token')
            setIsAdmin(false)
            setState({loading:false, error:true})
        })
    }, [setJWTToken])

    const logOutAuth = useCallback((token) => {
        window.sessionStorage.removeItem('token')
        setIsAdmin(false)
        setJWTToken(null)
    }, [setJWTToken])

    return {
        isLogged: Boolean(jwtToken),
        isLoading: state.loading,
        hasError: state.error,
        logInAuth,
        logOutAuth,
        isAdmin
    }
}