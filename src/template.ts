import ToDoItem from "./model"
import ToDoService from "./service"

export interface IDomTemplate {
    clear(): void
    render(): void
}

export default class DomTemplate implements IDomTemplate {
    private _ulElement: HTMLUListElement
    private _service: ToDoService

    public constructor(service: ToDoService) {
        this._ulElement = document.getElementById("listItems") as HTMLUListElement
        this._service = service

        const formElement = document.getElementById("itemEntryForm") as HTMLFormElement
        formElement.addEventListener("submit", (event: SubmitEvent): void => {
            event.preventDefault()

            const inputElement = document.getElementById("newItem") as HTMLInputElement
            const inputElementText: string = inputElement.value.trim()
            console.log(inputElementText)
            if (!inputElementText.length) return

            const item: ToDoItem = new ToDoItem((this._service.items.length + 1).toString(), inputElementText)

            this._service.add(item)
        })
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

            liElement.append(inputElement)
            liElement.append(labelElement)
            liElement.append(buttonElement)

            this._ulElement.append(liElement)
        })
    }    
}