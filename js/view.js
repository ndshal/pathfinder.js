import Board from './board';
import * as Finders from './search/search_export';
window.Finders = Finders;

class View {
  constructor(stage) {
    this.board = new Board(stage);
    this.board.init();
    this.finder = new Finders.AStar(this.board);

    this.addListeners();
    this.resetDimensions();
  }

  addListeners() {
    window.addEventListener('resize', this.resetDimensions.bind(this));

    $('#algo-controls input').on('change', this.setNewAlgo.bind(this));
    $('#run-search').on('click', this.runSearch.bind(this));
    $('#clear-search').on('click', this.clearSearch.bind(this));
    $('#set-obs').on('click', this.setObstaclePreset.bind(this));
    $('#clear-obs').on('click', this.clearObstacles.bind(this));
    $('.instructions-hide').on('click', this.hideInstructions.bind(this));
    $('.instructions-show').on('click', this.showInstructions.bind(this));
    $('.demo-show').on('click', this.showDemo.bind(this));
  }

  setNewAlgo(e) {
    e.preventDefault();
    const algoName = $('input[name=algo]:checked', '#algo-controls').val();
    this.finder.kill();
    this.finder = new Finders[algoName](this.board);
    this.board.clearSearch();
  }

  runSearch(e) {
    e.preventDefault();
    this.board.allowPaint = false;
    this.finder.run();
  }

  clearSearch(e) {
    e.preventDefault();
    this.finder.kill();
    this.board.clearSearch();
  }

  setObstaclePreset(e) {
    e.preventDefault();
    const preset = $('input[name=preset]:checked', '#obs-controls').val();
    this.finder.kill();
    this.board.clearSearch();
    if(preset === 'simple') {
      this.board.setupSimple();
    } else if (preset === 'maze') {
      this.board.setupMaze();
    }
  }

  clearObstacles(e) {
    e.preventDefault();
    this.board.clearObstacles();
    // also clear search
    this.finder.kill();
    this.board.clearSearch();
  }

  hideInstructions(e) {
    e.preventDefault();
    $('.controls').removeClass('minimized');
    $('.instructions').addClass('minimized');
    $('.instructions .content').addClass('hidden');
    $('.instructions .buttons').addClass('hidden');
    $('.instructions .instructions-show').removeClass('hidden');
  }

  showInstructions(e) {
    e.preventDefault();
    $('.controls').addClass('minimized');
    $('.instructions').removeClass('minimized');
    $('.instructions .content').removeClass('hidden');
    $('.instructions .buttons').removeClass('hidden');
    $('.instructions .demo-gif').addClass('hidden');
    $('.demo-show').text('Demo');
    $('.instructions .instructions-show').addClass('hidden');
  }

  showDemo(e) {
    e.preventDefault();
    if($('.demo-show').text() === 'Demo') {
      $('.demo-show').text('Back');
    } else {
      $('.demo-show').text('Demo');
    }
    $('.instructions .content').toggleClass('hidden');
    $('.instructions .demo-gif').toggleClass('hidden');
  }

  resetDimensions() {
    $('#main-canvas').width(window.innerWidth);
    $('#main-canvas').height(window.innerHeight);
    this.board.resetDimensions();
  }
}

export default View;
