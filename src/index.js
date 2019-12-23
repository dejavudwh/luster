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
    constructor(props) {
        super(props)
        this.state = {
            text: false,
            name: 'yim',
            classname: 'classname',
            handle: 'handleClick',
        }
    }

    handleClick2() {
        console.log('click 2222 ', this.state)
    }

    handleClick() {
        console.log('click ', this.state)
        this.setState({
            text: !this.state.text,
            name: 'dejavudwh',
            classname: 'classname2',
            handle: 'handleClick2',
        })
    }

    render() {
        return jsx(`
            <div name="st">
                <span tga="asd">
                    <span>vbvbvb</span>
                    <button onClick="{${this.state.handle}}">${this.state.text}</button>
                </span>
                <div>
                    <button class="${this.state.classname}">ds</button>
                </div>
                <span>${this.state.name}</span>
                <button onClick="{handleClick}">bbbbb</button>
                <Pape></Pape>
            </div>
        `)
    }
}

registered(Fuck)

class App extends Componenet {
    render() {
        return jsx(`
            <Router>
                <Route path='/home' component="{Fuck}"></Route>
            </Router>
        `)
    }
}


Luster.render(Fuck, document.getElementById('root'))