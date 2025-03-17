// Только логика, Делает раскрой и возвращает необходимое колличество листов для заказа,
// с учетом что продается лист по 1/4. Принимает массив объектов.

// Глобальные константы
const SHEET_WIDTH = 760;
const SHEET_HEIGHT = 3660;
const SHEET_GAP = 0; // Уменьшено до 20px для минимального расстояния между листами
const PART_SPACING = 20; // Отступ для деталей
const SCALE_FACTOR = 4; // Коэффициент масштабирования визуализации
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

function guillotineCutting(tiles) {
  // Изменяем сортировку: сначала по площади, затем по ширине
  tiles.sort((a, b) => {
    const areaA = a.width * a.height;
    const areaB = b.width * b.height;
    if (areaA === areaB) {
      return b.width - a.width;
    }
    return areaB - areaA;
  });

  class FreeRectangle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    // Проверка пересечения с другим прямоугольником
    intersects(rect) {
      return !(
        this.x + this.width <= rect.x ||
        rect.x + rect.width <= this.x ||
        this.y + this.height <= rect.y ||
        rect.y + rect.height <= this.y
      );
    }
  }

  const result = [];
  let currentSheet = 0;
  let freeRectangles = [new FreeRectangle(0, 0, SHEET_WIDTH, SHEET_HEIGHT)];

  // Находит все максимальные свободные прямоугольники после размещения детали
  function findMaximalRectangles(placedRect) {
    const newRectangles = [];

    // Проверяем каждый существующий свободный прямоугольник
    for (const free of freeRectangles) {
      if (free.intersects(placedRect)) {
        // Создаем до 4 новых прямоугольников вокруг размещенной детали

        // Прямоугольник сверху
        if (free.y < placedRect.y) {
          newRectangles.push(
            new FreeRectangle(free.x, free.y, free.width, placedRect.y - free.y)
          );
        }

        // Прямоугольник снизу
        if (free.y + free.height > placedRect.y + placedRect.height) {
          newRectangles.push(
            new FreeRectangle(
              free.x,
              placedRect.y + placedRect.height,
              free.width,
              free.y + free.height - (placedRect.y + placedRect.height)
            )
          );
        }

        // Прямоугольник слева
        if (free.x < placedRect.x) {
          newRectangles.push(
            new FreeRectangle(
              free.x,
              free.y,
              placedRect.x - free.x,
              free.height
            )
          );
        }

        // Прямоугольник справа
        if (free.x + free.width > placedRect.x + placedRect.width) {
          newRectangles.push(
            new FreeRectangle(
              placedRect.x + placedRect.width,
              free.y,
              free.x + free.width - (placedRect.x + placedRect.width),
              free.height
            )
          );
        }
      } else {
        newRectangles.push(free);
      }
    }

    // Удаляем избыточные прямоугольники
    return filterRedundantRectangles(newRectangles);
  }

  // Удаляет избыточные прямоугольники
  function filterRedundantRectangles(rectangles) {
    const filtered = [];

    for (let i = 0; i < rectangles.length; i++) {
      let isRedundant = false;
      const r1 = rectangles[i];

      // Пропускаем слишком маленькие прямоугольники
      if (r1.width < PART_SPACING || r1.height < PART_SPACING) {
        continue;
      }

      for (let j = 0; j < rectangles.length; j++) {
        if (i === j) continue;
        const r2 = rectangles[j];

        if (
          r2.x <= r1.x &&
          r2.y <= r1.y &&
          r2.x + r2.width >= r1.x + r1.width &&
          r2.y + r2.height >= r1.y + r1.height
        ) {
          isRedundant = true;
          break;
        }
      }

      if (!isRedundant) {
        filtered.push(r1);
      }
    }

    return filtered;
  }

  function findBestFit(tile) {
    let bestRect = null;
    let bestRotated = false;
    let bestScore = Infinity;
    let bestArea = Infinity;

    for (const free of freeRectangles) {
      // Проверяем обе ориентации с приоритетом горизонтального размещения
      const orientations = [
        // Сначала пробуем горизонтальное размещение
        { width: tile.height, height: tile.width, rotated: true },
        // Затем вертикальное
        { width: tile.width, height: tile.height, rotated: false },
      ];

      for (const orientation of orientations) {
        if (
          orientation.width + PART_SPACING <= free.width &&
          orientation.height + PART_SPACING <= free.height
        ) {
          // Изменяем критерий оценки: приоритет нижнему размещению
          const score = free.y + free.x / SHEET_WIDTH;
          const area = free.width * free.height;

          if (score < bestScore || (score === bestScore && area < bestArea)) {
            bestScore = score;
            bestArea = area;
            bestRect = free;
            bestRotated = orientation.rotated;
          }
        }
      }
    }

    return { rect: bestRect, rotated: bestRotated };
  }

  // Размещаем каждую деталь
  for (const tile of tiles) {
    let placed = false;

    while (!placed) {
      const { rect, rotated } = findBestFit(tile);

      if (rect) {
        const width = rotated ? tile.height : tile.width;
        const height = rotated ? tile.width : tile.height;

        const placedRect = {
          id: tile.id,
          x: rect.x,
          y: rect.y + currentSheet * (SHEET_HEIGHT + SHEET_GAP),
          width: width,
          height: height,
          rotated: rotated,
        };

        result.push(placedRect);

        // Обновляем список свободных прямоугольников
        const localPlacedRect = { ...placedRect };
        localPlacedRect.y -= currentSheet * (SHEET_HEIGHT + SHEET_GAP);
        freeRectangles = findMaximalRectangles(localPlacedRect);

        placed = true;
      } else {
        currentSheet++;
        freeRectangles = [new FreeRectangle(0, 0, SHEET_WIDTH, SHEET_HEIGHT)];
      }
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
  sheetsCountDisplay.style.marginTop = '20px';
  sheetsCountDisplay.style.width = '100%';
  sheetsCountDisplay.style.marginLeft = '10px';
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
    sheetWrapper.style.display = 'flex';
    sheetWrapper.style.flexDirection = 'column';
    sheetWrapper.style.alignItems = 'flex-start';

    const sheetLabel = document.createElement('div');
    sheetLabel.className = 'sheet-label';
    sheetLabel.textContent = `Лист ${parseInt(sheetNumber) + 1}`;
    sheetLabel.style.textAlign = 'center'; // Центрирование текста
    sheetLabel.style.marginBottom = '-900px'; // Changed from 20px to 5px
    sheetWrapper.appendChild(sheetLabel);

    const sheetContainer = document.createElement('div');
    sheetContainer.className = 'sheet-container';
    sheetContainer.style.marginLeft = '5px';

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
  return guillotineCutting(inputData);
}

function optimizeForWindowsills(tiles) {
  // Проверяем возможность поперечного размещения
  if (
    tiles.some(
      (tile) => tile.width <= SHEET_HEIGHT / 2 && tile.height <= SHEET_WIDTH
    )
  ) {
    // Поворачиваем деталь на 90 градусов
    return tiles.map((tile) => ({
      ...tile,
      width: tile.height,
      height: tile.width,
      rotated: true,
    }));
  }
  return tiles;
}

export { createCutting, visualizeTiles };
