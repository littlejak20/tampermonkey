// ==UserScript==
// @name         Twitch Channel Points auto collect
// @namespace    twitch
// @version      0.1
// @description  automatically claim the channel points if a button appears
// @author       mumpitz, littlejak20
// @match        https://www.twitch.tv/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/littlejak20/tampermonkey/main/TwitchChannelPointsAutoCollect.js
// @downloadURL  https://raw.githubusercontent.com/littlejak20/tampermonkey/main/TwitchChannelPointsAutoCollect.js
// ==/UserScript==

(function() {
    'use strict';

    var bObserver = new MutationObserver(function(pointsMutations) {
        pointsMutations.forEach(function(pointsMutation) {
            var bElem = pointsMutation.target.querySelector('button');
            if (bElem !== null) {
                bElem.click();
                //try { fetch('https://maker.ifttt.com/trigger/nanoleaf_blink/with/key/bPdCRWQN9YOb95gxqUlPHC?value1=orange&value2=2') } catch(e) {}
                console.log('Button clicked');
            }
        });
    });

    var pObserver = new MutationObserver(function(docMutations) {
        docMutations.forEach(function(docMutation) {
            var pElem = docMutation.target.querySelector('.community-points-summary > div:nth-child(2)');
            if (pElem !== null) {
                //try { fetch('https://maker.ifttt.com/trigger/nanoleaf_blink/with/key/bPdCRWQN9YOb95gxqUlPHC?value1=green&value2=2') } catch(e) {}
                console.log('Points to observe', pElem);
                bObserver.observe(pElem, {childList: true, subtree: true});
                pObserver.disconnect();
            }
        });
    });

    console.log('run Points Observer on document');
    pObserver.observe(document, {childList: true, subtree: true});

    // zu überwachende Zielnode (target) auswählen
    // var target = document.querySelector('.community-points-summary > div:nth-child(2)');

    // eine Instanz des Observers erzeugen
    // var observer = new MutationObserver(function(mutations) {
    //     mutations.forEach(function(mutation) {
    //         var bElem = mutation.target.querySelector('BUTTON');
    //         if (bElem !== null) {
    //             bElem.click();
    //         }
    //     });
    // });

    // Konfiguration des Observers: alles melden - Änderungen an Daten, Kindelementen und Attributen
    // var config = { attributes: true, childList: false, characterData: false, subtree: true };

    // eigentliche Observierung starten und Zielnode und Konfiguration übergeben
    // observer.observe(target, { attributes: true, childList: false, characterData: false, subtree: true });

    // später: Observation wieder einstellen
    //observer.disconnect();
})();