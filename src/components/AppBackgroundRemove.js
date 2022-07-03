import React, { useState } from 'react'
import Canvas from './Canvas'
import File from './File'

export const AppBackgroundRemove = () => {

    const [imagen = 'girl2.jpg', setImagen] = useState();

    
    return (
        <div>
            <div className="grid grid-cols-1 p-8">
                <h2 className="font-medium leading-tight text-center text-4xl mt-0 mb-2 text-blue-600">Remove background Tensorflow JS</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 content-center">
                <div className='col-span-8'>
                    <Canvas imagen={imagen} />
                </div>
                <div className='col-span-4'>
                    <File setImagen={setImagen}  />
                </div>
            </div>
        </div>
    )

}
