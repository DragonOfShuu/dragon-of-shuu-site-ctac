import BaseHelp from "./BaseHelp";

const HowRunner = () => {
    return (
        <BaseHelp>{`
# The Runner

The runner will actually attempt to find
the fastest path between the start point
and end point in the environment that you
have created, with the settings you have 
set!

# The UI

## Text on the Toolbar

The text on the toolbar will give you the
current status of the algorithm.

### While the Algo is Running

While the algorithm is running, the text
will state that is currently trying to 
find the end. It will also give you the
expense of the current node being evaluated.

### While the Algo is Finishing Up

While the algorithm is finishing up, it 
will say that it is revealing the path
to the end. It will give you the amount
of blocks it took, and how many blocks 
it is currently showing.

### When the Algo has Finished

It will either state "found," meaning
that the end was discovered. However,
it may also say "not found," meaning 
that the end is impossible to reach.

## Square/Stop

This will stop the algorithm,and will
return you to the painter.

# Color Coding

## No Border

The block has not been discovered yet.

## White Border

A white border means the block was discovered,
and is now closed.

## Gray Border

The block is open and actively being analyzed 
against the other blocks. If this block is 
the next least expensive to travel to, this
block will soon become white.

## Purple Border

This is the path that was taken from the start
to the end.

# How the Algorithm Works

This algorithm uses a variation of Dijkstra's 
algorithm called the A* algorithm. Generally,
Dijkstra's algorithm will choose the next 
node to push forward with depending on it's
it's travel time, and the distance already traveled (this is called the "cost" or the "expense"). 

For example, if the algorithm comes across water, 
it will forward nodes that are on grass rather than 
the water. However, if traveling across the grass has
become more expensive then traveling on the water, 
it will go across the water tile.

What makes this algorithm extra special however is
there is an added expense that makes it more expensive
to not go in the estimated direction of the end.

For example, if the end is directly toward the right
from the start, it will be more expensive to go down,
up, or left because that is not the direction of the
end. 

This added expense is determined by getting
the hypotenuse from the current node to 
the end node (a^2 + b^2 = c^2).

## Less Explanation, More Math

G = Distance of current path from this node to previous nodes

H = The estimated distance from this node to the end node

F = Total Cost 

G+H=F

The algorithm will forward the node with the 
lowest F value.
        `}</BaseHelp>
    );
};

export default HowRunner;
