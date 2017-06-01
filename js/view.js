import Board from './board';
import * as Finders from './search/search_export';
window.Finders = Finders;

class View {
  constructor(stage) {
    this.board = new Board(stage);
    this.board.init();
    this.finder = new Finders.BFS(this.board);
    this.addListeners();
  }

  addListeners() {
    $('#algorithms input').on('change', () => {
      const algoName = $('input[name=algo]:checked', '#algorithms').val();
      this.finder = new Finders[algoName](this.board);
      console.log(this.finder);
    });
    $('#run').on('click', (e) => {
      e.preventDefault();
      this.finder.run();
    });
    $('#clear').on('click', (e) => {
      e.preventDefault();
      this.finder.reset();
      this.board.clearSearch();
    });
  }


}

export default View;
