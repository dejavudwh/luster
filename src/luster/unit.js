import $ from 'jquery'
import { lusterComponent } from './components/LusterRegister'

class Unit {
    constructor(element) {
        this.element = element
    }
}

class LusterTextUnit extends Unit {
    getMarkUp(id) {
        this._rootId = id
        return `<span data-lusterid="${id}">${this.element}</span>`
    }
}

class LusterNativeUnit extends Unit {
    getMarkUp(id) {
        this._rootId = id
        let {type, props} = this.element
        let tagStart = `<${type} data-lusterid="${id}"`
        let tagEnd = `</${type}>`
        let contentStr = ''
        for (let key in props) {
            if (/on[A-Z]/.test(key)) {
                let eventType = key.slice(2).toLocaleLowerCase()
                $(document).on(eventType, `[data-lusterid="${id}"]`, props[key])
            } else if (key === 'childrens') {
                contentStr = props[key].map((child, idx) => {
                    if (lusterComponent.hasOwnProperty(child.type)) {
                        child = lusterComponent[child.type]
                    }
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

class LusterCompositUnit extends Unit {
    getMarkUp(id) {
        this._rootId = id
        let component = new this.element()
        component.componentWillCount && component.componentWillCount()
        let renderInstance = component.render()
        let compositInstance = createLusterUnit(renderInstance)
        return compositInstance.getMarkUp(id)
    }
}

function createLusterUnit(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        return new LusterTextUnit(element)
    } else if (typeof element === 'object' && typeof element.type === 'string') {
        return new LusterNativeUnit(element)
    } else if (typeof element === 'function') {
        return new LusterCompositUnit(element)
    }
}

export default createLusterUnit