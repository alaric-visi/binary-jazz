/* spring.js */
document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.getElementById('generate-btn');
    const WRAP  = document.querySelector('.spring-wrapper');
    const PATH  = document.getElementById('spring-path');
    const SVG   = document.querySelector('.spring-svg');
  
    const LOOPS      = 7;
    const AMP        = 64;
    const TRANSITION = 'stroke-dashoffset 2.2s cubic-bezier(.59,.03,.48,.99)';
  
    function buildSpringPath(width, loops, amp) {
      const half = amp / 2;
      const step = width / (loops * 2);
      let d = `M0 ${half}`;
      let xPrev = 0, yPrev = half;
  
      for (let i = 0; i < loops * 2; i++) {
        const x  = step * (i + 1);
        const y  = i % 2 ? 0 : amp;
        const cx = xPrev + step / 2;
        const cy = yPrev;
        d += ` Q${cx} ${cy} ${x} ${y}`;
        xPrev = x; yPrev = y;
      }
      return d;
    }
  
    function updateSpring() {
      const width = WRAP.offsetWidth || 1;
      SVG.setAttribute('height', AMP);
      SVG.setAttribute('viewBox', `0 0 ${width} ${AMP}`);
      PATH.setAttribute('d', buildSpringPath(width, LOOPS - 0.5, AMP));
  
      const total = PATH.getTotalLength();
      const dash  = total / (((LOOPS - 0.5) * 2) + 1);
      PATH.style.setProperty('--dash', `${dash}`);
      PATH.style.setProperty('--offset', `${total}px`);
      PATH.style.strokeDashoffset = total;
    }
  
    function triggerSpring() {
      const total = PATH.getTotalLength();
      PATH.style.transition       = 'none';
      PATH.style.strokeDashoffset = total;
      void PATH.getBoundingClientRect();
  
      requestAnimationFrame(() => {
        PATH.style.transition       = TRANSITION;
        PATH.style.strokeDashoffset = 0;
      });
    }
  
    requestAnimationFrame(updateSpring);
    window.addEventListener('resize', updateSpring);
  
    btn.addEventListener('click', triggerSpring);
  });
  