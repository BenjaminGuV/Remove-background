export async function removeBackground(c) {
  //const canvas = document.querySelector('canvas');
  const canvas = c.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  let canvas_w = 0;
  let canvas_h = 0;

  //loading
  console.log("loading");

  // Loading the model
  // eslint-disable-next-line no-undef
  const net = await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  });

  // Segmentation
  const { data: map } = await net.segmentPerson(canvas, {
    internalResolution: 'medium',
  });

  const canvasElem = canvas;
  let text_one = 'Canvas DOM element width x height: ' +
    canvasElem.scrollWidth +
    ' x ' +
    canvasElem.scrollHeight;
  console.log("text_one", text_one);

  const canvasContext = canvasElem.getContext('2d');
  let text_two = 'Canvas internal width x height: ' +
    canvasContext.canvas.width +
    ' x ' +
    canvasContext.canvas.height;

  canvas_w = canvasElem.scrollWidth;
  canvas_h = canvasElem.scrollHeight;

  // Extracting image data
  const { data: imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Creating new image data
  const newImg = ctx.createImageData(canvas.width, canvas.height);
  const newImgData = newImg.data;

  for (let i = 0; i < map.length; i++) {
    //The data array stores four values for each pixel
    const [r, g, b, a] = [imgData[i * 4], imgData[i * 4 + 1], imgData[i * 4 + 2], imgData[i * 4 + 3]];
    [
      newImgData[i * 4],
      newImgData[i * 4 + 1],
      newImgData[i * 4 + 2],
      newImgData[i * 4 + 3]
    ] = !map[i] ? [255, 255, 255, 0] : [r, g, b, a];
  }


  // Draw the new image back to canvas
  ctx.putImageData(newImg, 0, 0);

  console.log("fishished");

}