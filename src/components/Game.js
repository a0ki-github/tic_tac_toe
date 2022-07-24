import React from 'react';
import Board from './Board.js';
import caluculateResult from './caluculateResult';
import makeCoordinate from './makeCoordinate';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        newMove: Array(2).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      desc: false
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (caluculateResult(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        newMove: makeCoordinate(i)
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  switchOrder() {
    this.setState({
      desc: !this.state.desc
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = caluculateResult(current.squares);

    const move = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' (' +  history[move].newMove + ')' :
        'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            style={{ fontWeight: move === this.state.stepNumber ? 'bold' : 'normal' }}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (result) {
      status = 'Winner: ' + result.winner;
    } else if(current.squares.includes(null)) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else {
      status = 'Draw'
    }

    const checkbox =
      < >
        <input
          onClick={()=> this.switchOrder()}
          type="checkbox"
          name="desc"
        />
        <label htmlFor="desc">desc</label>
      </>;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.state.desc ? move.reverse() : move}</ol>
          <div>{checkbox}</div>
        </div>
      </div>
    );
  }
}

export default Game;
