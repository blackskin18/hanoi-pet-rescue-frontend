import React, {useState, useEffect}                             from 'react'
import './style.scss'
import {Row, Col, Table, Image, Select, Space}                  from 'antd';
import {SearchOutlined}                                         from '@ant-design/icons';
import CaseService                                              from "../../../service/CaseService";
import {SearchStatus, SearchText, SearchDateRange, SearchPlace} from '../../component/SearchInput/index';
import {Link}                                                   from "react-router-dom";


export const Button = (props) => {

  let className= "button-" + props.type + " custom-button " + props.className;
  if(props.size) className += " button-" + props.size

  return <button {...props} className={className}
  >
    {props.children}
  </button>
}

export const ButtonLink = (props) => {
  return <Link
    {...props}
    className={"button-goto-page button-" + props.type + " custom-button " + props.className}
  >
    {props.children}
  </Link>
}

