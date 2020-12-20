import React, { useEffect, useState } from 'react';
import './styles/index.scss';
import routers                        from "./config/router";
import {
  Switch,
  Route
}                                     from "react-router-dom";
import Header                         from './module/layout/Header';
import Footer                         from './module/layout/Footer';
import "antd/dist/antd.css";
import { Layout, Row, Col }           from 'antd';
import { useLocation }                from 'react-router-dom';

import axios from './utils/axios'

function App(props) {
  const location = useLocation();
  console.log(location)
  return (
    <Row>
      {
        location.pathname !== '/login' ?
          [
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 4}} xl={4} xxl={3} key={1}>
              <Header/>
            </Col>,
            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 20}} xl={20} xxl={21} key={2}>
              <div className="main-container">
                <Switch>
                  {routers.map((e, key) => {
                    return <Route key={key} path={e.path} exact component={e.page}>
                    </Route>
                  })}
                </Switch>
              </div>
            </Col>,
            <Footer key={3}/>
          ]
          :
          <Col span={24}>
            <div className="main-container">
              <Switch>
                {routers.map((e, key) => {
                  return <Route key={key} path={e.path} exact component={e.page}>
                  </Route>
                })}
              </Switch>
            </div>
          </Col>
      }
    </Row>
  );
}

export default App;
