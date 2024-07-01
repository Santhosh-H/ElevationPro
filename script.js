// script.js

class Elevator {
    constructor(id, initialFloor = 0) {
        this.id = id;
        this.currentFloor = initialFloor;
        this.queue = [];
        this.moving = false;
        this.element = document.getElementById(`elevator-${id}`);
        this.updatePosition();
    }

    updatePosition() {
        const floorHeight = 100; // adjust based on your floor height
        const bottomPosition = this.currentFloor * floorHeight;
        this.element.style.bottom = `${bottomPosition}px`;
    }

    addRequest(floor) {
        if (!this.queue.includes(floor)) {
            this.queue.push(floor);
            this.processQueue();
        }
    }

    processQueue() {
        if (this.moving) return;
        if (this.queue.length > 0) {
            const nextFloor = this.queue.shift();
            this.moveToFloor(nextFloor);
        }
    }

    moveToFloor(floor) {
        this.moving = true;
        const moveTime = Math.abs(this.currentFloor - floor) * 1000;
        setTimeout(() => {
            this.currentFloor = floor;
            this.updatePosition();
            this.moving = false;
            this.processQueue();
        }, moveTime);
    }
}

const elevators = [
    new Elevator(1, 0),
    new Elevator(2, 0),
];

function callElevator(floor) {
    // Find the closest available elevator
    let closestElevator = null;
    let minDistance = Infinity;
    elevators.forEach(elevator => {
        const distance = Math.abs(elevator.currentFloor - floor);
        if (distance < minDistance && elevator.queue.length === 0) {
            minDistance = distance;
            closestElevator = elevator;
        }
    });

    if (closestElevator) {
        closestElevator.addRequest(floor);
    } else {
        // If no elevator is available, add to the queue of the first elevator
        elevators[0].addRequest(floor);
    }
}
