import MainView from './main';

export default class HomeView extends MainView {
  mount() {
    const sentences = [].slice.call(
      document.querySelectorAll('#tagline-comments li')).map(n => n.innerHTML
    );

    Typing.new('#tagline', {
      sentences: sentences,
      sentenceDelay: 1000,
      ignorePrefix: true
    });
  }
}
