// Только логика, Делает раскрой и возвращает необходимое колличество листов для заказа,
// с учетом что продается лист по 1/4

function createCutting(inputData) {
  var wrap = document.getElementById('wrap');

  class Rect {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    fit(tile) {
      return this.w >= tile.width && this.h >= tile.height;
    }

    fitRotated(tile) {
      return this.w >= tile.height && this.h >= tile.width;
    }

    cutVertical(width) {
      return [
        new Rect(this.x, this.y, width, this.h),
        new Rect(this.x + width, this.y, this.w - width, this.h),
      ];
    }

    cutHorizontal(height) {
      return [
        new Rect(this.x, this.y, this.w, height),
        new Rect(this.x, this.y + height, this.w, this.h - height),
      ];
    }
  }

  class Tile {
    constructor(id, width, height) {
      this.id = id;
      this.width = width;
      this.height = height;
      this.rotated = false;
    }

    rotate() {
      [this.width, this.height] = [this.height, this.width];
      this.rotated = !this.rotated;
    }
  }

  class Node {
    constructor(rect) {
      this.rect = rect;
      this.left = null;
      this.right = null;
      this.tile = null;
    }

    insert(tile) {
      if (this.tile) {
        return null;
      }

      if (this.left) {
        const leftResult = this.left.insert(tile);
        if (leftResult) return leftResult;
        return this.right.insert(tile);
      }

      if (!this.rect.fit(tile)) {
        if (this.rect.fitRotated(tile)) {
          tile.rotate();
        } else {
          return null;
        }
      }

      if (this.rect.w === tile.width && this.rect.h === tile.height) {
        this.tile = tile;
        return this;
      }

      const remainingW = this.rect.w - tile.width;
      const remainingH = this.rect.h - tile.height;

      if (remainingW > remainingH) {
        const [left, right] = this.rect.cutVertical(tile.width);
        this.left = new Node(left);
        this.right = new Node(right);
      } else {
        const [top, bottom] = this.rect.cutHorizontal(tile.height);
        this.left = new Node(top);
        this.right = new Node(bottom);
      }

      return this.left.insert(tile);
    }

    getMaxY() {
      if (this.tile) {
        return this.rect.y + this.rect.h;
      }
      if (!this.left && !this.right) {
        return 0;
      }
      return Math.max(
        this.left ? this.left.getMaxY() : 0,
        this.right ? this.right.getMaxY() : 0
      );
    }
  }

  function createSheet(parent, vw, vh, node) {
    const d = document.createElement('div');
    d.classList.add('sheet');
    if (node.tile) {
      d.classList.add('used');
      d.innerText = node.tile.id;
    }
    if (node.left || node.right) {
      d.classList.add('contains');
    }
    d.style.left = node.rect.x / vw + '%';
    d.style.top = node.rect.y / vh + '%';
    d.style.width = node.rect.w / vw + '%';
    d.style.height = node.rect.h / vh + '%';
    parent.appendChild(d);
  }

  function drawNode(node, parent, vw, vh) {
    createSheet(parent, vw, vh, node);
    if (node.left) {
      drawNode(node.left, parent, vw, vh);
    }
    if (node.right) {
      drawNode(node.right, parent, vw, vh);
    }
  }

  function calculateUsedSheets() {
    const basePlate = new Rect(0, 0, 760, 3600);
    const tiles = [];

    // Преобразуем входные данные в плитки
    inputData.forEach((item) => {
      item.sizes.forEach((size) => {
        const [id, dimensions] = size.split(' ');
        const [width, height] = dimensions.split('X').map(Number);
        tiles.push(new Tile(id, width, height));
      });
    });

    // Сортируем плитки по площади (от большей к меньшей)
    tiles.sort((a, b) => b.width * b.height - a.width * a.height);

    let currentNode = new Node(basePlate);
    let sheetsCount = 1;
    let maxY = 0;

    // Размещаем плитки
    tiles.forEach((tile) => {
      let placed = currentNode.insert(tile);
      if (!placed) {
        sheetsCount++;
        currentNode = new Node(basePlate);
        placed = currentNode.insert(tile);
        if (!placed) {
          console.error(`Не удалось разместить плитку ${tile.id}`);
        }
      }
      maxY = Math.max(maxY, currentNode.getMaxY());
    });

    // Добавляем визуализацию
    wrap.innerHTML = ''; // Очищаем предыдущую визуализацию
    const vw = basePlate.w;
    const vh = basePlate.h;
    drawNode(currentNode, wrap, vw, vh);

    // Вычисляем частичное использование последнего листа
    let partialSheet;
    if (maxY <= 920) {
      partialSheet = 0.25;
    } else if (maxY <= 1840) {
      partialSheet = 0.5;
    } else if (maxY <= 2760) {
      partialSheet = 0.75;
    } else {
      partialSheet = 1;
    }

    // Возвращаем общее количество использованных листов
    return sheetsCount - 1 + partialSheet;
  }

  return calculateUsedSheets;
}

export { createCutting };
