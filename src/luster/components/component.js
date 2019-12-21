import { registered } from './LusterRegister'

class Component {
    constructor(props) {
        this.props = props
        console.log(this)
    }

    static registered() {
        registered(this)
    }
}

export default Component