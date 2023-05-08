import React, { useLayoutEffect, useRef } from 'react'

function Particles() {
    var ROWS = 100;
    var COLS = 300;
    var NUM_PARTICLES = (ROWS*COLS),
    THICKNESS = Math.pow( 80, 2 ),
    SPACING = 3,
    MARGIN = 100,
    COLOR = 220,
    DRAG = 0.95,
    EASE = 0.25,
    /*
    used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation
    B = 4 / Math.PI,
    C = -4 / Math.pow( Math.PI, 2 ),
    P = 0.225,
    */
    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    w:Number, h:Number,
    p, s,
    r, c
    ;
particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};
const particlesRef = useRef(null);
function init() {
  container = document.getElementById('particles');
  canvas = document.createElement( 'canvas' );
  ctx = canvas.getContext( '2d' );
  man = false;
  tog = true;
  list = [];
  w = canvas.width = COLS * SPACING + MARGIN * 2;
  h = canvas.height = ROWS * SPACING + MARGIN * 2;
  container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
  container.style.marginTop = Math.round( h * -0.5 ) + 'px';
  for (i = 0; i < NUM_PARTICLES; i++) {
    p = Object.create( particle );
    p.x = p.ox = MARGIN + SPACING * ( i % COLS );
    p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );
    list[i] = p;
  }
  container?.addEventListener('mousemove', function(e) {
    var bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left; // 커서를 기점으로 입자를 밀어냄
    my = e.clientY - bounds.top;
    man = true;
  });
  if(typeof Stats === 'function') {
    document.body.appendChild((stats = new Stats()).domElement);
  }
  container.appendChild( canvas );
}


function step() {
  if (stats) stats.begin();
  if (tog = !tog) {
    // date로 숫자를 갱신, 임의적인 움직임을 가진 mx,my(마우스 위치값)을 부여한다.
    if (!man) {
      t = +new Date() * 0.001;
      mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
      my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
    }
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      p = list[i];
      d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
      f = -THICKNESS / d;
      if ( d < THICKNESS ) {
        t = Math.atan2( dy, dx );
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }
    // 입자가 이전 위치로 되돌아오는 부분
      if(!man){ // 마우스의 움직임이 없을때(처음) 되돌아와야함.
        p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
      p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;
      } else {
        p.x += ( p.vx *= DRAG );
        p.y += ( p.vy *= DRAG );
      }
    }
  } else {
    b = ( a = ctx.createImageData( w, h ) ).data;
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      p = list[i];
      b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
    }
    ctx.putImageData( a, 0, 0 );
  }
  if ( stats ) stats.end();
  requestAnimationFrame( step );
}

useLayoutEffect(()=>{
    init();
    step();
},[1])

  return (
    <>
    <div id='particles' className={`bg-[#111]`}></div>
    <div className='info'>
        <hgroup className='about'>
            <h1>30,000 Particles</h1>
            <h2>A study creating performant particles with Canvas 2D</h2>
            <h3>Use your mouse</h3>
        </hgroup>
    </div>
    </>
  )
}

export default Particles