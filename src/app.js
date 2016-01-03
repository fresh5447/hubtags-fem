import Router from './router'
import styles from './styles/main.styl'
import app from 'ampersand-app'
import Me from './models/me'

window.app = app

app.extend({
  init (){
    this.me = new Me()
    this.router = new Router()
    this.router.history.start()
  }
})

app.on('all', function(eventName, payload){
  console.log('got local click', arguments)
})

app.init()