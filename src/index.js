import Luster from './luster/luster'
import Componenet from './luster/component'
import jsx from './luster/jsxparser/parse'
import log from './luster/utils'

class Fuck extends Componenet {
    render() {
        return jsx(`
            <div name="st">
                <span tga="asd">
                    <button>sddsff</button>
                </span>
            </div>
        `)
    }
}

// console.log('fuck type ', typeof Fuck)

// const element = Luster.createElement(Fuck, {name: 'luster', onClick: function(){ alert('1') }}, 
//                                     'hello luster', 
//                                     Luster.createElement('button', {}, '123'))                                 

// const element = Luster.createElement(jsx.type, jsx.props)

// log(element)

Luster.render(Fuck, document.getElementById('root'))