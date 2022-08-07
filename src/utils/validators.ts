export function isValidEmail(email: string) {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
}

export function isAllNumeric(s: string) {
    return /^\d+$/.test(s);
}

export function lengthOf(s: string, removeWhiteSpaces = true) {
    if (removeWhiteSpaces === true) s = s.replace(/ /g, '');
    return {
        isLessThan: (n: number) => {
            return s.length < n;
        },
        isGreaterThan: (n: number) => {
            return s.length > n;
        },
        is: (n: number) => {
            return s.length === n;
        },
        isNot: (n: number) => {
            return s.length !== n;
        },
    };
}