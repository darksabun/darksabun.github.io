// Venue Contents Making
document.addEventListener("DOMContentLoaded", function () {
  if (typeof venueManualLoad === "undefined") {
    fetchJson();
  }
});

async function fetchJson() {
  const result = await fetch("./venue_data.json");
  const json = await result.json();
  // console.log(json);

  const frag = document.createDocumentFragment();
  const venueDIV = frag.appendChild(document.createElement("div"));
  json.forEach((i, index) => {
    // Anchor
    const hr = document.createElement("hr");
    hr.id = i.ds_anchor;

    // Title
    const h2 = document.createElement("h2");
    h2.classList.add("m-4", "text-center");
    h2.textContent = i.ds_h2;

    // Subtitle
    const h4 = document.createElement("h4");
    h4.classList.add("m-4", "text-center");
    h4.textContent = i.ds_h4;

    // SubSubtitle
    const h5 = document.createElement("h5");
    h5.classList.add("m-4", "text-center");
    h5.textContent = i.ds_h5;

    // AUTOPLAY Video
    const pVideo = document.createElement("p");
    if (i.free_button_name) {
      // Append Charts
      pVideo.classList.add("container", "ratio", "ratio-16x9");
      const iframeVideo = document.createElement("iframe");
      iframeVideo.classList.add("rounded-3");
      iframeVideo.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + i.ds_video
      );
      iframeVideo.setAttribute("frameborder", "0");
      iframeVideo.setAttribute("allowfullscreen", "");
      pVideo.appendChild(iframeVideo);
    } else {
      // General
      pVideo.classList.add("container", "ratio", "ratio-16x9");
      const iframeVideo = document.createElement("iframe");
      iframeVideo.classList.add("rounded-3");
      iframeVideo.setAttribute(
        "srcdoc",
        `<style>
          * {
            padding: 0;
            margin: 0;
            overflow: hidden;
          }
          html,body {
            height: 100%;
          }
          img,span {
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 0;
            margin: auto;
          }
          span {
            height: 1.5em;
            text-align: center;
            font: 48px/1.5 sans-serif;
            color: white;
            text-shadow: 0 0 0.5em black;
          }
        </style>
        <a href="https://www.youtube.com/embed/${i.ds_video}?autoplay=1">
          <img src="https://img.youtube.com/vi/${i.ds_video}/hqdefault.jpg">
          <span>▶</span>
        </a>`
      );
      iframeVideo.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + i.ds_video
      );
      iframeVideo.setAttribute("frameborder", "0");
      iframeVideo.setAttribute("allowfullscreen", "");
      pVideo.appendChild(iframeVideo);
    }

    // Download Buttons
    const pDownloadButton = document.createElement("p");

    const section = document.createElement("section");
    pDownloadButton.appendChild(section);

    const div1 = document.createElement("div");
    div1.classList.add("container", "mt-2");
    section.appendChild(div1);

    const div2 = document.createElement("div");
    div2.classList.add("row", "mb-4", "text-center");
    div1.appendChild(div2);

    // BMS Download
    const divSongURL = document.createElement("div");
    divSongURL.classList.add("col-md-6");
    div2.appendChild(divSongURL);

    const h4BmsDL = document.createElement("h4");
    if (i.course) {
      h4BmsDL.textContent = "Download Course";
    } else if (i.free_button_name) {
      h4BmsDL.textContent = i.free_button_name;
    } else {
      h4BmsDL.textContent = "Download BMS";
    }
    divSongURL.appendChild(h4BmsDL);

    const bmsDownLink = document.createElement("a");
    bmsDownLink.href = i.url;
    bmsDownLink.classList.add("mt-2", "mb-4", "btn", "btn-dark", "btn-lg");
    bmsDownLink.textContent = "Download";
    divSongURL.appendChild(bmsDownLink);

    if (i.url_diff) {
      // Chart Download
      const divChartURL = document.createElement("div");
      divChartURL.classList.add("col-md-6");
      div2.appendChild(divChartURL);

      const h4ChartDL = document.createElement("h4");
      h4ChartDL.textContent = "Download Chart";
      divChartURL.appendChild(h4ChartDL);

      const chartDownLink = document.createElement("a");
      chartDownLink.href = i.url_diff;
      chartDownLink.classList.add("mt-2", "mb-4", "btn", "btn-dark", "btn-lg");
      chartDownLink.textContent = "Download";
      divChartURL.appendChild(chartDownLink);
    } else {
      divSongURL.classList.remove("col-md-6");
      divSongURL.classList.add("col-md-12");
    }

    // Course
    const courseMakingDiv = document.createElement("div");
    courseMakingDiv.classList.add("table-responsive", "mb-4");

    const courseInfoH5 = document.createElement("h5");
    courseInfoH5.textContent = "Course Info";

    const courseTable = document.createElement("table");
    courseTable.classList.add(
      "table",
      "table-striped",
      "table-hover",
      "text-center"
    );
    courseMakingDiv.appendChild(courseInfoH5);
    courseMakingDiv.appendChild(courseTable);

    if (i.course) {
      const courseThead = document.createElement("thead");
      courseTable.appendChild(courseThead);

      const courseTheadTr = document.createElement("tr");
      courseThead.appendChild(courseTheadTr);

      const courseTh1 = document.createElement("th");
      courseTh1.setAttribute("style", "width: 1%");
      courseTh1.textContent = "Stage";

      const courseTh2 = document.createElement("th");
      courseTh2.setAttribute("style", "width: 1%");
      courseTh2.textContent = "Movie";

      const courseTh3 = document.createElement("th");
      courseTh3.setAttribute("style", "width: 1%");
      courseTh3.textContent = "Score";

      const courseTh4 = document.createElement("th");
      courseTh4.setAttribute("style", "width: 10%");
      courseTh4.textContent = "Title";

      const courseTh5 = document.createElement("th");
      courseTh5.setAttribute("style", "width: 10%");
      courseTh5.textContent = "Artist";

      const courseTh6 = document.createElement("th");
      courseTh6.setAttribute("style", "width: 10%");
      courseTh6.textContent = "Maker";

      courseThead.appendChild(courseTheadTr);
      courseTheadTr.appendChild(courseTh1);
      courseTheadTr.appendChild(courseTh2);
      courseTheadTr.appendChild(courseTh3);
      courseTheadTr.appendChild(courseTh4);
      courseTheadTr.appendChild(courseTh5);
      courseTheadTr.appendChild(courseTh6);

      const courseTbody = document.createElement("tbody");
      courseTable.appendChild(courseTbody);

      // Sort by Stage number
      const courseSort = i.course.sort((a, b) => {
        return a.stage - b.stage;
      });
      const courses = Object.keys(courseSort);
      courses.forEach((j) => {
        const stage = i.course[j].stage;
        const video = i.course[j].video;
        const md5 = i.course[j].md5;
        const title = i.course[j].title;
        const url = i.course[j].bms_url;
        const artist = i.course[j].artist;
        const chartMaker = i.course[j].maker;

        const courseTbodyTr = document.createElement("tr");
        courseTbody.appendChild(courseTbodyTr);

        const courseTd1 = document.createElement("td");
        courseTd1.textContent = stage;

        const courseTd2 = document.createElement("td");
        const courseMvUrl = document.createElement("a");
        courseMvUrl.href = "https://www.youtube.com/watch?v=" + video;
        courseMvUrl.classList.add("fas", "fa-lg", "fa-play");
        courseTd2.appendChild(courseMvUrl);

        const courseTd3 = document.createElement("td");
        const courseScoreUrl = document.createElement("a");
        courseScoreUrl.href = "http://www.ribbit.xyz/bms/score/view?md5=" + md5;
        courseScoreUrl.classList.add("fas", "fa-lg", "fa-music");
        courseTd3.appendChild(courseScoreUrl);

        const courseTd4 = document.createElement("td");
        const courseLr2irUrl = document.createElement("a");
        courseLr2irUrl.href =
          "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" +
          md5;
        courseLr2irUrl.textContent = title;
        courseTd4.appendChild(courseLr2irUrl);

        const courseTd5 = document.createElement("td");
        const courseArtistUrl = document.createElement("a");
        courseArtistUrl.href = url;
        courseArtistUrl.textContent = artist;
        courseTd5.appendChild(courseArtistUrl);

        const courseTd6 = document.createElement("td");
        courseTd6.textContent = chartMaker;

        courseTbody.appendChild(courseTbodyTr);
        courseTbodyTr.appendChild(courseTd1);
        courseTbodyTr.appendChild(courseTd2);
        courseTbodyTr.appendChild(courseTd3);
        courseTbodyTr.appendChild(courseTd4);
        courseTbodyTr.appendChild(courseTd5);
        courseTbodyTr.appendChild(courseTd6);
      });
    }

    // Comment
    const pComment = document.createElement("p");
    const h5Comment = document.createElement("h5");
    if (i.nickname) {
      h5Comment.textContent = `Comment (${i.nickname})`;
    } else {
      h5Comment.textContent = "Comment";
    }
    // Multi-Language Comment
    if (i.comment) {
      pComment.innerHTML = i.comment;
    } else if (nowLang == "ko" && i.comment_ko) {
      pComment.innerHTML = i.comment_ko;
    } else if (nowLang == "ja" && i.comment_ja) {
      pComment.innerHTML = i.comment_ja;
    } else {
      pComment.innerHTML = i.comment_en;
    }

    // Append
    venueDIV.appendChild(hr);
    venueDIV.appendChild(h2);
    venueDIV.appendChild(h4);
    if (i.ds_h5) {
      venueDIV.appendChild(h5);
    }
    venueDIV.appendChild(pVideo);
    venueDIV.appendChild(pDownloadButton);
    if (i.course) {
      venueDIV.appendChild(courseMakingDiv);
    }
    if (i.comment || i.comment_ko || i.comment_ja || i.comment_en) {
      venueDIV.appendChild(h5Comment);
      venueDIV.appendChild(pComment);
    }
  });
  document.querySelector("#venue-content").appendChild(venueDIV);
  document.querySelector("#venue-content-load").style.display = "none";
}

// Usage
// =========================
// Used header : ds_anchor, ds_h2, ds_h4, ds_h5(if need), ds_video, url, url_diff, nickname, comment, course(if need)
// -------------------------
// How to make Course Table
//
// [
//   {
//     "ds_anchor": "shortcut anchor",
//     "ds_h2": "Course name",
//     "ds_h4": "Level or Team name",
//     "ds_video": "Course autoplay video",
//     "url": "Download URL",
//     "course": [
//       {
//         "stage": "Stage number",
//         "video": "Autoplay video link (youtube) | ex -> (o5WcoAckg7U&t=189s)",
//         "md5": "BMS md5",
//         "title": "BMS title",
//         "bms_url": "BMS download URL",
//         "artist": "Composer",
//         "maker": "Chart maker"
//       }
//     ],
//     "comment": "Write comment"
//   }
// ]
