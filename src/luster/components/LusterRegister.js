export let lusterComponent = {}

export function registered(component) {
    console.log('reg', component.prototype.constructor.name)
    let instance = component.prototype.constructor
    let key = instance.name
    let obj = {
        [key]: instance
    }
    Object.assign(lusterComponent, obj)
}
