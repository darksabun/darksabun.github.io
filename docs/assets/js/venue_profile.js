// Venue Profile Making
document.addEventListener("DOMContentLoaded", function () {
  if (typeof venueProfileManualLoad === "undefined") {
    fetchProfileJson();
  }
});

async function fetchProfileJson() {
  const response = await fetch("./venue_profile.json");
  const json = await response.json();

  const frag = document.createDocumentFragment();
  const venueProfileDIV = frag.appendChild(document.createElement("div"));
  venueProfileDIV.classList.add("row", "col-md-12");

  json.forEach((i, index) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-6");

    const section = document.createElement("section");

    // User Name
    const nickName = document.createElement("h4");
    if (i.ds_site_url) {
      const userSiteURL = document.createElement("a");
      userSiteURL.href = i.ds_site_url;
      userSiteURL.innerHTML = i.ds_nickname;
      nickName.appendChild(userSiteURL);
    } else {
      nickName.innerHTML = i.ds_nickname;
    }
    section.appendChild(nickName);

    // Details
    const listContainer = document.createElement("div");
    const ul = document.createElement("ul");

    // Chart Video
    if (i.ds_chart_title) {
      const representChart = document.createElement("li");
      if (i.ds_chart_video) {
        const videoURL = document.createElement("a");
        videoURL.href = i.ds_chart_video;
        videoURL.textContent = i.ds_chart_title;
        representChart.appendChild(videoURL);
      } else {
        representChart.textContent = i.ds_chart_title;
      }
      ul.appendChild(representChart);
    }

    // Category (must ARRAY, ex) [Light, Middle, Heavy])
    if (i.ds_category) {
      const participantCategory = document.createElement("li");
      participantCategory.textContent = i.ds_category.join(", ");
      ul.appendChild(participantCategory);
    }

    // Comment
    if (i.comment) {
      const userComment = document.createElement("li");
      userComment.innerHTML = i.comment;
      ul.appendChild(userComment);
    }

    listContainer.appendChild(ul);
    section.appendChild(listContainer);
    colDiv.appendChild(section);
    venueProfileDIV.appendChild(colDiv);
  });
  document.querySelector("#venue-profile").appendChild(frag);
  document.querySelector("#venue-profile-load").style.display = "none";
}

// Usage
// ========
// Used header : ds_nickname, ds_site_url(if need), ds_chart_title(if need), ds_chart_video(if need), ds_category(if need), comment(if need)
// -------------------------
// [
//   {
//     "ds_nickname": "Your Nickname",
//     "ds_site_url": "Site URL",
//     "ds_chart_title": "Chart Name",
//     "ds_chart_video": "Chart Video",
//     "ds_category": ["Light", "Middle", "Heavy", "Freestyle"], (Must ARRAY)
//     "comment": "Write comment"
//   }
// ]
