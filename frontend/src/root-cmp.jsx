import './scss/style.scss';

import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { AppFooter } from './cmp/app-footer';
import { AppHeader } from './cmp/app-header';
import routes from './routes';
import { store } from './store/store';
import { Home } from './view/home-page';

export function App() {

  return (

    <Provider store={store}>
      < Router >
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              {routes.map(route =>
                <Route key={route.path} element={<route.component />} path={route.path} />
              )}
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router >
    </Provider>
  )
}

