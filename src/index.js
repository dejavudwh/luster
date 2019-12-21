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
        // console.log('click   ', this.state.text)
        for (let i = 0;i < 10; i++) {
            console.log(i)
            this.setState({
                text: !this.state.text
            })
        }
    }

    render() {
        return jsx(`
            <div name="aaa">
                <span tga="bbb">
                     zxc
                    <button onClick="{handleClick}">${this.state.text}</button>
                </span>
                <div id="asd">
                </div>
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
                    <span>qqq</span>
                    <button onClick="{handleClick}">asd</button>
                </span>
                <div>
                </div>
            </div>
        `)
    }
}

registered(Fuck)

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