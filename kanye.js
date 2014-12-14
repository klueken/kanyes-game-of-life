$( document ).ready(function() {
	var bool = true;

  var $canvas = $("#myCanvas")
  
  $("#content").width('100%');
  $("#content").height('100%');
  
  $("#banner").width('100%');
  $("#banner").height('5%');

  $canvas.width('100%');
  $canvas.height('95%');

  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  setInterval(tick, 100);

  var numOfRows = 25;
  var numOfColumns = 50;

  var grid = new Grid(numOfRows, numOfColumns);
  var i = 0
  for(var r = 0; r < grid.numOfRows; r++) {
    for(var c = 0; c < grid.numOfColumns; c++) {
      p = new Point(c * imageLength(), r * imageLength())
      var state;
      if (Math.floor((Math.random() * 3)) == 0) {
        state = true;
      } else {
        state = false;
      }
      grid.push(new Cell(i, p, state));
      i++;
    }
  }

  function imageLength() {
    if ($canvas.width() < $canvas.height()) {
      return Math.floor($canvas.width() / numOfColumns);
    } else {
      return Math.floor($canvas.height() / numOfRows);
    }
  }

  function tick() {
    var img = document.getElementById("kanye_pic");
    ctx.canvas.width  = $canvas.width();
    ctx.canvas.height = $canvas.height();
    
    $.each(grid.cells, function(index, cell) {
      if (cell.state) {
        ctx.drawImage(img, cell.position.x, cell.position.y, imageLength() , imageLength());
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(cell.position.x, cell.position.y, imageLength() , imageLength());
      }
    });

    $.each(grid.cells, function(index, cell) {
      if (cell.state) {
        if (grid.getAliveCellNeighors(cell.index).length > 3 || grid.getAliveCellNeighors(cell.index).length < 2) {
          cell.state = false;
        }
      } else {
        if (grid.getAliveCellNeighors(cell.index).length == 3 ) {
          cell.state = true;
        }
      }
    });
  }

});

var Grid = function(numOfRows, numOfColumns) {
  this.numOfRows = numOfRows;
  this.numOfColumns = numOfColumns;
  this.cells = [];
}

Grid.prototype.push = function(cell) {
  this.cells.push(cell);
}

Grid.prototype.getRightNeighbor = function(index) {
  if (index % this.numOfColumns < this.numOfColumns - 1) {
    return this.cells[index + 1];
  }
}

Grid.prototype.getLeftNeighbor = function(index) {
  if (index % this.numOfColumns > 1) {
    return this.cells[index - 1];
  }
}

Grid.prototype.getBelowNeighbor = function(index) {
  if (index / this.numOfRows < this.numOfRows - 1) {
    return this.cells[index + this.numOfColumns];
  }
}

Grid.prototype.getAboveNeighbor = function(index) {
  if (index / this.numOfRows > 1) {
    return this.cells[index - this.numOfColumns];
  }
}

Grid.prototype.getAboveRightNeighbor = function(index) {
  var above = this.getAboveNeighbor(index);
  if (above) {
    return this.getRightNeighbor(above.index);
  }
}

Grid.prototype.getAboveLeftNeighbor = function(index) {
  var above = this.getAboveNeighbor(index);
  if (above) {
    return this.getLeftNeighbor(above.index);
  }
}

Grid.prototype.getBelowRightNeighbor = function(index) {
  var below = this.getBelowNeighbor(index);
  if (below) {
    return this.getRightNeighbor(below.index);
  }
}

Grid.prototype.getBelowLeftNeighbor = function(index) {
  var below = this.getBelowNeighbor(index);
  if (below) {
    return this.getLeftNeighbor(below.index);
  }
}

Grid.prototype.getCellNeighors = function(index) {
  var neighbors = [];
  
  var rightNeighbor = this.getRightNeighbor(index);
  if (rightNeighbor) {
    neighbors.push(rightNeighbor);
  }

  var leftNeighbor = this.getLeftNeighbor(index);
  if (leftNeighbor) {
    neighbors.push(leftNeighbor);
  }

  var belowNeighbor = this.getBelowNeighbor(index);
  if (belowNeighbor) {
    neighbors.push(belowNeighbor);
  }

  var aboveNeighbor = this.getAboveNeighbor(index);
  if (aboveNeighbor) {
    neighbors.push(aboveNeighbor);
  }

  var aboveLeftNeighbor = this.getAboveLeftNeighbor(index);
  if (aboveLeftNeighbor) {
    neighbors.push(aboveLeftNeighbor);
  }

  var aboveRightNeighbor = this.getAboveRightNeighbor(index);
  if (aboveRightNeighbor) {
    neighbors.push(aboveRightNeighbor);
  }

  var belowRightNeighbor = this.getBelowRightNeighbor(index);
  if (belowRightNeighbor) {
    neighbors.push(belowRightNeighbor);
  }

  var belowLeftNeighbor = this.getBelowLeftNeighbor(index);
  if (belowLeftNeighbor) {
    neighbors.push(belowLeftNeighbor);
  }

  return neighbors;
}

Grid.prototype.getAliveCellNeighors = function(index) {
  return this.getCellNeighors(index).filter(function(element) {
    return element.state;
  });
}

var Cell = function(index, position, state) {
  this.index = index;
  this.position = position;
  this.state = state;
};

Cell.prototype.die = function() {
  this.state = false;
};

Cell.prototype.live = function() {
  this.state = true;
};

var Point = function(x, y) {
  this.x = x;
  this.y = y;
}
