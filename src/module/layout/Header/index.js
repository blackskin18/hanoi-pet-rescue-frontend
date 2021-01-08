import React, { useEffect, useState }       from 'react';
import { Menu, Popover } from 'antd';
import { Link, useHistory }                 from "react-router-dom";
import {
  EnvironmentOutlined,
  PieChartOutlined,
  UserOutlined,
  PlusOutlined,
  TableOutlined,
  TeamOutlined,
  CaretDownOutlined
}                           from '@ant-design/icons';
import './style.scss'
import "antd/dist/antd.css";
import logo                 from "../../../assets/images/logo.png"
import {useAuth}            from "../../../hooks/auth";
const {SubMenu} = Menu

const Header = () => {
  useAuth();
  const [name, setName] = useState('');
  const history = useHistory()

  const logout = async () => {
    try {
      await window.gapi.auth2.getAuthInstance().disconnect();
    } catch (e) {
      console.log('error when log out google account')
    }
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  useEffect(() => {
    setName(localStorage.getItem('name'))
  }, [])

  const namePopoverContent = <div>
    {/*<span className="header-username text-gray">*/}
    <div>
      <Link to={"/detail-user/" + localStorage.getItem('id')} className="link-orange">
        Xem thông tin
      </Link>
    {/*</span>*/}
    </div>
    <a onClick={logout} className="link-orange">Logout</a>
  </div>

  return (
    <div className="header">
      <div className="header-logo-box">
        <Link to="/">
          <img src={logo} alt="" className="header-logo-box-logo"/>
        </Link>
      </div>
      <div className='bottom-vector hide-under-lg'>
        <Popover content={namePopoverContent} placement="bottom" trigger="click">
          <span className="header-username">
            <span className="header-username__name">
              <span><UserOutlined/></span>
              <span className="margin-left-5">{name}</span>
            </span>
            <span className="header-username__expand">
              <CaretDownOutlined />
            </span>
          </span>
        </Popover>
      </div>
      <div className="header-menu-box">
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
            {/*<Menu.Item key="sub3-2"><Link to="/create-place">Tạo địa điểm</Link></Menu.Item>*/}
            <Menu.Item key="sub3-3"><Link to="/places/1">Phòng khám</Link></Menu.Item>
            <Menu.Item key="sub3-4"><Link to="/places/2">Nhà chung</Link></Menu.Item>
            <Menu.Item key="sub3-5"><Link to="/places/3">Nhà Foster</Link></Menu.Item>
            <Menu.Item key="sub3-6"><Link to="/places/4">Nhà chủ nuôi mới</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Nhóm chuyên môn">
            <Menu.Item key="sub2-1"><Link to="/create-user">Tạo nhóm chuyên môn</Link></Menu.Item>
            <Menu.Item key="sub2-2"><Link to="/list-user">Tất cả</Link></Menu.Item>
            <Menu.Item key="sub2-3"><Link to="/list-user/1">Điều phối, cứu hộ, y tế, admin</Link></Menu.Item>
            <Menu.Item key="sub2-4"><Link to="/list-user/2">Tình nguyện viên</Link></Menu.Item>
            <Menu.Item key="sub2-5"><Link to="/list-user/3">Foster</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="11" icon={<PieChartOutlined/>}>
            <Link to="/report">
              Báo cáo cứu hộ
            </Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<PieChartOutlined/>}>
            <Link to="/histories">
              Lịch sử cập nhật
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
