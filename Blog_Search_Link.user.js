// ==UserScript==
// @name        Blog Search Link
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        ブログ内検索をするリンクの生成
// @author        Ameba Blog User
// @match        https://ameblo.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Blog_Search_Link/raw/main/Blog_Search_Link.user.js
// @downloadURL        https://github.com/personwritep/Blog_Search_Link/raw/main/Blog_Search_Link.user.js
// ==/UserScript==


let page_body=document.body;

if(page_body){

    let style=
        '<style class="BSLink">body.bslink *::selection { background-color: red !important; }</style>';
    if(!document.querySelector('.BSLink')){
        document.body.insertAdjacentHTML('beforeend', style); }

    page_body.addEventListener('mousedown', (event)=>{
        if(event.shiftKey && event.button===2){ // 反転選択した「テキスト」を「Shift+右Click」
            let selection=document.getSelection();
            let select_text=selection.toString();

            if(select_text){
                event.preventDefault();
                event.stopImmediatePropagation();

                page_body.classList.toggle('bslink');
                setTimeout(()=>{
                    document.getSelection().removeAllRanges(); // 選択範囲をクリア
                    page_body.classList.toggle('bslink');
                }, 300);

                let user_id=location.href.split('ameblo.jp/')[1].split('/')[0];
                select_text=encodeURIComponent(select_text); // URLエンコード
                let serch_url='https://search.ameba.jp/search/entry/'+ select_text +'.html?aid='+ user_id;

                if(navigator.clipboard){
                    navigator.clipboard.writeText(serch_url); }} // Clipboardへコピー

        }});

} // if(page_body)
