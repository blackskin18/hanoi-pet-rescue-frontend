import React, {useState, useEffect}                                    from 'react'
import './style.scss'
import {Row, Col, Divider, Table, Image, Space, Input, Button, Select} from 'antd';
import {SearchOutlined}                                                from '@ant-design/icons';
import CaseService                                                     from "../../../service/CaseService";
import {SearchStatus, SearchText, SearchDateRange, SearchPlace}        from '../../component/SearchInput/index';
import ListCaseTable        from '../../component/ListCaseTable';

const {Option} = Select;

const ListCase = () => {


  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Danh sách case </h4>
    </Divider>
    <ListCaseTable type=""/>
  </div>)
}

export default ListCase