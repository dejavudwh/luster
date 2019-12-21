export let lusterComponent = {}

export function registered(component) {
    let instance = component.prototype.constructor
    let key = instance.name
    let obj = {
        [key]: instance
    }
    Object.assign(lusterComponent, obj)
}
