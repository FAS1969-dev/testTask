import { Container } from './components/news';
import { Profile } from './components/profile';
import { LoginForm } from './components/login';

export const IndexRoutes = [
  { id: 'home', path: '/', component: Container },
  { id: 'news', path: '/news', component: Container },
  { id: 'profile', path: '/profile', component: Profile },
  {
    id: 'Login',
    path: '/login',
    component: LoginForm,
    params: [],
  },
];
