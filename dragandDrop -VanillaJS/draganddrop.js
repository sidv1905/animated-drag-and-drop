let clone;
let dragindex = 0;
let dropindex = 0;

const allContainers = [
  ...document.getElementsByClassName("draggable-container"),
];
// draggable-container is the box  ****ondragover, ondrag, ondrop, ondragover

// draggable is the small boxes *****ondragstart, on drag end*****

///********** yha draggables ki bat */
const allDraggables = [...document.getElementsByClassName("draggable")];
console.log(allDraggables);

allDraggables.forEach((element) => {
  element.addEventListener("dragstart", function (event) {
    // to add class dragging

    event.target.classList.add("dragged");
  });
});

///********** yha draggable container ki bat */

console.log(allContainers);
allContainers.forEach((element) => {
  element.addEventListener("dragover", function (event) {
    event.preventDefault();
    // to add class dragging
    let element = document.querySelector(".dragged");
    if (
      event.target.classList.contains("draggable") &&
      element.parentElement !== event.target.parentElement
    ) {
      // to shift event.target node and +1 id of this one up and rest down
      let fatherContainer = event.target.parentElement;

      let allChilds = [...fatherContainer.children];

      // loop over child and
      let current, next, currentIndex, nextIndex;
      for (i = 0; i < allChilds.length; i++) {
        if (allChilds[i].id === event.target.id) {
          current = allChilds[i];
          currentIndex = i;
          if (i < allChilds.length) {
            next = allChilds[i + 1];
            nextIndex = i + 1;
          }
        }
      }

      // loop ends here

      // Transform the 0 to current -64px everyone

      // trasnsform next se leke last element ko +64ppx
      dropindex = nextIndex;
      for (let l = 0; l <= currentIndex; l++) {
        allChilds[l].style.transform = "translate(0px,-50px)";
      }
      for (let k = nextIndex; k < allChilds.length; k++) {
        allChilds[k].style.transform = "translate(0px,50px)";
      }
    }
  });
});

//

allDraggables.forEach((element) => {
  element.addEventListener("dragend", function (event) {
    // to add class dragging
    allContainers.forEach((element) => {
      for (item of element.children) {
        item.style.transform = "translate(0px,0px)";
      }
    });
    event.target.classList.remove("dragged");
  });
});

//*****/// */

// if element is dropped

allContainers.forEach((element) => {
  element.addEventListener("drop", function (event) {
    let allnewChilds = [...event.currentTarget.children];

    let dropedelement = document.querySelector(".dragged");

    event.currentTarget.insertBefore(dropedelement, allnewChilds[dropindex]);
  });
});

// element container drag drop
