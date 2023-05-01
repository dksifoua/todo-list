export default class ToDoItem {
    private _id: string
    private _description: string
    private _checked: boolean

    public constructor(id: string, description: string, checked: boolean = false) {
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

    public set checked(value) {
        this._checked = value
    }
}

export type ToDoList = ToDoItem[]