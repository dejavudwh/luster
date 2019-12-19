class Unit {
    constructor(element) {
        this.element = element
    }
}

class LusterTextUnit extends Unit {
    getMarkUp(id) {
        this._rootId = id
        return `<span data-lusterid=${id}>${this.element}</span>`
    }
}

class LusterNativeUnit extends Unit {
    getMarkUp(id) {
        console.log(id, 'id')
        this._rootId = id
        let {type, props} = this.element
        let tagStart = `<${type} `
        let tagEnd = `</${type}>`
        let contentStr = ''
        for (let key in props) {
            if (key === 'childrens') {
                contentStr = props[key].map((child, idx) => {
                    let unitInstance = createLusterUnit(child)
                    return unitInstance.getMarkUp(`${id}.${idx}`)
                }).join('')
            } else {
                tagStart += `${key}=${props[key]}`
            }
        }

        return tagStart + '>' + contentStr + tagEnd
    }
}

function createLusterUnit(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        return new LusterTextUnit(element)
    } else if (typeof element === 'object' && typeof element.type === 'string') {
        return new LusterNativeUnit(element)
    }
}

export default createLusterUnit