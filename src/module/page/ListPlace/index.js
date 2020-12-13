import React, {useState, useEffect} from 'react'
import {Divider, Button, Row, Col}            from 'antd';
import HospitalTable                from '../../component/HospitalTable';
import PlaceTable                   from '../../component/PlaceTable';
import {useParams}      from "react-router";
import {useHistory}    from "react-router-dom";

import './style.scss'


const ListPlace = () => {
  const history = useHistory()
  var {type} = useParams()
  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">
        Danh sách
        {type === '1' && ' Bệnh viện'}
        {type === '2' && ' Nhà Chung'}
        {type === '3' && ' Foster'}
        {type === '4' && ' Chủ nuôi mới'}
      </h4>
    </Divider>

    <div className="text-right margin-bottom-xm">
      {type === '1' &&
          [<Button onClick={() => history.push('/create-hospital/branch')}>Tạo chi nhánh</Button>,
          <Button onClick={() => history.push('/create-hospital')}>Tạo phòng khám</Button>]
      }
      {type === '2' && <Button onClick={() => history.push('/create-place/commonhome')}>Tạo nhà chung</Button>}
      {type === '3' && <Button onClick={() => history.push('/create-place')}>Tạo foster</Button>}
      {type === '4' && <Button onClick={() => history.push('/create-place')}>Tạo chủ nuôi mới</Button>}
    </div>


    {type === '1' ?
      <HospitalTable type={type}/>
      :
      <PlaceTable type={type}/>
    }
  </div>)
}

export default ListPlace