import '../public/css/style.css'
import ToDoService from "./service"
import DomTemplate from './template'

const initApp = (): void => {
  const service: ToDoService = new ToDoService()
  const domTemplate: DomTemplate = new DomTemplate(service)
  domTemplate.render()
}

document.addEventListener("DOMContentLoaded", initApp) 