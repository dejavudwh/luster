let setStateQueue = []
let renderQueue = []

function enqueueSetState(newState, component) {
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

export default enqueueSetState