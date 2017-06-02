import Board from './board';
import * as Finders from './search/search_export';
window.Finders = Finders;

class View {
  constructor(stage) {
    this.board = new Board(stage);
    this.board.init();
    this.finder = new Finders.AStar(this.board);

    this.resetDimensions = this.resetDimensions.bind(this);

    this.addListeners();
    this.resetDimensions();
  }

  addListeners() {
    window.addEventListener('resize', this.resetDimensions);

    $('#algo-controls input').on('change', () => {
      const algoName = $('input[name=algo]:checked', '#algo-controls').val();
      this.finder.kill();
      this.finder = new Finders[algoName](this.board);
      this.board.clearSearch();
    });
    $('#run-search').on('click', (e) => {
      e.preventDefault();
      this.finder.run();
    });
    $('#clear-search').on('click', (e) => {
      e.preventDefault();
      this.finder.kill();
      this.board.clearSearch();
    });
    $('#set-obs').on('click', (e) => {
      e.preventDefault();
      const preset = $('input[name=preset]:checked', '#obs-controls').val();
      this.finder.kill();
      this.board.clearSearch();
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
    $('.instructions-hide').on('click', (e)=> {
      e.preventDefault();
      $('.controls').removeClass('minimized');
      $('.instructions').addClass('minimized');
      $('.instructions .content').addClass('hidden');
      $('.instructions .buttons').addClass('hidden');
      $('.instructions .instructions-show').removeClass('hidden');
    });
    $('.instructions-show').on('click', (e)=> {
      e.preventDefault();
      $('.controls').addClass('minimized');
      $('.instructions').removeClass('minimized');
      $('.instructions .content').removeClass('hidden');
      $('.instructions .buttons').removeClass('hidden');
      $('.instructions .demo-gif').addClass('hidden');
      $('.demo-show').text('Demo');
      $('.instructions .instructions-show').addClass('hidden');
    });
    $('.demo-show').on('click', (e)=> {
      e.preventDefault();
      if($('.demo-show').text() === 'Demo') {
        $('.demo-show').text('Back');
      } else {
        $('.demo-show').text('Demo');
      }
      $('.instructions .content').toggleClass('hidden');
      $('.instructions .demo-gif').toggleClass('hidden');
    });

  }

  resetDimensions() {
    $('#main-canvas').width(window.innerWidth);
    $('#main-canvas').height(window.innerHeight);
    this.board.resetDimensions();
  }
}

export default View;
