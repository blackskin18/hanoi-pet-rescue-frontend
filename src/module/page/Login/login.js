import React, {useEffect, useState} from 'react';
import "antd/dist/antd.css";
import './style.scss'
import {useHistory}                 from "react-router-dom";
import AuthService                  from "../../../service/AuthService";
import { GoogleLogin }              from 'react-google-login';
import {message}                    from "antd";
import {GOOGLE_CLIENT_ID} from '../../../config'


export default () => {
  const history = useHistory()
  const [errorMsg, setErrorMsg] =useState('')


  const responseGoogle = async (response) => {
    console.log('response google')
    var loginSuccess = await AuthService.login(response.tokenId)
    if(loginSuccess) {
      history.push('/list-case')
    } else {
      setErrorMsg("Địa chỉ mail của bạn chưa có trong hệ thống, vui lòng liên hệ với admin")
    }
  }

  const falseResponseGoogle = () => {
    message.error('Không tìm thấy google id, Vui lòng đăng nhập lại');
  }

  return (
      <div className="login-background">
        <div className="center login-logo-box">
          <img src="../../../assets/images/POC.svg" alt=""/>
        </div>
        <div className="login-box">
          <div className="login-box--header">
            <h3 className="text-center hide-on-desktop">Đăng nhập</h3>
          </div>
          <div className="login-box--body">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              render={renderProps => (
                <button className="login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  Đăng nhập
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={falseResponseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            {errorMsg && <p className="center text-red">{errorMsg}</p>}
          </div>
        </div>
      </div>
  );
}