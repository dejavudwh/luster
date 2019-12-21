import $ from 'jquery'
import { lusterComponent } from './components/LusterRegister'
import Luster from './luster'

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
        let comps = Luster.componentUnits
        for (let key in props) {
              if (/on[A-Z]/.test(key)) {
                if (Luster.renderTimes !== 0) {
                    break
                }
                let eventType = key.slice(2).toLocaleLowerCase()
                let val = props[key].slice(1, props[key].length - 1)
                let obj = comps[comps.length - 1]
                let element = obj[Object.keys(obj)[0]]
                console.log('event num ----------------------------', )
                $(document).on(eventType, `[data-lusterid="${id}"]`, () => { element[val]() })
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
        let comps = Luster.componentUnits
        let component
        let constructor = this.element.prototype.constructor
        let name = constructor.name
        let idx = existComponent(comps, name)
        if (idx !== -1) {
            component = comps[idx][name]
        } else {
            component = new this.element()
            comps.push({
                [name]: component
            })
        }
        console.log('exist c', comps, component)
        // console.log('will', component)
        component.componentWillCount && component.componentWillCount()
        let renderInstance = component.render()
        let compositInstance = createLusterUnit(renderInstance)
        return compositInstance.getMarkUp(id)
    }
}

function existComponent(components, name) {
    for (let i in components) {
        if (components[i].hasOwnProperty(name)) {
            return i
        }
    }

    return -1
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