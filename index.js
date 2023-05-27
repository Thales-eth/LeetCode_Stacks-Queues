// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:

// Input: s = "()"
// Output: true

// https://leetcode.com/problems/valid-parentheses/description/

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

// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

// Note that after backspacing an empty text, the text will continue empty.

// Example 1:

// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".

// https://leetcode.com/problems/backspace-string-compare/

function backspaceCompare(s, t) {

    const getSentence = string => {
        const stack = []
        for (let letter of string) {
            if (letter === "#") stack.pop()
            else {
                stack.push(letter)
            }
        }
        return stack.join("")
    }
    return getSentence(s) === getSentence(t)
};

// Given a string path, which is an absolute path(starting with a slash '/') to a file or directory in a Unix - style file system, convert it to the simplified canonical path.

// In a Unix - style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes(i.e. '//') are treated as a single slash '/'.For this problem, any other format of periods such as '...' are treated as file / directory names.

// The canonical path should have the following format:

// The path starts with a single slash '/'.
// Any two directories are separated by a single slash '/'.
// The path does not end with a trailing '/'.
// The path only contains the directories on the path from the root directory to the target file or directory(i.e., no period '.' or double period '..')
// Return the simplified canonical path.

// Example 1:

// Input: path = "/home/"
// Output: "/home"
// Explanation: Note that there is no trailing slash after the last directory name.

// https://leetcode.com/problems/simplify-path/description/

function simplifyPath(path) {
    const stack = []
    const subdirectories = path.split("/")
    for (sub of subdirectories) {
        if (sub === "..") stack.pop()
        else if (sub !== "" && sub !== ".") {
            stack.push(sub)
        }
    }
    return "/" + stack.join("/")
}

// Given a string s of lower and upper case English letters.

// A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:

// 0 <= i <= s.length - 2
// s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
// To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.

// Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

// Notice that an empty string is also good.



// Example 1:

// Input: s = "leEeetcode"
// Output: "leetcode"
// Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".

// https://leetcode.com/problems/make-the-string-great/description/

function makeGood(s) {
    const stack = []
    for (letter of s) {
        if (stack.length && letter.toLowerCase() === stack.at(-1).toLowerCase() && letter !== stack.at(-1)) stack.pop()
        else {
            stack.push(letter)
        }
    }
    return stack.join("")
};

// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

// Implement the MovingAverage class:

// MovingAverage(int size) Initializes the object with the size of the window size.
// double next(int val) Returns the moving average of the last size values of the stream.

// Example 1:

// Input
// ["MovingAverage", "next", "next", "next", "next"]
// [[3], [1], [10], [3], [5]]
// Output
// [null, 1.0, 5.5, 4.66667, 6.0]

// Explanation
// MovingAverage movingAverage = new MovingAverage(3);
// movingAverage.next(1); // return 1.0 = 1 / 1
// movingAverage.next(10); // return 5.5 = (1 + 10) / 2
// movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
// movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3

// https://leetcode.com/problems/moving-average-from-data-stream/description/

var MovingAverage = function (size) {
    this.queue = []
    this.size = size
    this.acc = 0
};

MovingAverage.prototype.next = function (val) {
    if (this.queue.length === this.size) {
        this.acc -= this.queue.shift()
    }
    this.acc += val
    this.queue.push(val)
    return this.acc / this.queue.length
};