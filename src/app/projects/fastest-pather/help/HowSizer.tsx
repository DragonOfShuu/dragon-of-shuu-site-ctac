import BaseHelp from "./BaseHelp";

const HowSizer = () => {
    return (
        <BaseHelp>{`
# The Sizer

The sizer allows you to decide the size
of the environment that the fastest
path algorithm will go through.

I highly recommend adjusting the values
to make each block a square.

# The UI

## The Numbers

The numbers on the left of the toolbar
allows you to change the size of the 
environment to run the fastest path
in. The first value is the width, and 
the second number is the height. 

***Please note for you to see the changes
by changing the numbers, have to not
focus on the text box.***

I highly recommend adjusting the values
to make each block a square.

## Rotate Button

This button switches the width and
the height (time saver for someone
using a portrait mode device).

## Finish Button

The finish button will initialize
the environment with the sizes you
have given, and will take you 
straight to the painter!
        `}</BaseHelp>
    );
};

export default HowSizer;
