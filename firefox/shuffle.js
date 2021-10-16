function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle() {
  const grids = document.getElementsByClassName("collection-grid");

  if (grids.length) {
    const grid = grids[0];
    const items = [...grids[0].children];

    while (items.length > 0) {
      const node = items.splice(getRandomInteger(0, items.length - 1), 1)[0];
      grid.removeChild(node);
      grid.appendChild(node);
    }
  }
}

function paginate() {
  const response = window.wrappedJSObject.CollectionGrids.collection.paginate();
  // Adding callbacks seems to cause errors, so we just have a timeout to watch for a response
  const checkResponse = () => {
    setTimeout(() => {
      if (response.isRejected()) {
        throw new Error('Error fetching from bandcamp');
      } else if (response.isResolved()) {
        loadAllAndShuffle();
      } else {
        checkResponse();
      }
    }, 50);
  }
  checkResponse();
}

function loadAllAndShuffle() {
  if (window.wrappedJSObject.CollectionGrids.collection.sequence.length !== window.wrappedJSObject.CollectionGrids.collection.itemCount) {
    paginate();
  } else {
    shuffle();
  }
}

try {
  const gettingItem = browser.storage.local.get('useExperimentalMode');
  gettingItem.then((res) => {
    const useExperimentalMode = res.useExperimentalMode || false;

    if (useExperimentalMode) {
      loadAllAndShuffle();
    } else {
      shuffle();
    }
  });
} catch (error) {
  console.error('bandcamp-shuffle error:')
  console.error(error);
}
