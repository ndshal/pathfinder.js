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
    $('#algo-controls input').on('change', () => {
      const algoName = $('input[name=algo]:checked', '#algo-controls').val();
      this.finder = new Finders[algoName](this.board);
    });
    $('#run-search').on('click', (e) => {
      e.preventDefault();
      this.finder.run();
    });
    $('#clear-search').on('click', (e) => {
      e.preventDefault();
      this.finder.reset();
      this.board.clearSearch();
    });
    $('#set-obs').on('click', (e) => {
      e.preventDefault();
      const preset = $('input[name=preset]:checked', '#obs-controls').val();
      console.log(preset);
      if(preset === 'simple') {
        this.board.setupSimple();
      } else if (preset === 'maze') {
        this.board.setupMaze();
      }
    });
    $('#clear-obs').on('click', (e) => {
      e.preventDefault();
      this.board.clearObstacles();
    });
  }


}

export default View;
