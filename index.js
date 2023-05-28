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

// The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

// You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

// For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

// Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

// Example 1:

// Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
// Output: [-1,3,-1]
// Explanation: The next greater element for each value of nums1 is as follows:
// - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
// - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
// - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.

function nextGreaterElement(nums1, nums2) {
    const ans = []
    const stack = []
    const numbersDictionary = new Map()

    for (let i = 0; i < nums2.length; i++) {
        while (nums2[i] > stack.at(-1)) {
            numbersDictionary.set(stack.pop(), nums2[i])
        }
        stack.push(nums2[i])
    }

    for (let number of nums1) {
        if (numbersDictionary.has(number)) ans.push(numbersDictionary.get(number))
        else {
            ans.push(-1)
        }
    }
    return ans
}

// Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

// The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

// For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
// Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
// Implement the StockSpanner class:

// StockSpanner() Initializes the object of the class.
// int next(int price) Returns the span of the stock's price given that today's price is price.

// Example 1:

// Input
// ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
// [[], [100], [80], [60], [70], [60], [75], [85]]
// Output
// [null, 1, 1, 1, 2, 1, 4, 6]

// Explanation
// StockSpanner stockSpanner = new StockSpanner();
// stockSpanner.next(100); // return 1
// stockSpanner.next(80);  // return 1
// stockSpanner.next(60);  // return 1
// stockSpanner.next(70);  // return 2
// stockSpanner.next(60);  // return 1
// stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
// stockSpanner.next(85);  // return 6

// https://leetcode.com/problems/online-stock-span/description/

var StockSpanner = function () {
    this.stack = []
};

StockSpanner.prototype.next = function (price) {
    let ans = 1
    while (this.stack.length && this.stack.at(-1)[0] <= price) {
        ans += this.stack.pop()[1]
    }

    this.stack.push([price, ans])

    return ans
};