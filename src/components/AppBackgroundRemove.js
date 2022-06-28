import React, { useState } from 'react'
import Canvas from './Canvas'
import File from './File'

export const AppBackgroundRemove = () => {

    const [imagen = 'girl2.jpg', setImagen] = useState();

    
    return (
        <div>
            <Canvas imagen={imagen} />
            <File setImagen={setImagen}  />
            <p>{imagen}</p>
        </div>
    )

}
