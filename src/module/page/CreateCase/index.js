import React, {useEffect, useState} from 'react'
import './style.scss'
import {Divider}                    from 'antd';
import CaseService                  from '../../../service/CaseService';
import CreateCaseForm               from "../../component/CreateCaseForm"
import PlaceService                 from "../../../service/PlaceService";
import {PLACE_TYPE}                 from "../../../config";

const ListCase = () => {
  const [fosters, setFosters]               = useState([]);
  const [owners, setOwners]                 = useState([]);
  const [hospitals, setHospitals]           = useState([]);
  const [commonHomes, setCommonHomes]       = useState([]);


  useEffect(() => {
    getAllFosters()
    getAllOwners()
    getAllCommonHome()
    getAllHospital()
  }, [])

  const afterSubmit = async () => {
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
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Tạo case</h4>
    </Divider>

    <CreateCaseForm
      dataInsert={{}}
      afterSubmit={afterSubmit}
      submitAction={handleCreateCase}
      fosters={fosters}
      owners={owners}
      hospitals={hospitals}
      commonHomes={commonHomes}
    />
  </div>)
}

export default ListCase