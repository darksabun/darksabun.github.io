// Venue Contents Making
document.addEventListener("DOMContentLoaded", function(){
    fetchJson();
});

async function fetchJson() {
  const result = await fetch(venueDataUrl);
  const json = await result.json();
  console.log(json);
  
  const frag = document.createDocumentFragment();
  const venueDIV = frag.appendChild(document.createElement("div"));
  json.forEach((i, index) => {
    const hr = document.createElement("hr");
    hr.id = i.ds_anchor;
    
    // Title
    const h2 = document.createElement("h2");
    h2.classList.add("m-4");
    h2.classList.add("text-center");
    h2.textContent = i.ds_h2;
    
    // Subtitle
    const h4 = document.createElement("h4");
    h4.classList.add("m-4");
    h4.classList.add("text-center");
    h4.textContent = i.ds_h4;
    
    // AUTOPLAY Video
    const pVideo = document.createElement("p");
    pVideo.classList.add("container");
    pVideo.classList.add("ratio");
    pVideo.classList.add("ratio-16x9");
    const iframeVideo = document.createElement("iframe");
    iframeVideo.style = "border-radius:0.375em";
    iframeVideo.setAttribute("src", "https://www.youtube.com/embed/" + i.ds_video);
    iframeVideo.setAttribute("frameborder", "0");
    iframeVideo.setAttribute("allowfullscreen", "");
    pVideo.appendChild(iframeVideo);
    
    // Download Buttons
    const pDownloadButton = document.createElement("p");
    
    const section = document.createElement("section");
    pDownloadButton.appendChild(section);
    
    const div1 = document.createElement("div");
    div1.classList.add("container");
    div1.classList.add("mt-2");
    section.appendChild(div1);
    
    const div2 = document.createElement("div");
    div2.classList.add("row");
    div2.classList.add("mb-4");
    div2.classList.add("text-center");
    div1.appendChild(div2);
    
    // BMS Download
    const divSongURL = document.createElement("div");
    divSongURL.classList.add("col-md-6");
    div2.appendChild(divSongURL);
    
    const h4BmsDL = document.createElement("h4");
    h4BmsDL.textContent = "Download BMS";
    divSongURL.appendChild(h4BmsDL);
    
    const bmsDownLink = document.createElement("a");
    bmsDownLink.href = i.url;
    bmsDownLink.classList.add("mt-2");
    bmsDownLink.classList.add("mb-4");
    bmsDownLink.classList.add("btn-lg");
    bmsDownLink.classList.add("btn");
    bmsDownLink.classList.add("btn-dark");
    bmsDownLink.textContent = "Download";
    divSongURL.appendChild(bmsDownLink);
    
    // Chart Download
    const divChartURL = document.createElement("div");
    divChartURL.classList.add("col-md-6");
    div2.appendChild(divChartURL);
    
    const h4ChartDL = document.createElement("h4");
    h4ChartDL.textContent = "Download Chart";
    divChartURL.appendChild(h4ChartDL);
    
    const chartDownLink = document.createElement("a");
    chartDownLink.href = i.url_diff;
    chartDownLink.classList.add("mt-2");
    chartDownLink.classList.add("mb-4");
    chartDownLink.classList.add("btn-lg");
    chartDownLink.classList.add("btn");
    chartDownLink.classList.add("btn-dark");
    chartDownLink.textContent = "Download";
    divChartURL.appendChild(chartDownLink);
    
    // Comment
    const pComment = document.createElement("p");
    const h5 = document.createElement("h5");
    h5.textContent = "Comment" + " (" + i.nickname + ")";
    pComment.textContent = i.comment;
    
    // Append
    venueDIV.appendChild(hr);
    venueDIV.appendChild(h2);
    venueDIV.appendChild(h4);
    venueDIV.appendChild(pVideo);
    venueDIV.appendChild(pDownloadButton);
    venueDIV.appendChild(h5);
    venueDIV.appendChild(pComment);
    
  });
  document.querySelector(".venue-content").appendChild(venueDIV);
  document.querySelector(".venue-content-load").remove();
}

// Usage
// var venueDataUrl = "JSON URL";
// used header : ds_anchor, ds_h2, ds_h4, ds_video, url, url_diff, nickname, comment