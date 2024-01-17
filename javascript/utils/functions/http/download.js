function FetchForDownload(e) {
  let buttonClicked = e.target;
  let buttonData = buttonClicked.dataset.download;
  let urlFetch = "http://localhost:5000/download/" + buttonData;
  console.log("urlfetch: " + urlFetch);

  fetch(urlFetch, {
    method: "GET",
    headers: {
        Accept: "image/png",
        
    },
  }).then((response) => {
    
    location.href = urlFetch;
  });
}

export { FetchForDownload };
