(function(){
  var noBtn = document.getElementById('no-btn');
  var yesBtn = document.getElementById('yes-btn');
  var choices = document.querySelector('.choices');

  function dodge(){
    var rect = choices.getBoundingClientRect();
    var maxX = rect.width - 50;
    var maxY = rect.height - 20;
    var newX = (Math.random() - 0.5) * maxX;
    var newY = (Math.random() - 0.5) * maxY;
    noBtn.style.position = 'absolute';
    noBtn.style.transform = 'translate(' + newX + 'px,' + newY + 'px)';
  }

  noBtn.addEventListener('mouseover', dodge);
  noBtn.addEventListener('click', function(e){ e.preventDefault(); dodge(); });
  noBtn.addEventListener('touchstart', function(e){ e.preventDefault(); dodge(); });

  yesBtn.addEventListener('click', function(){
    window.location.href = 'final.html';
  });
})();
