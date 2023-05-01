import ToDoItem, { ToDoList } from "./model"

export default interface IToDoService {
    save(): void
    load(): void
    clear(): void
    add(item: ToDoItem): void
    remove(id: string): void
};

export class ToDoService implements IToDoService {
    private _items: ToDoList

    public constructor() {
        this._items = []
    }

    save(): void {
        localStorage.setItem("todo-list", JSON.stringify(this._items))
    }

    load(): void {
        const data: string | null = localStorage.getItem("todo-list")
        if(typeof data !== "string") return

        const parsedData = JSON.parse(data) as { _id: string, _description: string, _checked: boolean }[]
        parsedData.forEach(item => this.add(new ToDoItem(item._id, item._description, item._checked)))
    }

    clear(): void {
        this._items = []
        this.save()
    }

    add(item: ToDoItem): void {
        this._items.push(item)
        this.save()
    }

    remove(id: string): void {
        this._items = this._items.filter(item => item.id !== id)
        this.save()
    }

    public get items(): ToDoList {
        return this._items
    }
}