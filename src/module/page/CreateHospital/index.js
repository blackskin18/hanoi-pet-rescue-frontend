import React, {useState, useEffect}               from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select} from 'antd';
import PlaceService                               from "../../../service/PlaceService";
import CreateHospitalForm                         from "../../component/Form/CreateHospital";
import { useParams }                              from "react-router";

const ListCase = () => {
  var {branch} = useParams()
  const createPlace = async function (data) {
     return await PlaceService.createPlace(data)
  }

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Tạo phòng khám</h4>
    </Divider>
    <CreateHospitalForm
      dataInsert={{}}
      submitAction={createPlace}
      branch={branch}
    />
  </div>)
}

export default ListCase