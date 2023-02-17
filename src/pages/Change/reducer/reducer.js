
const list = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return state.concat([{ title: action.title }])
        case 'REMOVE_ITEM':
            return state.map((item, index) =>
                action.index === index
                    ? { title: item.title }
                    : item)
        default:
            return state
    }
}
const listManager = (state = {}, action) => {
    return {
        list: list(state.list, action),
    }
}