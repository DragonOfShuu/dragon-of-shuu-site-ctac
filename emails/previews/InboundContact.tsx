import InboundContact from "../InboundContact";

export function preview() {
    return (
        <InboundContact
            contactee="Ur Mother"
            retAddress="mail@dragonofshuu.dev"
            textContent={`It's time to grow up and see the 
                sky, and the beautiful trees. The world 
                is unbelievable in scale, and amongst
                it is new challenges and hardships.
                Don't worry, you will learn just like 
                the rest of us; you'll learn what you need
                to do and what others expect; however
                it won't come easily, and a lot of work
                will be required.`}
        />
    );
}
