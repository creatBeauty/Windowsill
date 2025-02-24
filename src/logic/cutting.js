// Только логика, Делает раскрой и возвращает необходимое колличество листов для заказа,
// с учетом что продается лист по 1/4. Принимает массив объектов.

// Глобальные константы
const SHEET_WIDTH = 760;
const SHEET_HEIGHT = 3660;
const SPACING = 15;
const SHEET_GAP = 100; // Отступ для деталей
const SHEET_VISUAL_GAP = -2000; // Визуальный отступ между листами
const PART_SPACING = 20; // Отступ для деталей
const SCALE_FACTOR = 3; // Коэффициент масштабирования визуализации
let SHEETS_COUNT = 0; // Начальное количество листов

function calculateSheetsCount(tiles) {
  if (tiles.length === 0) return 0;

  // Находим максимальную Y-координату
  const maxY = Math.max(...tiles.map((t) => t.y + t.height));

  // Определяем номер листа
  const fullSheets = Math.floor(maxY / (SHEET_HEIGHT + SHEET_GAP));

  // Находим локальную Y-координату на последнем листе
  const localY = maxY % (SHEET_HEIGHT + SHEET_GAP);

  // Добавляем дробную часть в зависимости от заполнения последнего листа
  let partialSheet = 0;
  if (localY > 0) {
    if (localY <= 915) {
      partialSheet = 0.25;
    } else if (localY <= 1830) {
      partialSheet = 0.5;
    } else if (localY <= 2747) {
      partialSheet = 0.75;
    } else {
      partialSheet = 1;
    }
  }

  return fullSheets + partialSheet; // Убрали +1, так как fullSheets уже включает первый лист
}

function simpleCutting(tiles) {
  // Если количество листов 0, устанавливаем 1 лист для начала работы
  if (SHEETS_COUNT === 0) {
    SHEETS_COUNT = 1;
  }

  tiles.sort((a, b) => {
    // First sort by height (prioritize taller pieces)
    if (Math.abs(a.height - b.height) > 100) {
      return b.height - a.height;
    }
    // Then by width for pieces of similar height
    return b.width - a.width;
  });

  const result = [];
  let currentSheet = 0;
  let remainingTiles = [...tiles];

  function tryPlaceTile(tile, baseY) {
    // Add initial boundary check
    if (tile.width > SHEET_WIDTH || tile.height > SHEET_HEIGHT) {
      console.warn(
        `Tile ${tile.id} (${tile.width}x${tile.height}) exceeds sheet dimensions`
      );
      return { x: null, y: null, rotated: false };
    }

    const placedOnSheet = result.filter(
      (placed) =>
        Math.floor(placed.y / (SHEET_HEIGHT + SHEET_GAP)) === currentSheet
    );

    // Special handling for tall pieces (height > width)
    if (tile.height > tile.width) {
      const totalSetWidth = tile.width * 2 + PART_SPACING; // 310*2 + 20 = 640

      if (totalSetWidth <= SHEET_WIDTH) {
        const x = placedOnSheet.reduce(
          (maxX, placed) => Math.max(maxX, placed.x + placed.width),
          0
        );

        if (x + tile.width + PART_SPACING <= SHEET_WIDTH) {
          return {
            x: x + PART_SPACING,
            y: baseY,
            rotated: false,
          };
        }
      }
    }

    // Special handling for horizontal pieces (height <= 50)
    if (tile.height <= 50) {
      const tallPieces = placedOnSheet.filter((p) => p.height > p.width);
      if (tallPieces.length > 0) {
        const totalSetWidth = tallPieces[0].width * 2 + PART_SPACING; // 310*2 + 20 = 640

        if (totalSetWidth <= SHEET_WIDTH) {
          // Find matching tall piece for this horizontal piece
          let targetTallPiece = null;

          // Детали 2 и 3 идут под первой высокой деталью
          if (tile.id === '2' || tile.id === '3') {
            targetTallPiece = tallPieces[0];
          }
          // Детали 6 и 7 идут под второй высокой деталью
          else if (tile.id === '6' || tile.id === '7') {
            targetTallPiece = tallPieces[1];
          }

          if (targetTallPiece) {
            const existingHorizontalPieces = placedOnSheet.filter(
              (p) =>
                p.height <= 50 &&
                p.x === targetTallPiece.x &&
                p.y > targetTallPiece.y
            );

            if (existingHorizontalPieces.length < 2) {
              return {
                x: targetTallPiece.x,
                y:
                  baseY +
                  targetTallPiece.height +
                  PART_SPACING +
                  existingHorizontalPieces.length *
                    (tile.height + PART_SPACING),
                rotated: false,
              };
            }
          }
        }
      }
    }

    // Специальная обработка для узких горизонтальных деталей
    if (tile.height <= 50 && tile.width <= SHEET_WIDTH) {
      const existingTilesOnSheet = result.filter(
        (placed) =>
          Math.floor(placed.y / (SHEET_HEIGHT + SHEET_GAP)) === currentSheet
      );

      // Сначала ищем похожую деталь с такими же размерами
      const similarTile = existingTilesOnSheet.find(
        (placed) =>
          placed.width === tile.width &&
          placed.height === tile.height &&
          !placed.rotated
      );

      if (similarTile) {
        // Пробуем разместить прямо под похожей деталью
        const newY = similarTile.y + similarTile.height + PART_SPACING;
        const newX = similarTile.x;

        // Проверяем, что новая позиция в пределах листа
        if (newY + tile.height <= baseY + SHEET_HEIGHT - PART_SPACING) {
          // Проверяем пересечения с другими деталями
          let canPlace = true;
          for (let other of existingTilesOnSheet) {
            if (other === similarTile) continue;
            if (
              !(
                newX + tile.width <= other.x ||
                newX >= other.x + other.width ||
                newY + tile.height <= other.y ||
                newY >= other.y + other.height
              )
            ) {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            return { x: newX, y: newY, rotated: false };
          }
        }
      }

      // Если не удалось разместить под похожей деталью, используем стандартную логику
      let x = PART_SPACING;
      let y = baseY + PART_SPACING;

      while (y + tile.height <= baseY + SHEET_HEIGHT - PART_SPACING) {
        let canPlace = true;
        for (let other of existingTilesOnSheet) {
          if (
            !(
              x + tile.width <= other.x ||
              x >= other.x + other.width ||
              y + tile.height <= other.y ||
              y >= other.y + other.height
            )
          ) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          return { x, y, rotated: false };
        }
        y += SPACING;
      }
    }

    // Если не удалось разместить справа, используем стандартную логику
    let bestX = null;
    let bestY = null;
    let bestRotated = false;
    let bestScore = Infinity;

    const orientations = [
      {
        w: tile.width + PART_SPACING,
        h: tile.height + PART_SPACING,
        rotated: false,
      },
      {
        w: tile.height + PART_SPACING,
        h: tile.width + PART_SPACING,
        rotated: true,
      },
    ];

    for (let orientation of orientations) {
      if (orientation.h > SHEET_HEIGHT) continue;

      let possibleX = [0];
      placedOnSheet.forEach((placed) => {
        possibleX.push(placed.x + placed.width + PART_SPACING);
      });

      possibleX = [...new Set(possibleX)].sort((a, b) => a - b);

      // Update the y-loop condition to ensure strict boundary check
      for (
        let y = baseY;
        y <= baseY + SHEET_HEIGHT - orientation.h;
        y += SPACING
      ) {
        for (let x of possibleX) {
          // Add strict boundary check
          if (
            x + orientation.w > SHEET_WIDTH ||
            y + orientation.h > baseY + SHEET_HEIGHT
          )
            continue;

          let canPlace = true;

          for (let placed of result) {
            const placedSheet = Math.floor(
              placed.y / (SHEET_HEIGHT + SHEET_GAP)
            );
            if (placedSheet !== currentSheet) continue;

            if (
              !(
                x + orientation.w <= placed.x ||
                x >= placed.x + placed.width + PART_SPACING ||
                y + orientation.h <= placed.y ||
                y >= placed.y + placed.height + PART_SPACING
              )
            ) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            let score = y * 3 + x * 2;

            if (score < bestScore) {
              bestScore = score;
              bestX = x;
              bestY = y;
              bestRotated = orientation.rotated;
            }
          }
        }
      }
    }

    return { x: bestX, y: bestY, rotated: bestRotated };
  }

  // Основной цикл размещения
  while (remainingTiles.length > 0) {
    const baseY = currentSheet * (SHEET_HEIGHT + SHEET_GAP);
    let tilesPlaced = false;

    for (let i = 0; i < remainingTiles.length; i++) {
      const tile = remainingTiles[i];
      const position = tryPlaceTile(tile, baseY);

      if (position.x !== null) {
        const width = position.rotated ? tile.height : tile.width;
        const height = position.rotated ? tile.width : tile.height;

        result.push({
          id: tile.id,
          x: position.x,
          y: position.y,
          width: width,
          height: height,
          rotated: position.rotated,
        });

        remainingTiles.splice(i, 1);
        i--;
        tilesPlaced = true;
      }
    }

    if (!tilesPlaced || remainingTiles.length === 0) {
      currentSheet++;
    }
  }

  SHEETS_COUNT = calculateSheetsCount(result);
  return {
    tiles: result,
    sheetsCount: SHEETS_COUNT,
  };
}

// Функция визуализации вынесена на уровень модуля
function visualizeTiles(tiles) {
  const cuttingVisualization = document.getElementById('cuttingVisualization');
  if (!cuttingVisualization) {
    console.error('Элемент cuttingVisualization не найден');
    return;
  }

  // Очищаем предыдущую визуализацию
  cuttingVisualization.innerHTML = '';
  cuttingVisualization.className = 'cutting-visualization';

  // Добавляем информацию о количестве листов
  const sheetsCountDisplay = document.createElement('div');
  sheetsCountDisplay.className = 'sheets-count';
  sheetsCountDisplay.style.marginTop = '0';
  sheetsCountDisplay.textContent = `Требуется листов: ${SHEETS_COUNT}`;
  cuttingVisualization.appendChild(sheetsCountDisplay);

  // Создаем контейнер для каждого листа
  const sheets = {};
  tiles.forEach((tile) => {
    const sheetNumber = Math.floor(tile.y / (SHEET_HEIGHT + SHEET_GAP));
    if (!sheets[sheetNumber]) {
      sheets[sheetNumber] = [];
    }
    sheets[sheetNumber].push(tile);
  });

  // Создаем визуализацию для каждого листа
  Object.entries(sheets).forEach(([sheetNumber, sheetTiles]) => {
    const sheetWrapper = document.createElement('div');
    sheetWrapper.className = 'sheet-wrapper';

    const sheetLabel = document.createElement('div');
    sheetLabel.className = 'sheet-label';
    sheetLabel.textContent = `Лист ${parseInt(sheetNumber) + 1}`;
    sheetWrapper.appendChild(sheetLabel);

    const sheetContainer = document.createElement('div');
    sheetContainer.className = 'sheet-container';

    // Вычисляем масштаб для полной ширины
    const containerWidth = window.innerWidth - 80;
    const scale = (containerWidth / 760) * SCALE_FACTOR;

    // Добавляем детали на лист
    sheetTiles.forEach((tile) => {
      const tileElement = document.createElement('div');
      tileElement.className = 'tile-element';

      // Позиционирование тайла
      const tileY = tile.y - sheetNumber * (SHEET_HEIGHT + SHEET_GAP);
      tileElement.style.left = `${tile.x}px`;
      tileElement.style.top = `${tileY}px`;
      tileElement.style.width = `${tile.width}px`;
      tileElement.style.height = `${tile.height}px`;

      tileElement.innerHTML = `ID: ${tile.id}<br>${tile.width}x${tile.height}`;
      sheetContainer.appendChild(tileElement);
    });

    sheetWrapper.appendChild(sheetContainer);
    cuttingVisualization.appendChild(sheetWrapper);
  });
}

function createCutting(inputData) {
  // Возвращаем результат simpleCutting
  return simpleCutting(inputData);
}

export { createCutting, visualizeTiles };
