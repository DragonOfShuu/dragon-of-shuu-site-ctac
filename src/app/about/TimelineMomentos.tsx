import { ReactNode } from "react";
import Image from "next/image";
import StoplightImg from "./images/Stoplight.png";
import RaspberryPiImg from "./images/RaspberryPi.png";
import ScratchMathImg from "./images/ScratchMath.png";
import MathIsEZImg from "./images/MathIsEZ.png";
import ElasticMiddlewareImg from "./images/ElasticDatabaseMiddleware.png";
import DucklingScriptImg from "./images/DucklingScriptLanguage.png";
import ImageViewer from "@/components/ImageViewer";

type TimelineMomento = {
    title: string;
    year: number;
    content: (ReactNode | string)[];
};

const TimelineMomentos: TimelineMomento[] = [
    {
        title: `My First Code`,
        year: 2014,
        content: [
            `I first started to learn how to code when
            I was just 9, when my dad hooked up a stop
            light to a Windows 98 computer. We wrote code
            in basic, and we were able to turn the stop
            light lights on and off using simple code.`,
            <ImageViewer
                src={StoplightImg}
                alt={`An image example of the basic code I wrote`}
                key={1}
                className={`size-full object-cover`}
            />,
        ],
    },
    {
        title: `My First Computer`,
        year: 2015,
        content: [
            `My first computer was simple: a Raspberry Pi:
            a mini credit card sized computers that ran
            rasbian (a sub-distro of debian). This is where
            I first started writing Python 3.4, and realized
            just how much I liked the language, and I would
            go on to create simple text-based decision making
            games.`,
            <ImageViewer
                src={RaspberryPiImg}
                alt={`A picture of a raspberry pi letting you clearly see the heatsinks and parts of the circuit board.`}
                className={`max-h-[75vh] w-auto mx-auto`}
                key={1}
            />,
        ],
    },
    {
        title: `My First "Good" Scratch Project`,
        year: 2016,
        content: [
            `While learning Python, I also played a lot with
            Scratch, a simplified block based programming language.
            I made a program that would ask the user mathematical
            questions. When I created it I told my class just how
            proud of it I was: "It generates two random numbers between
            a certain range, randomly adds, subtracts, multiplies or divides,
            and asks the user the answer, and matches with what it was 
            predetermined." Later on for fun I would also create my own
            2D side scroller game engine inside of Scratch too.`,
            `The math project is still public, and can be found [here](https://scratch.mit.edu/projects/140621474/)
            if you still want to try playing it.`,
            <ImageViewer
                src={ScratchMathImg}
                alt={`A picture of the Scratch project in reference: code to the left, game to the right.`}
                key={1}
            />,
        ],
    },
    {
        title: `My First Website`,
        year: 2018,
        content: [
            `At this age, I was super slow at typing. I had to take
            a typing class to improve speed. At first I was terrible, 
            but got very fast quickly, and ended up having a 
            lot of extra time. So when I completed all the required
            lessons I asked myself: "How do these websites work anyways?"
            That's when I created my first really really simple website.
            The teacher was so amazed, and I was so excited, I got the
            principle to come see my website, which then sparked the
            creation of a new class at that school called "Creative Coding".`,
        ],
    },
    {
        title: `My First Time Cheating on Math Homework`,
        year: 2021,
        content: [
            `When I started to really get into Python, I decided
            I needed to make something more useful, and object oriented.
            I hated how hard and how long the math homework I got was (even
            though I love math, it was just busy work). This is when I 
            learned and used the Python module named SymPy for solving
            symbolic math. I utilized object oriented concepts to make
            the menus clean, and keep the logic organized.`,
            `When I completed the program, I asked my
            teacher if I could use it for homework and tests, and
            they allowed me to, and thus I cheated on my homework and tests.`,
            `You can find the program [here](https://github.com/DragonOfShuu/MathIsEZ).`,
            <ImageViewer
                src={MathIsEZImg}
                alt={`A code snippet of MathIsEZ.`}
                key={3}
            />,
        ],
    },
    {
        title: `My First Database`,
        year: 2022,
        content: [
            `Eventually I ran into the head of technology of my school
            district (I'm serious), who said they
            had an internship for fixing chromebooks, and when I told
            him about what I do he saw a lot of potential.`,
            `That's when he mentioned he had cradlepoint routers that
            would turn cellular data into wifi, but their metric data
            would be cleared every 30 days, and he wanted a long term
            solution to storing the data. All he said was to use
            ElasticSearch to store the data, and gave me the documentation
            to retrieve the data.`,
            `I created a virtual machine to hold the database, and
            to periodically run my Python to retrieve, manipulate,
            and store the metric data. The project is public, and is
            retrievable [here](https://github.com/Murrayschools/Cradlepoint-Elastic-Database).`,
            <ImageViewer
                src={ElasticMiddlewareImg}
                alt="A code snippet of receiving and manipulating data."
                key={4}
            />,
        ],
    },
    {
        title: `My First Programming Language`,
        year: 2023,
        content: [
            `After completing High School, I decided I needed to do 
            something more algorithmically challenging. When playing
            with the Flipper (a multi-tool hacking device), I realized
            the programming language they were using for key-injection
            was missing major and basic programming features, which
            is why I created my new [programming language](https://github.com/DragonOfShuu/DucklingScript)
            using Python.`,
            <ImageViewer
                src={DucklingScriptImg}
                alt={`Image of DucklingScript: A language for key injection.`}
                className={`max-h-[75vh] w-auto mx-auto`}
                key={2}
            />,
        ],
    },
];

export default TimelineMomentos;
