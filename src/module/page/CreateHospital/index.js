import React, {useState}  from 'react'
import {Divider, message} from 'antd';
import PlaceService       from "../../../service/PlaceService";
import CreateHospitalForm from "../../component/Form/CreateHospital";
import {useParams}        from "react-router";
import './style.scss'


const ListCase = () => {
  var {branch}                      = useParams()
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
      <h4 className="text-primary-green left-align padding-left-xs">Tạo phòng khám</h4>
    </Divider>
    <CreateHospitalForm
      dataInsert={dataInsert}
      submitAction={createPlace}
      branch={branch}
      afterSubmit={afterSubmit}
      buttonText="Tạo phòng khám"
    />
  </div>)
}

export default ListCase