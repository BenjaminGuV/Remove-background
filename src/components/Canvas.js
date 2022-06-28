import React, { useRef, useEffect } from 'react'
import { removeBackground } from './RemoveBackground'

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  const draw = ctx => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20, 0, 2*Math.PI)
    ctx.fill()
  }
  
  useEffect( () => {
    
    const img = new Image();
    img.crossOrigin = '';

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // Load the image on canvas
    img.addEventListener('load', () => {
      // Set canvas width, height same as image
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      
      removeBackground( document );
    });
    
    //Our draw come here
    draw(context)

    img.src = props.imagen;

  }, [draw])

  
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas