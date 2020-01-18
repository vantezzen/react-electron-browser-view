import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import App from './App';
import './index.css';

// Remove all previous BrowserViews
const views = remote.BrowserView.getAllViews();
views.forEach(view => view.destroy());

ReactDOM.render(<App />, document.getElementById('root'));