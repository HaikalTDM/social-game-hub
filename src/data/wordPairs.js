export const WORD_PAIRS = {
    food: [
        { common: 'Coffee', impostor: 'Tea', hint: 'Hot morning drink' },
        { common: 'Burger', impostor: 'Sandwich', hint: 'Bread-based meal' },
        { common: 'Apple', impostor: 'Pear', hint: 'Crunchy fruit' },
        { common: 'Sushi', impostor: 'Sashimi', hint: 'Japanese raw food' },
        { common: 'Pizza', impostor: 'Pasta', hint: 'Italian cuisine' },
        { common: 'Ice Cream', impostor: 'Yogurt', hint: 'Cold dessert' },
    ],
    places: [
        { common: 'Beach', impostor: 'Pool', hint: 'Place to swim' },
        { common: 'Library', impostor: 'Bookstore', hint: 'Place full of books' },
        { common: 'Cinema', impostor: 'Theater', hint: 'Place to watch a show' },
        { common: 'School', impostor: 'University', hint: 'Place for learning' },
        { common: 'Hotel', impostor: 'Motel', hint: 'Paid accommodation' },
        { common: 'Gym', impostor: 'Park', hint: 'Place to exercise' },
    ],
    objects: [
        { common: 'Guitar', impostor: 'Violin', hint: 'String instrument' },
        { common: 'Laptop', impostor: 'Tablet', hint: 'Portable computer' },
        { common: 'Chair', impostor: 'Stool', hint: 'Seat' },
        { common: 'Pen', impostor: 'Pencil', hint: 'Writing tool' },
        { common: 'Fork', impostor: 'Spoon', hint: 'Eating utensil' },
    ]
};

export const ALL_WORDS = [...WORD_PAIRS.food, ...WORD_PAIRS.places, ...WORD_PAIRS.objects];

export const FORBIDDEN_DATA = [
    { word: "Coffee", forbidden: ["Drink", "Morning", "Starbucks", "Caffeine"] },
    { word: "Superman", forbidden: ["Hero", "Cape", "Clark Kent", "Kryptonite"] },
    { word: "Beach", forbidden: ["Sand", "Ocean", "Sun", "Summer"] },
    { word: "Smartphone", forbidden: ["Call", "Text", "Screen", "App"] },
    { word: "Baby", forbidden: ["Diaper", "Cry", "Milk", "Small"] },
    { word: "Youtube", forbidden: ["Video", "Watch", "Subscribe", "Google"] },
    { word: "Soccer", forbidden: ["Ball", "Goal", "Sport", "Kick"] },
    { word: "Santa Claus", forbidden: ["Christmas", "Presents", "Beard", "North Pole"] },
    { word: "Vampire", forbidden: ["Blood", "Dracula", "Bat", "Twilight"] },
    { word: "Instagram", forbidden: ["Photo", "Like", "App", "Follow"] },
    { word: "School", forbidden: ["Teacher", "Learn", "Class", "Homework"] },
    { word: "Titanic", forbidden: ["Ship", "Iceberg", "Movie", "Sink"] },
];
