//store for the repo collection
// a collection is an observable array of stuff.

import Collection from 'ampersand-rest-collection'
import Repo from './repo'
import githubMixin from '../helpers/github-mixin'


//takes plain model and turns it into a collection
export default Collection.extend(githubMixin, {

  //give it a url so we can call fetch, also need to send auth headers with it
  url: 'https://api.github.com/user/repos',

  model: Repo
})