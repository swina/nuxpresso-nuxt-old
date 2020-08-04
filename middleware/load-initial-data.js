import RSVP from 'rsvp'

export default async function ( { store , from } ){
    let isInitialPageLoad = !from;
    //if(isInitialPageLoad){
        await RSVP.all([
            store.dispatch ( 'loadSettings' ),
            store.dispatch ( 'loadMenus' ),
            store.dispatch ( 'loadTemplates' ),
            store.dispatch ( 'loadHomepage' )
            //store.dispatch ( 'loadWidgets' ),
            /*
            store.dispatch ( 'loadLayout' ),
            store.dispatch ( 'loadCategories' ),
            store.dispatch ( 'loadIcons' ),
            store.dispatch ( 'loadThemes' )
            */
        ])
    //}
}