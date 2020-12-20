import React, {useEffect, useState} from 'react'
import {Divider, message}           from 'antd';
import CaseService                  from '../../../service/CaseService';
import CreateCaseForm               from "../../component/Form/CreateCaseForm"
import PlaceService                 from "../../../service/PlaceService";
import {PLACE_TYPE}                 from "../../../config";
import './style.scss'

const ListCase = () => {
  const [fosters, setFosters]         = useState([]);
  const [owners, setOwners]           = useState([]);
  const [hospitals, setHospitals]     = useState([]);
  const [commonHomes, setCommonHomes] = useState([]);
  const [dataInsert, setDataInsert]   = useState({})


  useEffect(() => {
    getAllFosters()
    getAllOwners()
    getAllCommonHome()
    getAllHospital()
  }, [])

  const afterSubmit = async () => {
    setDataInsert({})
    message.success('Tạo thành công');
  }

  const handleCreateCase = async (data, images) => {
    return await CaseService.createCase(data, images)
  }

  const getAllFosters = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.FOSTER, true)
    setFosters(response.data.places)
  }

  const getAllOwners = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.OWNER, true)
    setOwners(response.data.places)
  }

  const getAllHospital = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.HOSPITAL, true)
    setHospitals(response.data.places)
  }

  const getAllCommonHome = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.COMMON_HOME, true)
    setCommonHomes(response.data.places)
  }

  return (<div className="home-page">
    <Divider>
      <h4 className="text-primary-green left-align padding-left-xs">Tạo case</h4>
    </Divider>

    <CreateCaseForm
      dataInsert={dataInsert}
      afterSubmit={afterSubmit}
      submitAction={handleCreateCase}
      fosters={fosters}
      owners={owners}
      hospitals={hospitals}
      commonHomes={commonHomes}
      buttonText="Tạo case"
    />
  </div>)
}

export default ListCase