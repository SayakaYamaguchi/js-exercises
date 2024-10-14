customElements.define("inline-circle", class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // スタイルと要素を作成
      const circle = document.createElement('div');
      const borderColor = this.getAttribute('border-color') || 'black';
      const borderWidth = this.getAttribute('border-width') || '1px';
      const borderStyle = this.getAttribute('border-style') || 'solid';
  
      circle.style.width = '100px';
      circle.style.height = '100px';
      circle.style.borderRadius = '50%';
      circle.style.border = `${borderWidth} ${borderStyle} ${borderColor}`;
      circle.style.display = 'inline-block';
  
      shadow.appendChild(circle);
    }
  });