export const songReducer = (songs, action) => {
    switch (action.type) {
        case "ADD":
            return [...songs, {
                title: action.title,
                id: songs.length,
            }];
        default:
            return [...songs];
    }
};