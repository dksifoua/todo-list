import ToDoItem from "./model"
import { ToDoService } from "./service"

interface IDomTemplate {
    clear(): void
    render(): void
}

class DomTemplate implements IDomTemplate {
    private _ulElement: HTMLUListElement
    private _service: ToDoService

    public constructor() {
        this._ulElement = document.getElementById("listItems") as HTMLUListElement
        this._service = new ToDoService()
    }

    clear(): void {
        this._ulElement.innerHTML = ""
    }

    render(): void {
        this.clear()

        this._service.items.forEach((item: ToDoItem) => {
            const liElement = document.createElement("li") as HTMLLIElement
            liElement.className = "item"

            const inputElement = document.createElement("input") as HTMLInputElement
            inputElement.type = "checkbox"
            inputElement.id = item.id
            inputElement.checked = item.checked
            inputElement.addEventListener("change", () => {
                item.checked = !item.checked
            })

            const labelElement = document.createElement("label") as HTMLLabelElement
            labelElement.htmlFor = item.id
            labelElement.textContent = item.descripiton

            const buttonElement = document.createElement("button") as HTMLButtonElement
            buttonElement.className = "button"
            buttonElement.textContent = 'X'
            buttonElement.addEventListener("click", () => {
                this._service.remove(item.id)
                this.render()
            })

            this._ulElement.append(liElement)
            this._ulElement.append(inputElement)
            this._ulElement.append(buttonElement)
        })
    }    
}