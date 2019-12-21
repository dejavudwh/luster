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
        Luster.render(this.constructor, document.getElementById('root'))
    }

    render() {}
}

export default Component