import React, { useState, useEffect } from 'react'
import { Divider }                    from 'antd';
import HospitalTable                  from '../../component/HospitalTable';
import { useParams }                  from "react-router";
import './style.scss'


const ListPlace = () => {
  var {type} = useParams()
  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Danh sách case </h4>
    </Divider>
    <HospitalTable/>
  </div>)
}

export default ListPlace