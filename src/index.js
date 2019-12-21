import Luster from './luster/luster'
import Componenet from './luster/components/component'
import jsx from './luster/jsxparser/parse'
import { registered } from './luster/components/LusterRegister'

class Pape extends Componenet {
    constructor(props) {
        super(props)
        this.state = {
            text: false
        }
    }

    componentWillCount() {

    }

    componentDidMount() {
        
    }

    handleClick() {
        console.log('click   ', this.state.text)
        this.setState({
            text: !this.state.text
        })
    }

    render() {
        return jsx(`
            <div name="aaa">
                <span tga="bbb">
                    <button onClick="{handleClick}">ccc</button>
                </span>
            </div>
        `)
    }
}

registered(Pape)

class Fuck extends Componenet {
    handleClick() {
        console.log('click ', this)
    }

    render() {
        return jsx(`
            <div name="st">
                <span tga="asd">
                    asdas
                    <button onClick="{handleClick}">asd</button>
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

// const el = `
//             <div name="aaa">
//                 <span tga="bbb">
//                     <button onClick="${function asd(){console.log('asd')}}">ccc</button>
//                 </span>
//             </div>
// `

Luster.render(Fuck, document.getElementById('root'))