// ==UserScript==
// @name         Leitstellenspiel-Auswertung
// @namespace    https://github.com/
// @version      0.3
// @description  try to take over the world!
// @author       littlejak20, jubjub29
// @match        https://www.leitstellenspiel.de/credits*
// @grant        none
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @updateURL    https://raw.githubusercontent.com/littlejak20/tampermonkey/main/leitstellenspiel-auswertung.js
// @downloadURL    https://raw.githubusercontent.com/littlejak20/tampermonkey/main/leitstellenspiel-auswertung.js
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('test123');

    var strLsName = 'test123456';
    var strLsStartedName = strLsName+'Started';
    var strTableSelector = 'table.table.table-striped';
    var strBackButtonSelector = strTableSelector+' + ul.pagination.pagination li.prev > a';
    var intTimeoutMilliSec = 10;
    var downloadFileName = 'Einzeltransaktionen.csv';

    console.log('strLsStartedName', localStorage.getItem(strLsStartedName));
    if (localStorage.getItem(strLsStartedName) === 'true') {
        generateCSV();
        return;
    }

    var startButtonElement = $('<a href="#">START</a>');
    startButtonElement.on('click.startButton', function(e) {
        e.preventDefault();
        localStorage.setItem(strLsName, '');
        localStorage.setItem(strLsStartedName, 'true');
        generateCSV();
    });
    $('body').append(startButtonElement);

    function generateCSV() {
        var data = localStorage.getItem(strLsName);
        if (data === null || data === undefined) data = '';

        $(strTableSelector+' tr').each((index, row) => {
            if (index <= 0) return;
            console.log('tr', index, row);

            var arrTds = $(row).find('td');

            arrTds.each((index, td) => {
                console.log('td', index, td);
                data += td.innerHTML+';';
            });
            data += '\n';
        });

        console.log(data);

        localStorage.setItem(strLsName, data);

        if ($(strBackButtonSelector).length <= 0) {
            localStorage.setItem(strLsStartedName, 'false');
            generateTextarea();
            generateCSVFile();
            return true;
        }
        setTimeout(() => {
            window.location = $(strBackButtonSelector).attr('href');
        }, intTimeoutMilliSec);
        return false;
    }

    function generateTextarea() {
        $('body').append($('<textarea>'+localStorage.getItem(strLsName)+'</textarea>'));
    }

    function generateCSVFile() {
        var strFileContent = 'data:text/csv;charset=utf-8,'+localStorage.getItem(strLsName);
        var uriFileContent = encodeURI(strFileContent);
        var downloadButtonElement = $('<a>Download</a>');
        downloadButtonElement.attr('href', uriFileContent);
        downloadButtonElement.attr('download', downloadFileName);
        $('body').append(downloadButtonElement);

    }
})();
