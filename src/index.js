import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createAppStore } from './store/store';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createAppStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TODO integrate coreui-free-react-admin-template-main
// https://github.com/refinedev/refine
// https://refine.dev/docs/examples/
// https://github.com/ant-design/ant-design-pro
// https://github.com/tremorlabs/tremor
// https://github.com/horizon-ui/horizon-ui-chakra
// https://horizon-ui.com/horizon-ui-chakra#/admin/default

// BEST
// https://lightence-ant-design-react-template.pages.dev/
// https://github.com/altence/lightence-ant-design-react-template
// https://coreui.io/product/free-react-admin-template/
// https://coreui.io/demos/react/4.5/free/#/dashboard
// https://demo.themesberg.com/volt-react-dashboard/#/     (VERSION 16)
// https://github.com/themesberg/volt-react-dashboard
// https://github.com/creativetimofficial/material-dashboard-react
// https://mantisdashboard.io/
// https://www.creative-tim.com/product/muse-ant-design-dashboard
// https://www.creative-tim.com/product/argon-dashboard-chakra