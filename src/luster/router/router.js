import Component from '../components/component'
import Luster from '../luster'
import { lusterComponent } from '../components/LusterRegister'
import createLusterUnit from '../unit'

class Router extends Component {
    assemblyRouting(childrens) {
        console.log('render url', childrens)
        for (let i = 0; i < childrens.length; i++) {
            let c = childrens[i].props
            let path = c['path']
            console.log('render path ', c, path, window.location.pathname, path.includes(window.location.pathname))
            if (window.location.pathname.includes(path)) {
                let cn = c['component']
                let name = cn.slice(1, cn.length - 1)
                let component
                if (lusterComponent.hasOwnProperty(name)) {
                    component = lusterComponent[name]
                }
                // console.log('render ==== ', name, component)
                
                return component
            }
        }
        // childrens.forEach((child) => {
        //     this.assemblyRouting(child)
        // })
    }

    render() {
        let childrens = this.props.props.childrens
        let component = this.assemblyRouting(childrens)
        let unitInstance = createLusterUnit(component)
        let markUp = unitInstance.getMarkUp(Luster.nextRootIndex)
    
        return markUp
    }
}

export default Router