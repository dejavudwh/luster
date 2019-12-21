import enqueueSetState from '../state/enqueueSetState'
import Luster from '../luster'

class Component {
    constructor(props) {
        this.props = props
        this.state = {}
    }

    setState(newState) {
        // Object.assign(this.state, newState)
        // let obj = Luster.componentUnits[0]
        // let app = obj[Object.keys(obj)[0]]
        // Luster.nextRootIndex = 0
        // Luster.renderTimes++
        // Luster.render(app.render(), document.getElementById('root'))
        enqueueSetState(newState, this)
    }

    render() {}
}

export default Component