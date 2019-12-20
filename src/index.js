import Luster from './luster/luster'
import Componenet from './luster/component'
import JsxParser from './luster/jsxparser/parse'

let str = `
    <div name="st">
        <span tga="asd">
            <p>sdf</p>
        </span>
    </div>
`

const jsxParser = new JsxParser(str)
const jsx = jsxParser.parse(str)
console.log(JSON.stringify(jsx, null, 2))

class Fuck extends Componenet {
    render() {
        return Luster.createElement('div', {name: 'luster2', onClick: function(){ alert('1') }}, 
               'hello', 
               Luster.createElement('button', {}, '123'))                                 
    }
}

const element = Luster.createElement(Fuck, {name: 'luster', onClick: function(){ alert('1') }}, 
                                    'hello luster', 
                                    Luster.createElement('button', {}, '123'))                                 
Luster.render(element, document.getElementById('root'))