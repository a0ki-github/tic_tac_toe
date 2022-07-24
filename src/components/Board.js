import React from 'react';
import caluculateResult from './caluculateResult';
import Square from './Square';

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

export default Board;
