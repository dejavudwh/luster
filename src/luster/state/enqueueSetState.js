import Luster from '../luster'

let setStateQueue = []
let renderQueue = []

let defer = function(func) {
    return Promise.resolve().then(func)
}

function enqueueSetState(newState, component) {
    if (setStateQueue.length === 0) {
        defer(flushRender)
    }

    setStateQueue.push({
        newState,
        component,
    })

    let c = renderQueue.some((comp) => {
        return comp === component
    })

    if (!c) {
        renderQueue.push(component)
    }
}

function flushRender() {
    let item
    while ((item = setStateQueue.shift()) !== undefined) {
        const {
            newState,
            component,
        } = item

        if (!component.prevState) {
            component.prevState = Object.assign({}, component.state)
        }

        if (typeof newState == 'function') {
            Object.assign(component.state, newState(component.prevState, component.state))
        } else {
            Object.assign(component.state, newState)
        }
    }

    let obj = Luster.componentUnits[0]
    let app = obj[Object.keys(obj)[0]]
    Luster.nextRootIndex = 0
    Luster.renderTimes++
    Luster.render(app.render(), document.getElementById('root'))
}

export default enqueueSetState