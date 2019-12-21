import enqueueSetState from '../state/enqueueSetState'
import Luster from '../luster'

class Component {
    constructor(props) {
        this.props = props
        this.state = {}
    }

    setState(newState) {
        // enqueueSetState(newState, this)
        Object.assign(this.state, newState)
        console.log('cps ',Luster.componentUnits)
        let obj = Luster.componentUnits[0]
        let app = obj[Object.keys(obj)[0]]
        // Luster.componentUnits = []
        console.log('app ', app)
        Luster.nextRootIndex = 0
        Luster.renderTimes++
        Luster.render(app.render(), document.getElementById('root'))
    }

    render() {}
}

export default Component