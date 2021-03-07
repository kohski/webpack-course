import _ from 'lodash'
import { NAME, power } from './utilities'// jsファイルは拡張子を省略可能, 定数も可能
console.log(power(11))
console.log(NAME)

// import * as utilities from './utilities'; // *で全部importが可能
// console.log(utilities.power(11))
// console.log(utilities.NAME)

// import { NAME as NAME_OF_KIM, power } from './utilities'// {}内でもasが可能 => 名前衝突の回避
// console.log(power(11))
// console.log(NAME_OF_KIM)

// import Linon from './utilities' // default export
// console.log(Linon.say())

// import Tiger from './utilities' // default exportは別名で問題ない
// console.log(Tiger.say())


function component () {
  const element = document.createElement('div')
  const array = ['Hello', 'webpack', '!!!']
  element.innerHTML = _.join(array, ' ')
  return element
}

document.body.appendChild(component())