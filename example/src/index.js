import React from 'react'
import ReactDOM from 'react-dom'
import { removeViews } from '../../lib/ElectronBrowserView';
import App from './App'
import './index.css'

// Remove all previous BrowserViews
removeViews();

ReactDOM.render(<App />, document.getElementById('root'))
