import {useEffect} from "react";
import AuthService           from '../service/AuthService'
import {useHistory}          from "react-router-dom";

export function useAuth () {
  const history = useHistory()

  useEffect(() => {
    verifyToken()
  }, [])

  async function verifyToken() {
    let token = localStorage.getItem('jwt')
    if(!token){
      history.push('/login')
      return;
    }

    let success = await AuthService.verifyToken()
    if (success) {
    }
    if (!success || (success)) {
      history.push('/login')
    }
  }
}