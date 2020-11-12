import React, {useState, useEffect}         from 'react'
import {Divider}     from 'antd';
import ListCaseTable from '../../component/ListCaseTable';
import {useParams}   from "react-router";
import './style.scss'


const ListCase = () => {
  var {type} = useParams()


  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Danh sách case </h4>
    </Divider>
    <ListCaseTable type={type}/>
  </div>)
}

export default ListCase