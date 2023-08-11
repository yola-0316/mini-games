import * as PIXI from "pixi.js";

const mountEle = document.getElementById("app")!;

const app = new PIXI.Application({
  background: "#1099bb",
  resizeTo: mountEle,
});
const rootCanvas = app.view;

// @ts-ignore
globalThis.__PIXI_APP__ = app;

mountEle.appendChild(rootCanvas as HTMLCanvasElement);

const rootContainer = new PIXI.Container();
rootContainer.x = app.screen.width / 2;
rootContainer.y = app.screen.height / 2;
app.stage.addChild(rootContainer);

const gridContainer = new PIXI.Container();
rootContainer.addChild(gridContainer);

// Create checkerboard
const tileSize = 100;
const numRows = 3;
const numCols = 3;

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const tile = new PIXI.Graphics();
    tile.beginFill((row + col) % 2 === 0 ? 0xffffff : 0x000000);
    tile.drawRect(col * tileSize, row * tileSize, tileSize, tileSize);
    tile.endFill();
    gridContainer.addChild(tile);
  }
}

// Fill numbers 1~9 in each cell above
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const n = row * numCols + col + 1;
    const number = new PIXI.Text(`${n}`, {
      fontSize: 24,
      fill: n % 2 === 1 ? 0x000000 : 0xffffff,
    });
    number.anchor.set(0.5);
    number.position.set((col + 0.5) * tileSize, (row + 0.5) * tileSize);
    gridContainer.addChild(number);
  }
}

rootContainer.x = (app.view.width - rootContainer.width) / 2;
rootContainer.y = (app.view.height - rootContainer.height) / 2;

// Create border
const border = new PIXI.Graphics();
border.lineStyle(1, 0x00ff00); // Set border color and thickness
border.drawRect(
  -5, // Adjust the x position to create a 5px gap
  -5, // Adjust the y position to create a 5px gap
  gridContainer.width + 10, // Add 10px to the width to account for the gap
  gridContainer.height + 10 // Add 10px to the height to account for the gap
);
gridContainer.addChild(border);

// Create triangles
for (let col = 0; col < numCols; col++) {
  const triangle = new PIXI.Graphics();
  triangle.beginFill(0xff0000); // Set triangle color
  triangle.moveTo(col * tileSize, -10); // Move to the starting point of the triangle
  triangle.lineTo((col + 1) * tileSize, -10); // Draw a line to the top-right corner of the grid cell
  triangle.lineTo((col + 0.5) * tileSize, -tileSize); // Draw a line to the top-center point above the first row
  triangle.lineTo(col * tileSize, -10); // Draw a line back to the starting point to complete the triangle
  triangle.endFill();
  gridContainer.addChild(triangle);
}

// Create triangles on the right side of the grid
for (let row = 0; row < numRows; row++) {
  const triangle = new PIXI.Graphics();
  triangle.beginFill(0xff0000); // Set triangle color
  triangle.moveTo((numCols + 0.5) * tileSize, (row + 0.5) * tileSize); // Move to the starting point of the triangle
  triangle.lineTo((numCols + 1) * tileSize, row * tileSize); // Draw a line to the top-right corner of the grid cell
  triangle.lineTo((numCols + 1) * tileSize, (row + 1) * tileSize); // Draw a line to the bottom-right corner of the grid cell
  triangle.lineTo((numCols + 0.5) * tileSize, (row + 0.5) * tileSize); // Draw a line back to the starting point to complete the triangle
  triangle.endFill();
  gridContainer.addChild(triangle);
}

// Function to rotate the column 1 cell from bottom to top
function rotateColumn() {
  const col = 1; // Column index to rotate
  const cells = []; // Array to store the cells in the column

  // Get all the cells in the column
  for (let row = 0; row < numRows; row++) {
    const cell = gridContainer.getChildAt(row * numCols + col);
    cells.push(cell);
  }

  // Remove the last cell from the column
  const lastCell = cells.pop();
  gridContainer.removeChild(lastCell);

  // Insert the last cell at the top of the column
  gridContainer.addChildAt(lastCell, col);
}

// Add click event listener to the triangle above the column
const triangleAboveColumn = gridContainer.getChildAt(numCols);
triangleAboveColumn.interactive = true;
triangleAboveColumn.on("click", rotateColumn);
