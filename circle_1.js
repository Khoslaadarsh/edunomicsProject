var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d')

  canvas.width = (window.innerWidth);
  canvas.height = 3*(window.innerHeight)/4;

  
  const mouse = {
      x: undefined,
      y: undefined
  }

  let gravity = 1;
  let friction = 0.9;
  let height =canvas.height - document.getElementById('quantity').value;


  slider.oninput = function() {
    friction = this.value;
    output.innerHTML = this.value;
    c.clearRect(0, 0, canvas.width, canvas.height) // Erase whole canvas
    // init();
}
  // Event Listners
  addEventListener('mousemove', event =>{
      mouse.x = event.clientX;
      mouse.y = event.clientY
  });

  addEventListener('resize',()=>{
      canvas.width = (window.innerWidth);
      canvas.height = 3*(window.innerHeight)/4;
      init();
  });
  document.getElementById("start").addEventListener("click", ()=>{
      height = canvas.height - document.getElementById('quantity').value;
      init();
  })

  function Ball(x, y, radius, color){
      var count = 0;
      this.x = x;
      this.y = y;
      this.height=canvas.height - this.x;
      console.log(this.height);
      this.radius = radius;
      this.color = color;
      this.velocity = {
          x: 1,
          y: 1,
      };

      this.draw = function(){

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, canvas.height);
        c.stroke();
        c.beginPath();
        c.moveTo(0, canvas.height);
        c.lineTo(canvas.width, canvas.height);
        c.stroke();

        
          c.beginPath()
          c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
          c.fillStyle = this.color
          c.fill();
          c.stroke();
          c.closePath()
      };
      this.update =function(){
        

          if(this.y + this.radius + this.velocity.y >= canvas.height){
              if(this.velocity.y >= 0){
                  count++;
                  document.getElementById("bounse").value = count;
              }else if(this.velocity.y <= -0 || this.velocity.y <= +0){
                 return;
              }
            this.velocity.y = -this.velocity.y * friction;
          }else{
            if(this.height>this.radius)
            this.velocity.y +=gravity;
          }
          if(this.x + this.radius + this.velocity.x > canvas.width ){
            this.velocity.x = - this.velocity.x;
          }



          this.y += this.velocity.y;
          this.x += this.velocity.x;
          this.draw();
      }
  }

  let ball;
  let init = () =>{


          const radius = 5;
          const x = radius;
          const y= height;
          const color = "#000000";

      ball = (new Ball(x, y, radius, color));
      c.clearRect(0, 0, canvas.width, canvas.height) // Erase whole canvas

  }

  // Animate Loop
  let animate = ()=>{
      requestAnimationFrame(animate) //create an animation loop

          ball.update()
  }

  init();
  animate();
