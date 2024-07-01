function Queue() {

    // Initialize the queue (implemented with an array)
    let items = [];

    // Insert an element into the queue (at the tail)
    this.push = function (element) {
        items.push(element);
    }

    // Remove and return an element from the queue (from the head)
    this.pop = function () {
        return items.shift();
    }

    // View the first element in the queue (the element at index 0 in the array)
    this.front = function () {
        if (items.length === 0) {
            return undefined;
        }
        return items[0];
    }

    // View the last element in the queue
    this.back = function () {
        if (items.length === 0) {
            return undefined;
        }
        return items[items.length - 1];
    }

    // Check if the queue is empty, return true if empty, otherwise return false
    this.isEmpty = function () {
        return items.length === 0;
    }

    // Find the index of the first element that satisfies a condition
    this.indexSatisfy = function (condition) {
        for (let i = 0; i < items.length; i++) {
            if (condition(items[i])) {
                return i;
            }
        }
        return -1;
    }

    // Remove an element by its index
    this.removeElementByIndex = function (index) {
        if (index >= 0 && index < items.length) {
            items.splice(index, 1);
        }
    }

    // Remove the first element that satisfies a condition
    this.removeElementByCondition = function (condition) {
        let index = this.indexSatisfy(condition);
        if (index !== -1) {
            this.removeElementByIndex(index);
        }
    }

    // Get the length of the queue
    this.size = function () {
        return items.length;
    }

    // Clear the queue
    this.clear = function () {
        while (!this.isEmpty()) {
            this.pop();
        }
    }

    // View the queue
    this.print = function () {
        // Return as a string
        return items.toString();
    }
}

// Repeat a string n times and return the result
function string_repeat(target, n) {
    let s = target, total = "";
    while (n > 0) {
        if (n % 2 === 1) {
            total += s;
        }
        if (n === 1) {
            break;
        }

        s += s;
        n = n >> 1;
    }
    return total;
}

// Generate a random number between minNum and maxNum
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

let LoginUI = !!window.LoginUI || {};

// Get the viewport width
LoginUI.getViewportWidth = function () {
    let width = 0;
    if (document.documentElement && document.documentElement.clientWidth) {
        width = document.documentElement.clientWidth;
    } else if (document.body && document.body.clientWidth) {
        width = document.body.clientWidth;
    } else if (window.innerWidth) {
        width = window.innerWidth - 18;
    }
    return width;
}

// Get the viewport height
LoginUI.getViewportHeight = function () {
    let height = 0;
    if (window.innerHeight) {
        height = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        height = document.documentElement.clientHeight;
    } else if (document.body && document.body.clientHeight) {
        height = document.body.clientHeight;
    }
    return height;
}

// Get the horizontal scroll position
LoginUI.getViewportScrollX = function () {
    let scrollX = 0;
    if (document.documentElement && document.documentElement.scrollLeft) {
        scrollX = document.documentElement.scrollLeft;
    } else if (document.body && document.body.scrollLeft) {
        scrollX = document.body.scrollLeft;
    } else if (window.pageXOffset) {
        scrollX = window.pageXOffset;
    } else if (window.scrollX) {
        scrollX = window.scrollX;
    }
    return scrollX;
}

// Get the vertical scroll position
LoginUI.getViewportScrollY = function () {
    let scrollY = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollY = document.documentElement.scrollTop;
    } else if (document.body && document.body.scrollTop) {
        scrollY = document.body.scrollTop;
    } else if (window.pageYOffset) {
        scrollY = window.pageYOffset;
    } else if (window.scrollY) {
        scrollY = window.scrollY;
    }
    return scrollY;
}

// Display a message tip at the bottom of the viewport
function scrollMsgTip_just_for_bottom(id) {
    document.getElementById(id).style.display = "block";

    let t = LoginUI.getViewportHeight() +
        LoginUI.getViewportScrollY() - document.getElementById(id).offsetHeight;

    document.getElementById(id).style.top = t + "px";
}

// Display a message tip and adjust its position based on certain conditions
function scrollMsgTip(id) {
    let t = LoginUI.getViewportHeight() +
        LoginUI.getViewportScrollY() - document.getElementById(id).offsetHeight;
    let building_bottom = document.getElementById('g-building').offsetHeight + document.getElementById('g-building').offsetTop;
    if (t > building_bottom) {
        t = building_bottom;
    }
    document.getElementById(id).style.top = t + "px";
}

let pin_to_bottom_elements_ids = [];

// Pin an element to the bottom
function pin_element_to_bottom(id) {
    pin_to_bottom_elements_ids.push(id);
    scrollMsgTip(id);
}

// Pin all elements to the bottom
function pin_to_bottom_elements() {
    for (let i = 0; i < pin_to_bottom_elements_ids.length; i++) {
        scrollMsgTip(pin_to_bottom_elements_ids[i]);
    }
}

window.onload = pin_to_bottom_elements;
window.onscroll = pin_to_bottom_elements;
window.onresize = pin_to_bottom_elements;
