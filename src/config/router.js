import Home        from '../module/page/Home'
import ListCase    from '../module/page/ListCase'
import CreatePlace from '../module/page/CreatePlace'
import CreateCase  from '../module/page/CreateCase'
import CreateUser  from '../module/page/CreateUser'
import ListPlace   from '../module/page/ListPlace'
import Login   from '../module/page/Login/login'

export default [
  {
    path: '/home',
    page: Home
  },
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
    path: '/create-user/',
    page: CreateUser
  },
  {
    path: '/create-place',
    page: CreatePlace
  },
  {
    path: '/places/:type?',
    page: ListPlace
  },
  {
    path: '/',
    page: Home
  }
]
