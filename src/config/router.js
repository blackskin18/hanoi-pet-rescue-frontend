import ListCase    from '../module/page/ListCase'
import CreatePlace from '../module/page/CreatePlace'
import CreateHospital from '../module/page/CreateHospital'
import CreateCase  from '../module/page/CreateCase'
import CreateUser  from '../module/page/CreateUser'
import ListPlace   from '../module/page/ListPlace'
import ListUser    from '../module/page/ListUser'
import Login       from '../module/page/Login/login'
import DetailCase  from '../module/page/DetailCase'
import DetailPlace from '../module/page/DetailPlace'
import DetailUser  from '../module/page/DetailUser'
import Report      from '../module/page/Report'

export default [
  {
    path: '/login',
    page: Login
  },
  {
    path: '/list-case/:type?',
    page: ListCase
  },
  {
    path: '/create-case/',
    page: CreateCase
  },
  {
    path: '/detail-case/:code',
    page: DetailCase
  },
  {
    path: '/detail-user/:id',
    page: DetailUser
  },
  {
    path: '/detail-place/:id',
    page: DetailPlace
  },
  {
    path: '/create-user/',
    page: CreateUser
  },
  {
    path: '/create-place/:type',
    page: CreatePlace
  },
  {
    path: '/create-hospital/:branch?',
    page: CreateHospital
  },
  {
    path: '/places/:type?',
    page: ListPlace
  },
  {
    path: '/list-user/:type?',
    page: ListUser
  },
  {
    path: '/report',
    page: Report
  },
  {
    path: '/',
    page: ListCase
  }
]
