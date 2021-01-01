// ==UserScript==
// @name         Twitch Title from Chat for GronkhTV
// @namespace    twitch
// @namespace    twitch chat
// @namespace    gronkh
// @namespace    gronkhtv
// @version      0.1
// @description  Twitch Title from Chat for GronkhTV
// @author       littlejak20
// @match        https://www.twitch.tv/gronkhtv
// @grant        none
// @updateURL    https://raw.githubusercontent.com/littlejak20/tampermonkey/main/TwitchTitleFromChatForGronkhTV.js
// @downloadURL  https://raw.githubusercontent.com/littlejak20/tampermonkey/main/TwitchTitleFromChatForGronkhTV.js
// ==/UserScript==

(function() {
    'use strict';

    var domOuter = document.createElement("span");
    domOuter.style.position = 'absolute';
    domOuter.style.bottom = '0';
    domOuter.style.right = '0';
    domOuter.style.left = '0';
    domOuter.style.display = 'block';
    domOuter.style.fontSize = '5rem';
    domOuter.style.textAlign = 'center';
    domOuter.style.padding = '.2rem 2rem';
    domOuter.style.zIndex = '99999';
    domOuter.style.pointerEvents = 'none';

    var domOuter2 = document.createElement("span");
    domOuter2.style.position = 'absolute';
    domOuter2.style.bottom = '4.2%';
    domOuter2.style.right = '0.8%';
    domOuter2.style.maxWidth = '35%';
    domOuter2.style.display = 'block';
    domOuter2.style.fontSize = '4rem';
    domOuter2.style.backgroundColor = 'rgba(0,0,0,0.7)';
    domOuter2.style.textAlign = 'center';
    domOuter2.style.padding = '0 1.9rem';
    domOuter2.style.zIndex = '99999';
    domOuter2.style.pointerEvents = 'none';

    new MutationObserver(function(mutations, me) {
        var chatListElem = document.querySelector('.chat-scrollable-area__message-container');
        var pElem = document.querySelector('.video-player__overlay');

        if (chatListElem === null || pElem === null) return;
        console.log('Twitch Chat Test ==> Chat found', chatListElem);
        console.log('Twitch Chat Test ==> Player found', pElem);
        pElem.appendChild(domOuter);
        pElem.appendChild(domOuter2);
        me.disconnect();

        new MutationObserver(function(mutations, me) {
            mutations.forEach(function(mutation) {
                if (mutation === undefined) return;
                if (mutation.addedNodes === undefined) return;
                if (mutation.addedNodes.length <= 0) return;

                var chatLineElem = mutation.addedNodes[0];
                if (chatLineElem === undefined) return;

                var chatLineText = chatLineElem.textContent;
                if (chatLineText === undefined) return;
                if (chatLineText.indexOf('GronkhTV: Aktuell läuft:') < 0) return;

                var titleArray = chatLineText
                    .split(' // ');

                if (titleArray.length < 2) return;

                var currentTitle = titleArray[0]
                    .replace('GronkhTV: Aktuell läuft: ', '')
                    .replace('undefined', '');
                var nextTitle = titleArray[1]
                    .replace('Danach (', '')
                    .replace('): ', ': ')
                    .replace('undefined', '');

                console.group('Twitch Chat Test ==> Title');
                    console.log('currentTitle', currentTitle);
                    console.log('nextTitle', nextTitle);
                console.groupEnd();

                domOuter.innerHTML = currentTitle;
                domOuter2.innerHTML = nextTitle;
            });
        }).observe(chatListElem, {childList: true, subtree: true});

    }).observe(document, {childList: true, subtree: true});

    //console.log('Twitch Chat Test', mutations);
    //}).observe(document.querySelector('.chat-scrollable-area__message-container'), {childList: true, subtree: true});

    console.log('Twitch Chat Test');
})();