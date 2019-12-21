import Luster from './luster/luster'
import Componenet from './luster/components/component'
import jsx from './luster/jsxparser/parse'
import { registered } from './luster/components/LusterRegister'

class Pape extends Componenet {
    componentWillCount() {
        console.log('pape 将要挂载')
    }

    render() {
        return jsx(`
            <div name="aaa">
                <span tga="bbb">
                    <button>ccc</button>
                </span>
            </div>
        `)
    }
}

registered(Pape)

class Fuck extends Componenet {
    render() {
        return jsx(`
            <div name="st">
                <span tga="asd">
                    asdas
                    <Pape></Pape>
                </span>
            </div>
        `)
    }
}

registered(Fuck)

console.log('fuck type ', Fuck.prototype.constructor.name)

// const element = Luster.createElement(Fuck, {name: 'luster', onClick: function(){ alert('1') }}, 
//                                     'hello luster', 
//                                     Luster.createElement('button', {}, '123'))                                 

// const element = Luster.createElement(jsx.type, jsx.props)

// log(element)

Luster.render(Fuck, document.getElementById('root'))