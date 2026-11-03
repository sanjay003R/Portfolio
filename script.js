(function(){
  var btns=document.querySelectorAll('.filters button'),cards=document.querySelectorAll('#grid .card');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    var f=b.getAttribute('data-f');
    cards.forEach(function(c){c.hidden=!(f==='all'||c.getAttribute('data-c')===f)});
  })});
  var cp=document.getElementById('cp');
  cp.addEventListener('click',function(){
    var t=document.getElementById('em').textContent;
    function done(){cp.textContent='Copied';setTimeout(function(){cp.textContent='Copy'},1600)}
    function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('em'));var s=getSelection();s.removeAllRanges();s.addRange(r);cp.textContent='Selected'}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,sel)}else{sel()}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* re-play the card entrance after filtering */
  btns.forEach(function(b){b.addEventListener('click',function(){
    if(reduce)return;var n=0;
    cards.forEach(function(c){if(c.hidden)return;c.classList.remove('pop');c.style.animationDelay=(n++*45)+'ms';void c.offsetWidth;c.classList.add('pop')});
  })});

  if(reduce)return;

  /* count-up numbers */
  document.querySelectorAll('[data-count]').forEach(function(el){
    var end=parseFloat(el.getAttribute('data-count')),dec=+el.getAttribute('data-dec')||0,suf=el.getAttribute('data-suffix')||'',t0=null;
    function step(t){if(t0===null)t0=t;var k=Math.min((t-t0)/1300,1),e=1-Math.pow(1-k,3);
      el.textContent=(end*e).toFixed(dec)+suf;if(k<1)requestAnimationFrame(step)}
    el.textContent=(0).toFixed(dec)+suf;requestAnimationFrame(step);
  });

  /* rotating role line */
  var role=document.getElementById('role'),lines=['Web Designer & Front-End Developer','WordPress Theme Designer','Responsive, fast, clean websites'],li=0;
  setInterval(function(){li=(li+1)%lines.length;role.textContent=lines[li];role.classList.remove('swap');void role.offsetWidth;role.classList.add('swap')},3200);

  /* pointer tilt on cards and portrait (mouse only) */
  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    function tilt(el,max){
      el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        el.style.setProperty('--ry',(x*max).toFixed(2)+'deg');el.style.setProperty('--rx',(-y*max).toFixed(2)+'deg')});
      el.addEventListener('pointerleave',function(){el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg')});
    }
    cards.forEach(function(c){tilt(c,7)});
    tilt(document.querySelector('.photo'),9);
  }
})();
