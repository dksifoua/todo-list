import ToDoItem, { ToDoList } from "./model"

export interface IToDoService {
    save(): void
    load(): void
    clear(): void
    add(item: ToDoItem): void
    remove(id: string): void
};

export default class ToDoService implements IToDoService {
    private _items: ToDoList

    public constructor() {
        this._items = []
    }

    save(): void {
        console.log("Save the to-do list from the local storage")
        
        localStorage.setItem("todo-list", JSON.stringify(this._items))
        
        console.log(this._items)
    }

    load(): void {
        console.log("Load the to-do list from the local storage")

        const data: string | null = localStorage.getItem("todo-list")
        if(typeof data !== "string") return

        const parsedData = JSON.parse(data) as { _id: string, _description: string, _checked: boolean }[]
        parsedData.forEach(item => this.add(new ToDoItem(item._id, item._description, item._checked)))
        
        console.log(this._items)
    }

    clear(): void {
        console.log("Clear the to-do list")

        this._items = []
        this.save()
    }

    add(item: ToDoItem): void {
        console.log("Add an item into the to-do list")

        this._items.push(item)
        this.save()
    }

    remove(id: string): void {
        console.log("Remove an item into the to-do list")

        this._items = this._items.filter(item => item.id !== id)
        this.save()
    }

    public get items(): ToDoList {
        return this._items
    }
}