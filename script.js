console.log('javascript is running fine');
const imageURL = 'image.jpg'; //replace with the photo in need
const puzzleContainer = document.getElementById('puzzle-container');
const dropzone = document.getElementById('dropzone');
const successSound = document.getElementById('success-sound');
const completionVideo = document.getElementById('completion-video');

const pieces = Array.from({length: 9}, (_, index) => index);
let completedPieces = 0;

function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createPuzzlePieces(){
    const shuffledPieces = shuffle([...pieces]);

    shuffledPieces.forEach(index => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url(${imageURL})`;
        piece.style.backgroundPosition = `-${(index % 3) * 100}px -${Math.floor(index / 3) * 100}px`;
        piece.draggable = true;
        piece.dataset.index = index;
        puzzleContainer.appendChild(piece);

        piece.addEventListener(`dragstart`, event => {
            event.dataTransfer.setData('text/plain', pieces.dataset.index);
        });
    });
}

function createDropTargets() {
    pieces.forEach(index => {
        const target = document.createElement('div');
        target.classList.add('drop-target');
        target.dataset.index = index;
        dropzone.appendChild(target);

        target.addEventListener('dragover', event => {
            event.preventDefault(); //allow drop
        });

        target.addEventListener('drop', event => {
            event.preventDefault();
            const droppedIndex = event.dataTransfer.getData('text/plain');
            
            //check if the dropped piece matches the target index
            if (droppedIndex === target.dataset.index) {
                const piece = document.querySelector(`.puzzle-piece[data-index='${droppedIndex}']`);
                target.appendChild(piece); //move the piece to the target
                piece.draggable = false; //disable dragging for the placed piece
                piece.style.position = 'relative'; //make sure it stays within the target
                piece.style.left = '0';
                piece.style.top = '0';
                successSound.play(); //play success sound
                completedPieces++;
                
                //check if the puzzle is complete
                if (completedPieces === pieces.length) {
                    setTimeout(() => {
                        completionVideo.style.display = 'flex'; //show completion video
                    }, 500);
                }
            }
        });
    });
}

//initialize the puzzle
createPuzzlePieces();
createDropTargets();