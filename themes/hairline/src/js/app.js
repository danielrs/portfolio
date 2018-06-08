import loadView from './views/loader';

function handleDOMContentLoaded() {
  const viewName = document.getElementsByTagName('body')[0].getAttribute('data-js-view-name');
  const ViewClass = loadView(viewName);
  const view = new ViewClass();
  window.currentView = view;
  window.currentView.mount();
}

function handleDOMContentUnload() {
  window.currentView.unmount();
  wundow.cunrrentView = null;
}

handleDOMContentLoaded();
window.addEventListener('unload', handleDOMContentUnload, false);

