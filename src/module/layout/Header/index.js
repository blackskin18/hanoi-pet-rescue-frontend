import React, {useEffect, useState}               from 'react';
import { Row, Col, Menu, Dropdown, Button}        from 'antd';
import {Link, useParams, useLocation, useHistory} from "react-router-dom";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  UserOutlined,
  MailOutlined,
}                                                 from '@ant-design/icons';
import './style.scss'
import "antd/dist/antd.css";
import logo from "../../../assets/images/POC2.svg"


const {SubMenu} = Menu



const Header = () => {

  const history = useHistory()


  const logout = () => {
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  return (
    <div className="header">
      <div className="header-logo-box">
        <Link to="/">
          <img src={logo} alt="" className="header-logo-box-logo"/>
        </Link>
      </div>
      <div className='bottom-vector hide-under-lg'>
        <div lg={{span: 24}} span={0} className="header-svg">
          <span><UserOutlined/></span>
          <span className="header-username text-gray">username</span>
        </div>
      </div>
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/create-case">Tạo case mới</Link>

          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Danh sách case">
            <Menu.Item key="2"><Link to="/list-case">Tất cả</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/list-case/1">Chó</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/list-case/2">Mèo</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/list-case/3">Loài khác</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="6" icon={<PieChartOutlined />}>
            Danh sách phòng khám
          </Menu.Item>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Nhóm chuyên môn">
            <Menu.Item key="7">Điều phối, cứu hộ, y tế</Menu.Item>
            <Menu.Item key="8">Tình nguyện viên</Menu.Item>
            <Menu.Item key="9">Foster</Menu.Item>
          </SubMenu>
          <Menu.Item key="10" icon={<PieChartOutlined />}>
            Thư viện ảnh
          </Menu.Item>
          <Menu.Item key="11" icon={<PieChartOutlined />}>
            Lịch sử doạt động
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
