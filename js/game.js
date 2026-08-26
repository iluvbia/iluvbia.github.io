(function(){
  var TARGET = 10;
  var caught = 0;

  var gameArea = document.getElementById('game-area');
  var progressFill = document.getElementById('progress-fill');
  var progressLabel = document.getElementById('progress-label');

  var HEART_SVG = '<svg viewBox="0 0 32 29" fill="none"><path d="M16 28C16 28 1 18.5 1 8.8C1 3.9 4.9 1 8.9 1C12 1 14.6 2.8 16 5.6C17.4 2.8 20 1 23.1 1C27.1 1 31 3.9 31 8.8C31 18.5 16 28 16 28Z" stroke="currentColor" stroke-width="1.6"/></svg>';

  var catcher, areaW, areaH, catcherX;
  var hearts = [];
  var spawnTimer = null;
  var loopId = null;
  var running = false;

  function startGame(){
    areaW = gameArea.clientWidth;
    areaH = gameArea.clientHeight;
    catcherX = areaW / 2;

    catcher = document.createElement('div');
    catcher.className = 'catcher';
    catcher.style.left = catcherX + 'px';
    gameArea.appendChild(catcher);

    gameArea.addEventListener('mousemove', onMove);
    gameArea.addEventListener('touchmove', onMove, {passive:false});

    running = true;
    spawnTimer = setInterval(spawnHeart, 700);
    loopId = requestAnimationFrame(tick);
  }

  function onMove(e){
    e.preventDefault();
    var rect = gameArea.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    catcherX = Math.max(0, Math.min(areaW, clientX - rect.left));
    catcher.style.left = catcherX + 'px';
  }

  function spawnHeart(){
    if(!running) return;
    var el = document.createElement('div');
    el.className = 'heart';
    el.innerHTML = HEART_SVG;
    var x = 20 + Math.random() * (areaW - 40);
    el.style.left = x + 'px';
    gameArea.appendChild(el);
    hearts.push({ el: el, x: x, y: -30, speed: 1.1 + Math.random()*0.9 });
  }

  function tick(){
    if(!running) return;
    for(var i = hearts.length - 1; i >= 0; i--){
      var h = hearts[i];
      h.y += h.speed;
      h.el.style.top = h.y + 'px';

      var catcherY = areaH - 24;
      if(h.y >= catcherY - 20 && h.y <= catcherY + 10 && Math.abs(h.x - catcherX) < 40){
        h.el.remove();
        hearts.splice(i, 1);
        caught++;
        updateProgress();
        if(caught >= TARGET){
          endGame();
          return;
        }
        continue;
      }

      if(h.y > areaH + 30){
        h.el.remove();
        hearts.splice(i, 1);
      }
    }
    loopId = requestAnimationFrame(tick);
  }

  function updateProgress(){
    var pct = Math.min(100, (caught / TARGET) * 100);
    progressFill.style.width = pct + '%';
    progressLabel.textContent = caught + ' de ' + TARGET;
  }

  function endGame(){
    running = false;
    clearInterval(spawnTimer);
    cancelAnimationFrame(loopId);
    gameArea.removeEventListener('mousemove', onMove);
    gameArea.removeEventListener('touchmove', onMove);
    hearts.forEach(function(h){ h.el.remove(); });
    hearts = [];

    setTimeout(function(){
      window.location.href = 'pedido.html';
    }, 500);
  }

  startGame();
})();
