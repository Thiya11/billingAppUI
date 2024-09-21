export const ERROR_MESSAGES = {
    roleErrorMessage: ` Oops! Something Went Wrong. Unable To Find Roles Try Adding Some Or Check With Our Support Team`,
    userErrorMessage:` Oops! Something Went Wrong. Unable To Find Roles Try Adding Some Or Check With Our Support Team`
}

export const INVENTORY_VISIBLE_FIELDS = [
    {label:'Inventory Id', value:'itemId'},
    {label:'Inventory Name', value:'itemName'},
    {label:'Price Per Item', value:'pricePerItem'},
    {label:'Quantity Type', value:'quantityType'},
    {label:'Tax', value:'taxes'},
    {label:'Quantity Remaining', value:'quantityRemaining'},
]

export const EXISTING_ROLES = [
    {label: 'Admin', value: 1},
    {label: 'User', value: 2},
    {label: 'Sales Person', value: 3},
    {label: 'Inventory Manager', value: 4},
    {label: 'Tellar', value: 5}
]

export const QUANTITY_TYPE_OPTIONS = [
    {label: 'Item', value:'I'},
    {label: 'kilo', value:'kg'},
    {label: 'Litre', value:'L'},
    {label: 'Piece', value:'p'}
]