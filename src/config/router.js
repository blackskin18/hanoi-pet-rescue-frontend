import Home        from '../module/page/Home'
import ListCase    from '../module/page/ListCase'
import CreatePlace from '../module/page/CreatePlace'
import CreateCase  from '../module/page/CreateCase'
import ListPlace   from '../module/page/ListPlace'

export default [
  {
    path: '/home',
    page: Home
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
    path: '/create-place',
    page: CreatePlace
  },
  {
    path: '/places',
    page: ListPlace
  },
  {
    path: '/',
    page: Home
  }
]
