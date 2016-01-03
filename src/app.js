import Router from './router'
import styles from './styles/main.styl'
import app from 'ampersand-app'

window.app = app

app.extend({
  init (){
    this.router = new Router()
    this.router.history.start()
  }
})

app.on('all', function(eventName, payload){
  console.log('got local click', arguments)
})

app.init()