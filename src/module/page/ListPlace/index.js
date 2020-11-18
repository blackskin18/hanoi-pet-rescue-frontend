import React, {useState, useEffect} from 'react'
import {Divider}                    from 'antd';
import HospitalTable                from '../../component/HospitalTable';
import PlaceTable                   from '../../component/PlaceTable';
import {useParams}                  from "react-router";
import './style.scss'


const ListPlace = () => {
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
    {type === '1' ?
      <HospitalTable type={type}/>
      :
      <PlaceTable type={type}/>
    }
  </div>)
}

export default ListPlace