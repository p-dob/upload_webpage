import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import MainBody from './components/MainBody';
import SearchResults from './components/SearchResults';
import WatchBody from './components/WatchBody';
import store from './utils/store';

function App() {

  const appRoutes= createBrowserRouter([{
    path:'/',
    element: <Main/>,
    children:[{
      path:'/',
      element:<MainBody/>
    },
    {
      path:'watch',
      element:<WatchBody/>
    },
    {
      path:'results',
      element: <SearchResults/>
    }]
  }])

  return (
      <Provider store={store}>
        <RouterProvider router={appRoutes}/>
      </Provider>
  );
}

export default App;
