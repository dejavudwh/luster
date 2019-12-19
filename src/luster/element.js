class Element {
    constructor(type, props) {
        this.type = type
        this.props = props
    }
}

function createElement(type, props, ...childrens) {
    props = props || {}
    props.childrens = childrens
    return new Element(type, props)
}

export default createElement