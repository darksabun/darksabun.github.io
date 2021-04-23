// for Battle Ranking Table Multi-Language Support
if (getLanguage === "ko-KR" || getLanguage === "ko-kr" || getLanguage === "ko") {
    $("#table_int").append("<thead><tr><th rowspan='2'>플레이어</th><th colspan='2' class='table-success'>초급자</th><th colspan='2' class='table-warning'>중급자</th><th colspan='2' class='table-danger'>상급자</th><th rowspan='2'>합계</th></tr><tr><th>연타</th><th>난타</th><th>동시치기</th><th>스크래치</th><th>트릴</th><th>롱놋</th></tr></thead>");
} else if (getLanguage === "ja-JP" || getLanguage === "ja") {
    $("#table_int").append("<thead><tr><th rowspan='2'>プレイヤー</th><th colspan='2' class='table-success'>初級者</th><th colspan='2' class='table-warning'>中級者</th><th colspan='2' class='table-danger'>上級者</th><th rowspan='2'>合計</th></tr><tr><th>連打</th><th>乱打</th><th>同時押し</th><th>皿</th><th>トリル</th><th>LN</th></tr></thead>");
} else {
    $("#table_int").append("<thead><tr><th rowspan='2'>Player</th><th colspan='2' class='table-success'>Beginner</th><th colspan='2' class='table-warning'>Intermediate</th><th colspan='2' class='table-danger'>Expert</th><th rowspan='2'>Total</th></tr><tr><th>Jacks</th><th>Stream</th><th>Chords</th><th>Scratch</th><th>Trill</th><th>LN</th></tr></thead>");
}