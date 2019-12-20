import Luster from './luster/luster'
import Componenet from './luster/component'
import JsxParser from './luster/jsxparser/parse'
import log from './luster/utils'

let str = `
    <div name="st">
        <span tga="asd">
            <button>sdf</button>
        </span>
    </div>
`

const jsxParser = new JsxParser(str)
const jsx = jsxParser.parse(str)
// log(jsx.type, jsx.props)
// class Fuck extends Componenet {
//     render() {
//         return Luster.createElement('div', {name: 'luster2', onClick: function(){ alert('1') }}, 
//                'hello', 
//                Luster.createElement('button', {}, '123'))                                 
//     }
// }

// const element = Luster.createElement(Fuck, {name: 'luster', onClick: function(){ alert('1') }}, 
//                                     'hello luster', 
//                                     Luster.createElement('button', {}, '123'))                                 

const element = Luster.createElement(jsx.type, jsx.props)

log(element)

Luster.render(element, document.getElementById('root'))