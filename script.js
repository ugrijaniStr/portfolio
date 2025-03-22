sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}

let i = 0;

async function typingText(x,y) {
  let contentX = x;
  let contentY = y;
  let elemX = document.getElementById('typingX');
  let elemY = document.getElementById('typingY');
  
  while (true) {
    elemX.innerHTML = '';
    elemY.innerHTML = '';

    for(i = 0; i <= contentX.length - 1; i++) {
      await sleep(200);
      elemX.innerText += contentX[i];
    }

    for(j = 0; j <= contentY.length -1; j++) {
      await sleep(200);
      elemY.innerText += contentY[j];
    }

    await sleep(1000);

    for(i = contentX.length - 1; i >= 0; i--) {
      await sleep(100);
      elemX.innerText = contentX.substring(0, i);
    }

    for(j = contentY.length - 1; j >= 0; j--) {
      await sleep(100);
      elemY.innerText = contentY.substring(0, j);
    }
  }
}