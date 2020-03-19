/**
 * Clear remaining BrowserViews from previous instances
 */
import { remote } from 'electron';

const removeViews = () => {
  const views = remote.BrowserView.getAllViews();
  views.forEach(view => view.destroy());
};

export default removeViews;