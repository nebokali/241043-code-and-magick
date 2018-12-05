'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var FONT_GAP = 18;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(
      x,
      y,
      CLOUD_WIDTH,
      CLOUD_HEIGHT
  );
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_X + FONT_GAP,
      CLOUD_Y + FONT_GAP
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_X + FONT_GAP,
      CLOUD_Y + FONT_GAP * 2
  );

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    var time = Math.round(times[i]);

    ctx.fillText(
        time,
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP - 16 - GAP - ((BAR_HEIGHT * time) / maxTime) - GAP
    );
    ctx.fillText(
        players[i],
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP
    );

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    }

    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP - GAP - ((BAR_HEIGHT * time) / maxTime),
        BAR_WIDTH,
        (BAR_HEIGHT * time) / maxTime
    );
  }
};
