export const MONTH_LIST                      = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const BILL_GEN_VISIBILE_FIELDS        = ['Id', 'Name', 'Category', 'Price Per Quantity (₹)', 'Quantity Type', 'Quantity', 'Price (₹)', 'Tax (%)', 'Quick Actions'];
export const TRANSACTION_INFO_VISIBLE_FIELDS = ['Item Id', 'Item Name', 'Category Id', 'Price Per Quantity (₹)', 'Quantity Type', 'Tax (₹)', 'Quantity', 'Price (₹)'];

export const ERROR_MESSAGES = {
    roleErrorMessage: ` Oops! Something Went Wrong. Unable To Find Roles Try Adding Some Or Check With Our Support Team`,
    userErrorMessage:` Oops! Something Went Wrong. Unable To Find Roles Try Adding Some Or Check With Our Support Team`
}

export const INVENTORY_VISIBLE_FIELDS = [
    {label:'Inventory Id', value:'itemId'},
    {label:'Inventory Name', value:'itemName'},
    {label:'Category', value:'category'},
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

export const QUANTITY_CATEGORY_LIST = [
    {label:"Cake", value: 1},
    {label:"All", value:0},
    {label:"Others", value:2},
    {label:"Diary", value:3}
]

export const GRAPH_COMMON_TIME_RANGE = [
    {label: 'This Week', value:1},
    {label: 'Last Week', value:2},
    {label: 'This Month', value:3},
    {label: 'Last Month', value:4},
    {label: 'Last 3 Months', value:5},
    {label: 'Last 6 Months', value: 6},
    {label: 'This Year', value:7},
    {label: 'Last Year', value:8}
];