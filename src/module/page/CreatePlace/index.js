import React, {useState}             from 'react'
import {Divider, message}            from 'antd';
import PlaceService                  from "../../../service/PlaceService";
import CreatePlaceForm               from "../../component/Form/CreatePlace";
import {useParams}                   from "react-router";
import {PLACE_TYPE, PLACE_TYPE_TEXT} from "../../../config";
import './style.scss'


const CreatePlace = () => {
  var {type}                        = useParams()
  const [dataInsert, setDataInsert] = useState({})

  const createPlace = async function (data) {
    return await PlaceService.createPlace(data)
  }

  const afterSubmit = () => {
    setDataInsert({})
    message.success('Tạo thành công');
  }

  return (<div className="home-page">
    <Divider>
      <h4 className="text-primary-green left-align padding-left-xs">Tạo {PLACE_TYPE_TEXT[type]}</h4>
    </Divider>
    {
      type != PLACE_TYPE.HOSPITAL &&
      <CreatePlaceForm
        dataInsert={dataInsert}
        type={type}
        submitAction={createPlace}
        afterSubmit={afterSubmit}
        buttonText="Tạo địa điểm"
      />
    }
  </div>)
}

export default CreatePlace