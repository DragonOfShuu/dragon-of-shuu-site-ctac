import { ProjectType } from "@/app/libs/projectsAPI";


const extraProjects: {[name: string]: ProjectType} = {
    "DucklingScript": {
        name: "DucklingScript",
        description: "A compiler for a programming language for injecting keystrokes. Originally based on Rubber Ducky 1.0",
        href: "https://github.com/DragonOfShuu/DucklingScript/",
        image: {},
        tags: ["compiler", "python"]
    },
    "Quackinter": {
        name: "Quackinter",
        description: "An interpreter for reading Rubber Ducky 1.0 and executing it directly on the machine.",
        href: "https://github.com/DragonOfShuu/quackinter",
        image: {},
        tags: ["python", "interpreter"]
    },
    "Cradlepoint Database": {
        name: "Cradlepoint Database",
        description: "Middleware that ingests 4G/5G metric data from Cradlepoint's NetCloud solution and stores it in an Elasticsearch database.",
        href: "https://github.com/Murrayschools/Cradlepoint-Elastic-Database",
        image: {},
        tags: ["python", "backend", "middleware", "database"]
    },
    "Action Logger": {
        name: "Action Logger",
        description: "A simple action logger that tells you what keys are being held down and released and when.",
        href: "https://github.com/DragonOfShuu/action-logger",
        image: {},
        tags: ["electron", "nextjs", "typescript", "frontend", "website", "desktop"]
    },
    "Operation Lightning Bolt": {
        name: "Operation Lightning Bolt",
        description: "Store names and quotes, and randomly select the names for a drawing!",
        href: "https://bolt.dragonofshuu.dev/",
        extraLinks: {
            "Code": "https://github.com/DragonOfShuu/OperationLightningBolt"
        },
        image: {},
        tags: ["angular", "website", "frontend", "typescript"]
    },
    "Paradigm": {
        name: "Paradigm",
        description: "Create text hotkeys that inject full text and sentences with placeholders",
        href: "https://github.com/DragonOfShuu/Paradigm",
        image: {},
        tags: ["typescript", "react", "chrome-extension", "frontend"],
    },
    "Ultimate Tik-Tak-Toe": {
        name: "Ultimate Tik-Tak-Toe",
        description: "Tic Tac Toe, but you play in 3 dimensions! There are higher board levels, and lower board levels.",
        href: "https://github.com/DragonOfShuu/ultimate-tik-tak-toe",
        image: {},
        tags: ["typescript", "react", "frontend"]
    },
    "Wordle Hax": {
        name: "Wordle Hax",
        description: "Cheat at wordle with this helpful desktop application!",
        href: "https://github.com/DragonOfShuu/WordleHax",
        image: {},
        tags: ["c#", "desktop", "wpf"]
    },
    "The Red Chessboard": {
        name: "The Red Chessboard",
        description: "Chess, but you have to completely annihilate the other team.",
        href: "https://github.com/DragonOfShuu/TheRedChessBoard",
        image: {},
        tags: ["java", "desktop"]
    }
}

export default extraProjects;
