import BaseHelp from "./BaseHelp";

const HowPainter = () => {
    return (
        <BaseHelp>
            {`
# The Painter

The Painter allows you to design the environment to discover the 
fastest path through.

# The UI

## The Rotate Button

The rotate button on the far left resets the whole board. 
Additionally, it will fill the entire board with the 
selected trudge type (more on that a bit later).

## Set Start/End

This will set the position of the start location and 
the end location. After clicking one of the buttons,
simply select the new location for the new position.

## Trudge Colors

Here you can select the trudge type you want to 
paint with. The fastest is asphalt, followed by
grass, mud, then water. Water is the slowest to
travel through.

## Left Arrow

Clicking this allows you to go back to the sizer
to choose the size of the board. PLEASE NOTE THAT
BY PRESSING THIS YOU SACRIFICE THE ENVIRONMENT 
YOU HAVE PAINTED.

## Gear

Clicking the gear allows you to adjust the settings
for how the algorithm pathfinds.

## Play Button

This button allows you to start the pathfinding
process.

# Painting

To paint, simply select the trudge type (the colors
on the toolbar) you want to paint with, then click
and drag on the blocks to change their trudge type.

**To draw barriers,** draw on the same trudge
type that you have selected. To remove the barriers,
just draw over them with any trudge type.
            `}
        </BaseHelp>
    );
};

export default HowPainter;
