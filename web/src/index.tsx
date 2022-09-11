import './styles/index.css'
import 'antd/dist/antd.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider direction='rtl' locale={fa_IR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
