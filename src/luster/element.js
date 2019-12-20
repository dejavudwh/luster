class Element {
    constructor(type, props) {
        this.type = type
        this.props = props
    }
}

function createElement(type, props) {
    props = props || {}
    return new Element(type, props)
}

export default createElement