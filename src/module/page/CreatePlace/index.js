import React, {useState, useEffect}               from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select} from 'antd';
import PlaceService                               from "../../../service/PlaceService";
import CreatePlaceForm                            from "../../component/Form/CreatePlace";
import {useParams}                                from "react-router";
import {PLACE_TYPE, PLACE_TYPE_TEXT}              from "../../../config";
import CreateHospital                             from "../../component/Form/CreateHospital";

const CreatePlace = () => {
  var {type}                              = useParams()

  const createPlace = async function (data) {
    return await PlaceService.createPlace(data)
  }

  return (<div className="home-page">
    <Divider>
      <h4 className="text-primary-green left-align padding-left-xs">Tạo {PLACE_TYPE_TEXT[type]}</h4>
    </Divider>
    {
      type != PLACE_TYPE.HOSPITAL &&
      <CreatePlaceForm
        dataInsert={{}}
        type={type}
        submitAction={createPlace}
        buttonText="Tạo địa điểm"
      />
    }
  </div>)
}

export default CreatePlace