import loadView from './views/loader';

function handleDOMContentLoaded() {
  const viewName = document.getElementsByTagName('body')[0].getAttribute('data-js-view-name');
  const ViewClass = loadView(viewName);
  const view = new ViewClass();
  view.mount();
  window.currentView = view;
}

function handleDOMContentUnload() {
  window.currentView.unmount();
  wundow.cunrrentView = null;
}

handleDOMContentLoaded();
window.addEventListener('unload', handleDOMContentUnload, false);

