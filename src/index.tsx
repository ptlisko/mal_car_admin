import * as React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import reportWebVitals from './reportWebVitals';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('mal_car_frontend') as HTMLElement
);

root.render(
    <App />
);

reportWebVitals();
