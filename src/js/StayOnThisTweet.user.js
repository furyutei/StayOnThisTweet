// ==UserScript==
// @name            Stay on this tweet !
// @name:ja         このツイートに留まって！
// @namespace       https://furyutei.work
// @license         MIT
// @version         0.0.2
// @description     Suppress clicking on the body of a reply tweet to go back to the source of the mention.
// @description:ja  返信ツイートを表示したとき、本文をクリックすると言及元に戻ってしまうのを抑制
// @author          furyu
// @match           https://twitter.com/*
// @match           https://mobile.twitter.com/*
// @grant           none
// @compatible      chrome
// @compatible      firefox
// @supportURL      https://github.com/furyutei/StayOnThisTweet/issues
// @contributionURL https://memo.furyutei.work/about#%E6%B0%97%E3%81%AB%E5%85%A5%E3%81%A3%E3%81%9F%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%81%AE%E3%81%8A%E6%B0%97%E6%8C%81%E3%81%A1%E3%81%AF%E3%82%AE%E3%83%95%E3%83%88%E5%88%B8%E3%81%A7
// ==/UserScript==

( async () => {
'use strict';

const
    SCRIPT_NAME = 'StayOnThisTweet',
    
    log_debug = ( ... args ) => {
        console.debug( '%c[' + SCRIPT_NAME + '] ' + new Date().toISOString(), 'color: gray;', ... args );
    },
    
    log = ( ... args ) => {
        console.log( '%c[' + SCRIPT_NAME + '] ' + new Date().toISOString(), 'color: teal;', ... args );
    },
    
    log_error = ( ... args ) => {
        console.error( '%c[' + SCRIPT_NAME + '] ' + new Date().toISOString(), 'color: purple;', ... args );
    };

document.body.addEventListener( 'click', ( event ) => {
    const
        target_element = event.target;
    
    if ( ! target_element || target_element.nodeType != Node.ELEMENT_NODE ) {
        return;
    }
    
    switch ( target_element.tagName ) {
        case 'DIV' :
            break;
        case 'SPAN' :
            if ( target_element.parentNode.tagName != 'DIV' ) {
                return;
            }
            break;
        default :
            return;
    }
    
    if ( target_element.closest( 'a, div[role="blockquote"]' ) ) {
        return;
    }
    
    const
        article = target_element.closest( 'article[role="article"]' );
    
    if ( ! article ) {
        return;
    }
    
    if ( article.querySelector( 'a[role="link"] time' ) ) {
        return;
    }
    
    event.stopPropagation();
    
    log_debug( 'Page back was suppressed', target_element );
}, true );

} )();
