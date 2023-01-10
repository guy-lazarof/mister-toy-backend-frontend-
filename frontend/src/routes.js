import { AboutUs } from './view/about-us.jsx';
import { Home } from './view/home-page.jsx';
import { ToyDetails } from './view/toy-details.jsx';
import { ToyEdit } from './view/toy-edit.jsx';
import { ToyIndex } from './view/toy-index.jsx';

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/toy',
    component: ToyIndex,
  },
  {
    path: '/about',
    component: AboutUs,
  },
  {
    path: '/toy/edit',
    component: ToyEdit,
  },
  {
    path: '/toy/edit/:toyId',
    component: ToyEdit,
  },
  {
    path: '/toy/:toyId',
    component: ToyDetails,
  }
]