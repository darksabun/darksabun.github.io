var countDownTimer = function (id, date) {
  var _vDate = new Date(date);
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;

  function showRemaining() {
    var now = new Date();
    var distDt = _vDate - now;

    if (distDt < 0) {
      clearInterval(timer);
      document.getElementById(id).textContent = "Time Over!";
      return;
    }

    var days = Math.floor(distDt / _day);
    var hours = Math.floor((distDt % _day) / _hour);
    var minutes = Math.floor((distDt % _hour) / _minute);
    var seconds = Math.floor((distDt % _minute) / _second);

    if (getCurrentLanguage() === "ko") {
      document.getElementById(id).textContent =
        "신청 마감까지 남은 시간 : " + days + "일 ";
      document.getElementById(id).textContent += hours + "시간 ";
      document.getElementById(id).textContent += minutes + "분 ";
      document.getElementById(id).textContent += seconds + "초 ";
    } else if (getCurrentLanguage() === "ja") {
      document.getElementById(id).textContent =
        "申し込み締め切りまでの残り時間 : " + days + "日 ";
      document.getElementById(id).textContent += hours + "時間 ";
      document.getElementById(id).textContent += minutes + "分 ";
      document.getElementById(id).textContent += seconds + "秒 ";
    } else {
      document.getElementById(id).textContent =
        "Time Remaining : " + days + " Day ";
      document.getElementById(id).textContent += hours + " Hour ";
      document.getElementById(id).textContent += minutes + " Minute ";
      document.getElementById(id).textContent += seconds + " Second ";
    }
  }

  timer = setInterval(showRemaining, 1000);
};

// Usage
// <script src="/assets/js/countdown_timer.js"></script>
// <script>countDownTimer("Timer", "MM/DD/YYYY");</script>
// and put this
// <p id="Timer"></p>
