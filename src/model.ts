export default class ToDoItem {
    private _id: number
    private _description: string
    private _checked: boolean

    constructor(id: number, description: string, checked: boolean = false) {
        this._id = id
        this._description = description
        this._checked = checked
    }

    public get id() {
        return this._id
    }

    public get descripiton() {
        return this._description
    }

    public get checked() {
        return this._checked
    }
}

export type ToDoList = ToDoItem[]