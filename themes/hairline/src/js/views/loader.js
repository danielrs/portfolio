import HomeView from './home';
import ProjectsView from './projects';
import BlogView from './blog';

const views = {
  HomeView,
  ProjectsView,
  BlogView
};

export default function loadView(viewName) {
  return views[viewName] || HomeView;
}
