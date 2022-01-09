// 배열 복사
let a = ["a", "b", "c"];
let b = a;
b.push("d");
console.log(a + "==" + b); //result a,b,c,d==a,b,c,d\

let c = ["a", "b", "c"];
let d = [...c];
d.push("d");
console.log(c + "==" + d); //result a,b,c==a,b,c,d

let aa = 10;
let bb = aa;
aa = 20;
console.log(aa + "==" + bb); //result 20==10

const searchResult = $("#searchResult");
function searchImage(_img) {
    $.ajax({
        url: `https://dapi.kakao.com/v2/search/image?query=${_img}&size=48`,
        headers: {
            Authorization: "KakaoAK 5befb56da4da5245a648a4c5ce79d548",
        },
        success: function (res) {
            // console.log("res", res);
            const imgList = [...res.documents];
            let output = "";
            searchResult.html("<ul></ul>");
            const resultUL = searchResult.find("ul");
            $.each(imgList, function (i, item) {
                output += `
                    <li><a href="${item.image_url}" data-fancybox="gallery" data-caption="Optional caption"><img src="${item.thumbnail_url}"></a></li>
                `;
            });
            resultUL.html(output);
            gsap.from("#searchResult li", { scale: 0, ease: "power4", stagger: 0.02 });
        },
    });
}

function searchVclip(_img) {
    $.ajax({
        url: `https://dapi.kakao.com/v2/search/vclip?query=${_img}&size=20`,
        headers: {
            Authorization: "KakaoAK 5befb56da4da5245a648a4c5ce79d548",
        },
        success: function (res) {
            // console.log("res", res);
            const imgList = [...res.documents];
            let output = "";
            searchResult.html("<ul></ul>");
            const resultUL = searchResult.find("ul");
            $.each(imgList, function (i, item) {
                output += `
                    <li><a href="${item.url}" data-fancybox="gallery" data-caption="Optional caption"><img src="${item.thumbnail}"></a></li>
                `;
            });
            resultUL.html(output);
            gsap.from("#searchResult li", { scale: 0, ease: "power4", stagger: 0.02 });
        },
    });
}

$("#btnSearch").on("click", function () {
    const search = $("#searchTxt").val();
    searchVclip(search);
    $("#recentSearchWord .list").append(`<li>${search}</li>`);
});
$("#searchTxt").on("keyup", function (e) {
    // console.log(e);
    if (e.keyCode === 13) {
        const search = $("#searchTxt").val();
        searchVclip(search);
        $("#recentSearchWord .list").append(`<li data-word="${search}">${search}</li>`);
    }
});

$("#recentSearchWord .list").on("click", "li", function () {
    const search = $(this).data("word");
    searchVclip(search);
});
