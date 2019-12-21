import { registered } from './LusterRegister'
import enqueueSetState from '../state/enqueueSetState'

class Component {
    constructor(props) {
        this.props = props
    }

    setState(newState) {
        enqueueSetState(newState, this)
    }

    static registered() {
        registered(this)
    }
}

export default Component