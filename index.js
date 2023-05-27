// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:

// Input: s = "()"
// Output: true

function isValid(s) {
    if (s.length % 2 !== 0) return false

    const signs = {
        "(": ")",
        "{": "}",
        "[": "]"
    }

    const stack = []

    for (sign of s) {
        if (sign in signs) stack.push(sign)
        else if (stack.at(-1) && sign === signs[stack.at(-1)]) stack.pop()
        else {
            return false
        }
    }

    return stack.length === 0
};