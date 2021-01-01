// ==UserScript==
// @name         Twitch Title Big for GronkhTV
// @namespace    twitch
// @namespace    gronkh
// @namespace    gronkhtv
// @version      0.1
// @description  Twitch Title Big for GronkhTV
// @author       littlejak20
// @match        https://www.twitch.tv/gronkhtv
// @grant        none
// @updateURL    https://raw.githubusercontent.com/littlejak20/tampermonkey/main/TwitchTitleBigForGronkhTV.js
// @downloadURL  https://raw.githubusercontent.com/littlejak20/tampermonkey/main/TwitchTitleBigForGronkhTV.js
// ==/UserScript==

(function() {
    'use strict';

    var domGame = document.createElement('span');
    domGame.style.color = 'orange';
    var domSeperator = document.createElement('span');
    var domTitle = document.createElement('span');

    var domInner = document.createElement('span');
    domInner.appendChild(domGame);
    domInner.appendChild(domSeperator);
    domInner.appendChild(domTitle);

    var domOuter = document.createElement("span");
    domOuter.appendChild(domInner);
    domOuter.style.position = 'absolute';
    domOuter.style.top = '0';
    domOuter.style.right = '0';
    domOuter.style.left = '0';
    domOuter.style.display = 'block';
    domOuter.style.fontSize = '5rem';
    domOuter.style.textAlign = 'center';
    domOuter.style.padding = '.2rem 2rem';
    domOuter.style.zIndex = '99999';
    domOuter.style.pointerEvents = 'none';

    new MutationObserver(function(mutations, me) {
        //var pElem = document.querySelector('.persistent-player');
        var pElem = document.querySelector('.video-player__overlay');
        if (pElem !== null) {
            me.disconnect();
            pElem.appendChild(domOuter);
            console.log('Player found', pElem);
            startTitleUpdate();
        }
    }).observe(document, {childList: true, subtree: true});

    function startTitleUpdate() {
        setInterval(function() {
            var elementGame = document.querySelector('[data-a-target="stream-game-link"]');
            if (elementGame === null) elementGame = document.querySelector('[data-a-target="player-info-game-name"]');
            var elementTitle = document.querySelector('[data-a-target="stream-title"]');
            if (elementTitle === null) elementTitle = document.querySelector('[data-a-target="stream-info-card-component__subtitle"]')
            var strGame = ''; var strTitle = ''; var strNewTitle = '';

            if (elementGame !== null) strGame = elementGame.innerText;
            if (elementTitle !== null) strTitle = elementTitle.innerText;

            domGame.innerHTML = strGame;
            domSeperator.innerHTML = (strGame !== '' && strTitle !== '') ? ' | ' : '';
            domTitle.innerHTML = strTitle
                                    .replace('[GTV247] ✶ ', '').replace(' ✶ #DOSENWURST - Die 24/7 Dauerbeschallung', '')
                                    .replace('#DOSENWURST ✶ 24/7 Dauerbeschallung ✶ #Legionenteufel | ', '');

            if (strNewTitle !== '') domOuter.innerHTML = strNewTitle;
        }, 5000);

        /*new MutationObserver(function(mutations, me) {
            var elementGame = null, elementTitle = null;
            mutations.forEach(function(mutation) {
                var elementTmp = document.querySelector('[data-a-target="stream-game-link"]');
                if (elementTmp === null) elementTmp = document.querySelector('[data-a-target="player-info-game-name"]');
                if (elementTmp !== null) elementGame = elementTmp;

                elementTmp = document.querySelector('[data-a-target="stream-title"]');
                if (elementTmp === null) elementTmp = document.querySelector('[data-a-target="stream-info-card-component__subtitle"]')
                if (elementTmp !== null) elementTitle = elementTmp;
            });

            console.log('MutationObserver', 'mutations', mutations, 'elementGame:', elementGame, 'elementTitle:', elementTitle);
        }).observe(document, { characterData: true, attributes: false, childList: false, subtree: true });*/
    }

    console.log('Twitch Title Big for GronkhTV');
})();