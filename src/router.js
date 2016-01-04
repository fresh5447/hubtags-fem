import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import qs from 'qs'
import xhr from 'xhr'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import Layout from './layout'

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if(opts.layout){
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
        )
    }
    React.render(page, document.body)
  },

  routes: {
    '': 'public',
    'repos': 'repos',
    'logout': 'logout',
    'login': 'login',
    'auth/callback?:query': 'authCallback'
  },

  public (){
    this.renderPage(<PublicPage/>, {layout: false})
  },

  repos (){
    this.renderPage(<ReposPage repos={app.me.repos}/>)
  },

  login (){
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: '4217a98f9d30c2b5f418',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo'
    })
  },

  logout (){
    window.localStorage.clear()
    window.location = '/'
  },

  authCallback (query){
    query = qs.parse(query)
    console.log(query)

    xhr({
      url: 'https://labelr-localhost.herokuapp.com/authenticate/' + query.code,
      json: true
    }, (err, req, body) => {
      console.log(body)
      app.me.token = body.token
      this.redirectTo('/repos')
    })
  }
})