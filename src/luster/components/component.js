import enqueueSetState from '../state/enqueueSetState'

class Component {
    constructor(props) {
        this.props = props
        this.state = {}
    }

    setState(newState) {
        enqueueSetState(newState, this)
    }

    render() {}
}

export default Component