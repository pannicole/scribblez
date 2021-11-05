import React, {useEffect} from 'react'
import * as Paper from 'paper'
import drawEyesAndBrows from './services/eyesAndBrows'
import drawFace from './services/faceOutline'
import drawMouth from './services/mouth'
import drawNose from './services/nose'

/**
 * COMPONENT
 */
export const Canvas = props => {
  var mid = 200
  var width = 75

  var vector = new Paper.Point(0,width)
  var center = new Paper.Point(mid, mid)

  var topY = mid - vector.length
  var bottomY = mid + vector.length
  var midY = (bottomY - topY)/2

  useEffect( () => {
    var eyesY = topY + midY * (.5 + Math.random())
    var noseY = Math.floor(Math.random() * (bottomY -10 - eyesY + 1) + eyesY)
    var noseX = (Math.random() * 10) + 2
    var mouthY = bottomY - Math.floor(Math.random() * (bottomY - noseY))
    var mouthWidth = (Math.random() * 15) + 5
    var eyeRadius = Math.random() * 5

    window.onload = function () {
      var canvas = document.getElementById('myCanvas');
      Paper.setup(canvas);

      drawFace(vector, center)
      drawEyesAndBrows(mid, eyesY, width, eyeRadius)
      drawNose(mid, noseX, noseY)
      drawMouth(mid, mouthWidth, mouthY)

      Paper.view.draw();
    }
  }, [])

  const toImage = () => {
    var canvas = document.getElementById("myCanvas");
    var image = canvas.toDataURL();
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image;
}

  return (
    <>
    <canvas id= "myCanvas" width="400" height= "400" style = {{background: "white"}}></canvas>
    <button onClick= {() => toImage()}> Save </button>
    </>
  )
}
