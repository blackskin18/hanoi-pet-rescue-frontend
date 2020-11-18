import React, {useEffect, useState}          from 'react';
import {Input, message}        from 'antd';
import {Link, useParams, useHistory}         from "react-router-dom";
import {useSelector}                from "react-redux";
import {UserOutlined, MailOutlined} from '@ant-design/icons'
import "antd/dist/antd.css";
import './style.scss';
import {setupWeb3} from "../../../util/auth";
import UserService from "../../../service/UserService";
import { useCookies } from 'react-cookie';

export default (props) => {
  const history = useHistory()
  const wallet = useSelector(state => state.user.wallet)
  const userService = new UserService()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [usernameErr, setUsernameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')

  const [refCookies] =  useCookies(['_ezdnewref', '_ezdref'])

  const getRefBy = () => {
    if (refCookies._ezdnewref) {
      return refCookies._ezdnewref
    } else if(refCookies._ezdref){
      return refCookies._ezdref
    } else {
      return null
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      setupWeb3()
    }
  }, [wallet])

  const register = async () => {
    let refId = getRefBy()
    let response = await userService.register(username, email, refId)
    setUsernameErr('')
    setEmailErr('')
    if(response.status === 0) {
      for(let i in response.data) {
        if(response.data[i].param === 'username') setUsernameErr(response.data[i].msg)
        if(response.data[i].param === 'email') setEmailErr(response.data[i].msg)
      }
      if(!response.data) message.error('Something error')
    } else {
      history.push('/dashboard')
    }
  }

  return (
    <div className="register-background">
      <div className="center register-logo-box">
        <img src="../../../assets/images/POC.svg" alt=""/>
      </div>
      <div className="register-box">
        <div className="register-box--header">
          <h1>Register</h1>
        </div>
        <div className="register-box--body">
          <div className="register-input">
            <Input style={{border: usernameErr && ' 1px solid red'}} size="large" placeholder="Username" prefix={<UserOutlined/>} value={username} onChange={(e) => setUsername(e.target.value)}/>
            {usernameErr && <p className="text-red center">{usernameErr}</p>}
          </div>
          <div className="register-input">
            <Input style={{border: emailErr && '1px solid red'}} size="large" placeholder="Email" prefix={<MailOutlined />} value={email} onChange={(e) => setEmail(e.target.value)}/>
            {emailErr && <p className="text-red center">{emailErr}</p>}
          </div>
          <p className="register-description text-white">
            By clicking Register, you will use your wallet address {wallet && wallet.slice(0, 5) + '...' + wallet.slice(-5) + ' '}
            for further authentication
          </p>
          <button className="register-button" onClick={register}>Register</button>
          <Link to="/login"> Go to login page </Link>
        </div>
      </div>
    </div>
  );
}
