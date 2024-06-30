let myTexts = document.getElementById("myTexts");
let inputText = document.getElementById("name");
let checked = true;
let stopped = false;
function randomMinMax(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = inputText.value;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 3;
    newDiv.style.top = 0;
    newDiv.id = "text";
    if (!inputText.value) {
      alert("내용을입력하세요!");
    }
    const gravity = 0.5;

    let rotation = randomMinMax(-180, 180);
    let speed = 0;
    let x = randomMinMax(200, 550);
    let y = 0;
    let rangeY = randomMinMax(200, 550);
    let fontSize = randomMinMax(50, 25);

    if (myTexts.childElementCount >= 10) {
      alert("물을 내려주세요!");
      return;
    }
    function dropText() {
      if (!checked) {
        return;
      }

      myTexts.appendChild(newDiv);
      if (y >= rangeY) {
        return;
      }
      speed += gravity;
      y += speed;

      newDiv.style.fontSize = `${fontSize}px`;
      newDiv.style.transform = `translate(${x}px,${y}px) rotate(${rotation}deg)`;

      requestAnimationFrame(dropText);
    }

    dropText();

    // if (stopped) {
    //   function rotatingText() {
    //     rotation += 1.5;
    //     newDiv.style.transform = `translate(${x}px,${y}px) rotate(${rotation}deg)`;
    //     requestAnimationFrame(rotatingText);
    //   }
    //   requestAnimationFrame(rotatingText);
    // }
    inputText.value = "";
  }
});

function flush() {
  let btnShadow = document.getElementById("btn");
  btnShadow.style.animation = "changeShadow 1s ease-in";

  let vid = document.getElementById("anim");
  const audio = new Audio("/src/flush_01.mp3");
  if (checked) {
    audio.play();
  }

  checked = false;
  vid.play();
  const texts = document.querySelectorAll("#text");
  let rotate = randomMinMax(-180, 180);
  //foreach를사용하여 배열요소 변경 동시 실행
  // texts.forEach((text) => {
  //   const randomRotate = randomMinMax(-180, 180);
  //   text.style.transition = "opacity 5s ease-out , transform 5s ease";
  //   text.style.opacity = "0";
  //   text.style.transform = `translate(300px, 370px) rotate(${randomRotate}deg)`;
  // });
  //async/await를 사용한 예시
  async function processArray() {
    rotate += 1000;
    for (const text of texts) {
      // 여기서 요소를 변경하거나 다른 작업을 수행할 수 있습니다.
      text.style.transition = "opacity 3s ease-out , transform 3s linear";
      text.style.opacity = "0";
      text.style.transform = `translate(300px, 370px) rotate(${rotate}deg)`;
      setTimeout(function () {
        text.remove();
      }, 3000);
      await delay(100); // 1초 대기
    }
    requestAnimationFrame(processArray);
    // setTimeout(function () {
    //   location.reload(); // 현재 페이지 새로고침
    // }, texts.length * 1000); // texts 배열의 길이만큼의 시간 후에 새로고침
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  processArray();

  vid.addEventListener("ended", function () {
    checked = true;
    btnShadow.style.animation = "";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").onclick = flush;
});
