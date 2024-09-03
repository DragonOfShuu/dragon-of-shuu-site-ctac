"use client";
import { Coord, Grid, SettingsType, addCoords, getTrudgeCost } from "./CommonTypes";

// This function will be ran every "tick",
// and it will be passed the current state
// and return the new state

var globSettings: SettingsType

function createNeighborList(includeCorners: boolean = true): Coord[] {
    let neighbors: Coord[] = [];
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            if (x==0 && y==0) continue;
            if (!includeCorners && x*y!=0) continue;

            neighbors.push({x: x, y: y})
        }
    }
    return neighbors;
}

export class BlockNode {
    /** The node before this one */
    parent: BlockNode|undefined;
    /** The end goal */
    goalNode: BlockNode|undefined;
    /** Coordinates for this block */
    coords: Coord;
    /** Cost from start node to this node */
    g: number; 
    /** Heurstical value: estimated distance from this node to end node */
    h: number;
    /** Total cost of this node (g+h=f) */
    f: number;

    constructor(
        coords: Coord, 
        parentAndEnd: {parent: BlockNode, end: BlockNode, trudgeValue: number}|undefined = undefined,
    ) {
        this.coords = coords;

        if (parentAndEnd== undefined) {
            this.g = this.h = this.f = 0
            return
        }

        this.parent = parentAndEnd.parent;
        this.goalNode = parentAndEnd.end;
        
        let normalize = globSettings.normalizeDirection?parentAndEnd.trudgeValue:1

        this.g = this.parent.g + parentAndEnd.trudgeValue
        this.h = Math.sqrt(((this.coords.y - this.goalNode.coords.y) ** 2) + ((this.coords.x - this.goalNode.coords.x) ** 2))*globSettings.heuristicMultiplier*normalize
        this.f = this.g + this.h
    }
    
    public equals(other: BlockNode): boolean {
        return (
            other.coords?.x == this.coords?.x
            && other.coords?.y == this.coords?.y
        )
    }

    public discoverChildren(grid: Grid, goalNode: BlockNode, canDiagonal: boolean): BlockNode[] {
        if (this.coords==undefined) 
            throw new Error("Coords must have a value for this object.");
            
        let blockCoords: Coord = this.coords as Coord
        let children: BlockNode[] = [];
        createNeighborList(canDiagonal).forEach((nRelative)=> {
            let diagonalCost = (nRelative.x*nRelative.y)==0? 1 : 1.41

            let position = addCoords(blockCoords, nRelative);

            if (position.y < 0
                || position.y > grid.length-1
                || position.x < 0
                || position.x > grid[position.y].length-1)
                return;
            
            let displaySelf = grid[position.y][position.x];
            if (displaySelf.mode == "barrier") return

            let newNode = new BlockNode(position, {parent: this, end: goalNode, trudgeValue: getTrudgeCost(displaySelf.trudge)*diagonalCost});
            children.push(newNode);
        })

        return children;
    }
}
    
export class StarState {
    start_node: BlockNode
    end_node: BlockNode

    open_list: BlockNode[] = []
    closed_list: BlockNode[] = []

    solvable: boolean|undefined = undefined
    solve_path: Coord[]|undefined = undefined

    recent_node: BlockNode|undefined = undefined

    constructor(start: Coord, end: Coord) {
        this.start_node = new BlockNode(start)
        this.end_node = new BlockNode(end)

        this.open_list.push(this.start_node)
    }

    setUnsolvable(): StarState {
        this.solvable = false
        return this
    }

    setSolvable(path: Coord[]): StarState {
        this.solve_path = path
        this.solvable = true
        return this
    }

    setRecentNode(node: BlockNode) {
        this.recent_node = node;
    }
}

const buildPath = (node: BlockNode) => {
    let path: Coord[] = []
    let current: BlockNode|undefined = node;
    while (current !== undefined) {
        path.push(current.coords)
        current = current.parent
    }
    return path.reverse();
}

const findFastestPath = (grid: Grid, state: StarState, settings: SettingsType): StarState => {
    globSettings = settings
    if (state.open_list.length == 0) return state.setUnsolvable()

    // First, find the next node to expand
    let currentNode = state.open_list[0];
    let currentIndex = 0;
    state.open_list.forEach((openBlock, index) => {
        if (openBlock.f < currentNode.f) {
            currentNode = openBlock
            currentIndex = index
        }
    })

    // Set current node as closed
    state.open_list.splice(currentIndex, 1);
    state.closed_list.push(currentNode);
    state.setRecentNode(currentNode);

    // Now to check if this node is the end node
    if (currentNode.equals(state.end_node)) {
        return state.setSolvable( buildPath(currentNode) )
    }

    let children = currentNode.discoverChildren(grid, state.end_node, settings.canPerformDiagonals);

    children.forEach((child) => {
        // Skip child if it is closed
        if (
            state.closed_list.find((n) => child.equals(n)) != undefined
        ) return;

        // Find if this block is already open
        let otherOpenIndex = state.open_list.findIndex((n) => child.equals(n))
        // If it is not already open, open it
        if (otherOpenIndex==-1) {
            state.open_list.push(child);
            return;
        }

        // If it is open, get the open one
        let otherNode = state.open_list[otherOpenIndex];
        // If the recently found one is more expensive, leave it
        if (child.g > otherNode.g) return;

        // If it is less expensive, replace the more expensive with the
        // less expensive
        state.open_list[otherOpenIndex] = child;
        // ✨ Greed ✨
    })

    // The frontend will go through the
    // open list and closed list to find
    // what has changed. We do not handle that.
    return state;
}

export { findFastestPath };