import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.7
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this);

  }

  createBoard() {
    let board = [];
    for(let i = 0; i < this.props.nrows; i++) {
      let arrayColumns = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let randomLight;
        if(Math.random() <= this.props.chanceLightStartsOn) {
          randomLight = false;
        } else {
          randomLight = true;
        }
        arrayColumns.push(randomLight);
      }
      board.push(arrayColumns);
    }
    
    return board;
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      
      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        board[x][y] = !board[x][y];
      }
    }

    function flipCellsAroundSelected(x,y) {
      if(x >= 0 && x < nrows && y > 0 && y < ncols) {
        board[x][y-1] = !board[x][y-1];
      }
      if(x >= 0 && x < nrows && y >= 0 && y < ncols-1) {
        board[x][y+1] = !board[x][y+1];
      }
      if(x > 0 && x < nrows && y >= 0 && y < ncols) {
        board[x-1][y] = !board[x-1][y]
      }
      if (x >= 0 && x < nrows-1 && y >= 0 && y < ncols) {
        board[x+1][y] = !board[x+1][y];
      }
    }

    flipCell(x,y);
    flipCellsAroundSelected(x,y);

    let playing = false;
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j< board[i].length; j++) {
        if(board[i][j] === true) {
          playing = true;
          break;
        }
      }
    }

    if(playing) {
      this.setState({board: board})
    } else {
      this.setState({board: board, hasWon: true})
    }
  }


  render() {
    let template = 
    <div>
      <div className="Board-Title">
        <div className="neon-orange">Lights</div>
        <div className="neon-blue">Out</div>
      </div>
        
    <table className="Board">
    <tbody>
    {this.state.board.map( (row, index) => {
      return <tr key={index} id={index} value={row}>{row.map((value,secondIndex) => {
        return <Cell isLit={value} key={`${index}-${secondIndex}`} id={`${index}-${secondIndex}`} 
        flipCellsAroundMe = {this.flipCellsAround.bind(this,`${index}-${secondIndex}`)}
        />
      })}</tr>
    })}
    </tbody>
    </table>
    </div>
    
    if(this.state.hasWon) {
      template = 
      <div className="Winner">
        <h1>
          <span className="neon-orange">You</span>
          <span className="neon-blue">won!!!</span>
        </h1>
      </div>
      
    }

    return( 
      <div className="Container">
        {template}
      </div>
        
    )
  }
}


export default Board;
