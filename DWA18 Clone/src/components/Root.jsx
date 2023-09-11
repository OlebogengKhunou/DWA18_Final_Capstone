export const GenderToString = (gender) => {
    switch (gender) {
        case 1:
            return 'Personal Growth';
        case 2:
            return 'True Crime and Investigative Journalism';
        case 3:
            return 'History';
        case 4:
            return 'Comedy';
        case 5:
            return 'Entertainment';
        case 6:
            return 'Business';
        case 7:
            return 'Fiction';
        case 8:
            return 'News';
        case 9:
            return 'Kids and Family';
        default:
            return 'Unknown, ';
    }
};