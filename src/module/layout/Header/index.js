import React, { useEffect, useState }       from 'react';
import { Row, Col, Menu, Dropdown, Button } from 'antd';
import { Link, useHistory }                 from "react-router-dom";
import {
  EnvironmentOutlined,
  PieChartOutlined,
  UserOutlined,
  MailOutlined,
  PlusOutlined,
  TableOutlined,
  TeamOutlined
}                                           from '@ant-design/icons';
import './style.scss'
import "antd/dist/antd.css";
import logo                                 from "../../../assets/images/POC2.svg"
import {useAuth}                            from "../../../hooks/auth";

const {SubMenu} = Menu

const Header = () => {
  useAuth();
  const [name, setName] = useState('');
  const history = useHistory()

  const logout = () => {
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  useEffect(() => {
    setName(localStorage.getItem('name'))
  }, [])

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
          <span className="header-username text-gray">{name}</span>
        </div>
      </div>
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1" icon={<PlusOutlined />}>
            <Link to="/create-case">Tạo case mới</Link>

          </Menu.Item>
          <SubMenu key="sub1" icon={<TableOutlined />} title="Danh sách case">
            <Menu.Item key="sub1-2"><Link to="/list-case">Tất cả</Link></Menu.Item>
            <Menu.Item key="sub1-3"><Link to="/list-case/1">Chó</Link></Menu.Item>
            <Menu.Item key="sub1-4"><Link to="/list-case/2">Mèo</Link></Menu.Item>
            <Menu.Item key="sub1-5"><Link to="/list-case/3">Loài khác</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<EnvironmentOutlined />} title="Địa điểm">
            <Menu.Item key="sub3-2"><Link to="/create-place">Tạo địa điểm</Link></Menu.Item>
            <Menu.Item key="sub3-3"><Link to="/places/1">Phòng khám</Link></Menu.Item>
            <Menu.Item key="sub3-4"><Link to="/places/2">Nhà chung</Link></Menu.Item>
            <Menu.Item key="sub3-5"><Link to="/places/3">Nhà Foster</Link></Menu.Item>
            <Menu.Item key="sub3-5"><Link to="/places/4">Nhà chủ nuôi mới</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Nhóm chuyên môn">
            <Menu.Item key="sub2-1">Tạo nhóm chuyên môn</Menu.Item>
            <Menu.Item key="sub2-2">Điều phối, cứu hộ, y tế</Menu.Item>
            <Menu.Item key="sub2-3">Tình nguyện viên</Menu.Item>
            <Menu.Item key="sub2-4">Foster</Menu.Item>
          </SubMenu>
          <Menu.Item key="10" icon={<PieChartOutlined/>}>
            Thư viện ảnh
          </Menu.Item>
          <Menu.Item key="11" icon={<PieChartOutlined/>}>
            Lịch sử doạt động
          </Menu.Item>
        </Menu>
      </div>
      <div className="logout-box">
        <a onClick={logout}>Logout</a>
      </div>
    </div>
  );
}

export default Header;
