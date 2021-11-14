import React, {useEffect, useState} from 'react';
import "antd/dist/antd.css";
import './style.scss'
import {useHistory} from "react-router-dom";
import AuthService from "../../../service/AuthService";
import {Col, Input, message, Row} from "antd";


export default () => {
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const responseGoogle = async (response) => {
    console.log('response google')
    var loginSuccess = await AuthService.login(response.tokenId)
    if (loginSuccess) {
      history.push('/list-case')
    } else {
      setErrorMsg("Địa chỉ mail của bạn chưa có trong hệ thống, vui lòng liên hệ với admin")
    }
  }

  const falseResponseGoogle = () => {
    message.error('Không tìm thấy google id, Vui lòng đăng nhập lại');
  }

  const loginHandle = async () => {
    var loginSuccess = await AuthService.login(email, password)
    if (loginSuccess) {
      history.push('/list-case')
    } else {
      setErrorMsg("Địa chỉ mail của bạn chưa có trong hệ thống, vui lòng liên hệ với admin")
    }
  }

  return (
    <div className="login-background">
      <div className="center login-logo-box">
        <img src="../../../assets/images/POC.svg" alt="" />
      </div>
      <div className="login-box">
        <div className="login-box--header">
          <h3 className="text-center hide-on-desktop">Đăng nhập</h3>
        </div>
        <div>
          {/*<GoogleLogin*/}
          {/*  clientId={GOOGLE_CLIENT_ID}*/}
          {/*  buttonText="Login"*/}
          {/*  render={renderProps => (*/}
          {/*    <button className="login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>*/}
          {/*      Đăng nhập*/}
          {/*    </button>*/}
          {/*  )}*/}
          {/*  onSuccess={responseGoogle}*/}
          {/*  onFailure={falseResponseGoogle}*/}
          {/*  cookiePolicy={'single_host_origin'}*/}
          {/*  // isSignedIn={true}*/}
          {/*/>*/}
          <Row>
            <Col span={8}>
              Email
            </Col>
            <Col span={16}>
              <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                     placeholder="email"
              />
            </Col>
          </Row>
          <Row style={{marginTop: '2rem'}}>
            <Col span={8}>
              Password
            </Col>
            <Col span={16}>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Col>
          </Row>
          <div className='text-center'>
            <button
              className="login-button"
              onClick={loginHandle}
            >
              Đăng nhập
            </button>
          </div>
          {errorMsg && <p className="center text-red">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
}