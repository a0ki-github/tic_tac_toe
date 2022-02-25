import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
 return (
  <button
    className="square"
    onClick={props.onClick}
    style={{backgroundColor: props.backgroundColor}}
  >
    {props.value}
  </button>
 );
}

function caluculateResult(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return ({
        winner: squares[a],
        line: lines[i]
      });
    }
  }
  return null;
}

function makeCoordinate(nth) {
  const coordinates = [
    [1, 1], [2, 1], [3, 1],
    [1, 2], [2, 2], [3, 2],
    [1, 3], [2, 3], [3, 3]
  ]

  return coordinates[nth];
}

class Board extends React.Component {
  renderSquare(i) {
    const result = caluculateResult(this.props.squares)

    return(
      <Square
        key={i}
        value={this.props.squares[i]}
        backgroundColor={ result && result.line.includes(i) ? 'yellow' : 'transparent' }
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];
    const board = rows.map((row, index) => {
      return(
        <div key={index} className="board-row">
          {rows[index].map(square => {
            return this.renderSquare(square)
          })}
        </div>
      );
    })

    return (
      <div>
        {board}
      </div>
    );
  }
}

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
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

