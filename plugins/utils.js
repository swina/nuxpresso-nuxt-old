import Vue from 'vue'
import moment from 'moment'
import NuxpressoIcon from '@/components/widgets/Icon'
import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoLogin from '@/components/widgets/Login'

Vue.component ( 'NuxpressoIcon' , NuxpressoIcon )
Vue.component ( 'NuxpressoWidget' , NuxpressoWidget )
Vue.component ( 'NuxpressoLogin' , NuxpressoLogin )
const baseURL = 'https://js.api.here.com/v3/3.1/'
const src = 'mapsjs.bundle.js' //'mapsjs-core.js','mapsjs-service.js','mapsjs-ui.js','mapsjs-mapevents.js']
const styles = 'mapsjs-ui.css'




const tones = {
    extralight : 100 ,
    verylight : 200 ,
    mediumlight: 300 ,
    light: 400 ,
    normal: 500 ,
    mediumdark: 600 ,
    dark: 700 ,
    verydark: 800 ,
    extradark: 900 
}

function colorTones( suf = 'fg' , color , tone ){
    let pref = suf === 'fg' ? 'text' : 'bg'
    if ( color != 'transparent' && color != 'black' && color != 'white' ) {
        return pref + '-' + color + '-' + tones[tone]
    } else {
        return pref + '-' + color
    }
}

Vue.prototype.$moment = function ( d= new Date ) {
    return moment ( d ).format ( 'MM-DD-YYYY')
}

Vue.prototype.$slugify = function ( text = '' ){
    return text.toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'') 
}


Vue.prototype.$colorClass = function ( pref = 'bg' , color , tone ){

    if ( color != 'transparent' && color != 'black' && color != 'white' ) {

        return pref + '-' + color + '-' + tones[tone]
    } else {
        return pref + '-' + color
    }

}

Vue.prototype.$colorize = function ( theme , element  ){
    return theme[element] ? colorTones ( element.split('_')[1] , theme[element].color , theme[element].density ) : ''
}


Vue.prototype.$menuLink = function ( item ){
    if ( !item ) return null
    return item.article ?
        '/articles/' + item.article.slug :
            item.category ? '/categories/' + item.category.slug :
                item.link_url ? item.link_url : false
}

/* used for vue-here-map */
Vue.prototype.$loadMapScript = function ( ) { // eslint-disable-line no-param-reassign
    return new Promise(function (resolve, reject) {
        if (document.querySelector('script[src="' + baseURL + src + '"]')) {
            resolve();
            return;
        }

        const el = document.createElement('SCRIPT');

        el.src = baseURL + src;
        el.defer = true
        el.async = true;
        el.type = 'module';

        el.addEventListener('load', resolve);
        el.addEventListener('error', reject);
        el.addEventListener('abort', reject);

        document.head.appendChild(el);
        let hereMapStyle = document.createElement('LINK')
        let url = baseURL + styles
        hereMapStyle.setAttribute('href' , url )
        hereMapStyle.setAttribute( 'rel' , 'stylesheet' )
        hereMapStyle.setAttribute( 'type' , 'text/css' )
        document.head.appendChild(hereMapStyle)
    });
  };

