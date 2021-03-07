import _ from 'lodash'
import style from './style.css'
console.log(style.toString())

function component () {
  const element = document.createElement('div')
  const array = ['Hello', 'webpack', '!!!']
  element.innerHTML = _.join(array, ' ')
  return element
}

document.body.appendChild(component())
document.body.classList.add('haikei')
