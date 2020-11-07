import React, {useEffect, useState} from 'react';
import './styles/index.scss';
import routers from "./config/router";
import {
  Switch,
  Route
}              from "react-router-dom";
import Header  from './module/layout/Header';
import Footer  from './module/layout/Footer';
import "antd/dist/antd.css";
import { Layout, Row, Col }   from 'antd'
import axios from './utils/axios'

function App(props) {
  return (
      <Row>
      <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 7}} xl={5} xxl={4}>
        <Header/>
      </Col>
      <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 17}} xl={19} xxl={20}>
        <div className="main-container">
          <Switch>
            {routers.map((e, key) => {
              return <Route key={key} path={e.path} exact component={e.page} >
              </Route>
            })}
          </Switch>
        </div>
      </Col>
      <Footer />
      </Row>
  );
}

export default App;
