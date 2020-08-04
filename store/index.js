import categoriesQuery from '~/apollo/queries/category/categories'
import settingsQuery from '~/apollo/queries/setting/settings'  
import layoutQuery from '~/apollo/queries/setting/layout' 
import menusQuery from '~/apollo/queries/menu/menus'
import widgetsQuery from '~/apollo/queries/widget/widgets'
import homepageQuery from '~/apollo/queries/article/article-home'
import templatesQuery from '~/apollo/queries/template/templates'
import themesQuery from '~/apollo/queries/theme/themes-names'
import iconsQuery from '~/apollo/queries/icon/icons'
export const strict = false

export const state = () => ({
    settings: null,
    layout: null,
    original_layout: null,
    themes: null,
    theme: null,
    menus: [],
    widgets: [],
    categories: null,
    homepage: null,
    theme_preview: null,
    templates: null,
    current_template: null,
    icons: null
})

export const mutations = {
    SET_SETTINGS ( state , settings ){
        state.settings = settings
    },
    SET_LAYOUT ( state , layout ){
        state.layout = layout
    },
    SET_THEMES ( state , themes ){
        state.themes = themes
    },
    SET_THEME ( state , theme ){
        state.theme = theme 
    },
    SET_MENUS ( state , menus ){
        state.menus = menus
    },
    SET_WIDGETS ( state , widgets ){
        state.widgets = widgets
    },
    SET_CATEGORIES ( state , categories ){
        state.categories = categories
    },
    SET_HOMEPAGE ( state , homepage ){
        state.homepage = homepage
    },
    SET_THEME_PREVIEW ( state , theme ){
        state.theme_preview = theme
    },
    SET_TEMPLATES ( state , templates ){
        state.templates = templates
    },
    SET_CURRENT_TEMPLATE ( state , template ){
        state.current_template = template
    },
    SET_ORIGINAL_LAYOUT ( state , layout ){
        state.original_layout = layout
    },
    SET_ICONS ( state , icons ){
        state.icons = icons
    }
}

export const actions = {
    async loadCategories ( { commit } ) {
        const response = await this.app.apolloProvider.defaultClient.query( { query : categoriesQuery })
        commit ( 'SET_CATEGORIES' , response.data.categories )
    },
    async loadSettings ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query( { query : settingsQuery })
        commit ( 'SET_SETTINGS' , response.data.setting )
        const theme = await this.$axios.get ( 'themes?id=' + response.data.setting.current_theme.theme.id )
        commit ( 'SET_THEME' , theme.data[0] )
        const w = await this.$axios.get ( 'widgets' )
        commit ( 'SET_WIDGETS' , w.data )
        
    },
    async loadLayout ( { commit } ){
        //const response = await this.app.apolloProvider.defaultClient.query( { query : layoutQuery })
        const response = await this.$axios.get ( 'layout' )
        commit ( 'SET_LAYOUT' , response.data )
        commit ( 'SET_ORIGINAL_LAYOUT' , response.data )
    },
    async loadMenus ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query( { query : menusQuery })
        commit ( 'SET_MENUS' , response.data.menus )
    },
    async loadWidgets ( { commit , axios } ){
        const response = await this.$axios.get ( 'widgets' )
        commit ( 'SET_WIDGETS' , response.data) //widgets )
    },
    async loadHomepage ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query( { query : homepageQuery } )
        commit ( 'SET_HOMEPAGE' , response.data.articles[0] )
    },
    async loadThemes ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query( { query : themesQuery } )
        commit ( 'SET_THEMES' , response.data.themes )
    },
    async loadIcons ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query( { query : iconsQuery } )
        commit ( 'SET_ICONS' , response.data.icons )
    },
    async changeTheme ( { commit } , id ){
        const theme = await this.$axios.get ( 'themes?id=' + id )
        commit ( 'SET_THEME' , theme.data[0] )
    },
    async changeSettings ( { commit } , settings ){
        commit ( 'SET_SETTINGS' , settings )
    },
    async loadTemplates ( { commit } ){
        const response = await this.app.apolloProvider.defaultClient.query ( { query : templatesQuery } )
        commit ( 'SET_TEMPLATES' , response.data.templates ) 
    },
    current_template ( { commit } , template ){
        commit ( 'SET_CURRENT_TEMPLATE' , template )
    },
    darkMode ( { commit } , layout ){
        commit ( 'SET_LAYOUT' , layout )
    },
    darkTheme ( { commit } , theme ){
        commit ( 'SET_THEME' , theme )
    },
    async reloadTheme ( { commit } , id ){
        const theme = await this.$axios.get ( 'themes?id=' + id )
        commit ( 'SET_THEME' , theme.data[0] )
    },
    async layout ( { commit} ){
        const response = await this.$axios.get ( 'layout' )
        commit ( 'SET_LAYOUT' , response.data )
    },
    themePreview ( { commit } , theme ){
        commit ( 'SET_THEME_PREVIEW' , theme )
    }
}

export const getters = {
    template : state => state.current_template ,
    theme : state => state.layout, //state.settings.layout.json.theme
    original_layout : state => state.original_layout
}