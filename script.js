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
            event.dataTransfer.setData('text/plain', index);
        });
    });
}

function createDropTargets() {
    pieces.forEach(index => {
        const target = document.createElement('div');
        target.classList.add('drop-target');
        target.classList,index = index;
        dropzone.appendChild(target);

        target.addEventListener('dragover', event => {
            event.preventDefault();
        });

        target.addEventListener('drop', event => {
            event.preventDefault();
            const droppedIndex = event.dataTransfer.getData('text/plain');

            if (droppedIndex == target.dataset.index) {
                const piece = document.querySelector(`.puzzle-piece[data-index='${droppedIndex}']`);
                target.appendChild(piece);
                piece.draggable = false;
                successSound.play();
                completedPieces++;

                if (completedPieces === pieces.length) {
                    setTimeout(() => {
                        completionVideo.style.display = 'flex';
                    }, 500);
                }
            }
        });
    });
}

createPuzzlePieces();
createDropTargets();