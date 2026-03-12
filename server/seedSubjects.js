const mongoose = require('mongoose');
const dotenv = require('dotenv');
const process = require('node:process');
const Subject = require('./models/Subject');

dotenv.config();

const subjects = [
    {
        name: 'Operating Systems',
        description: 'Process management, Deadlocks, Memory Management, File Systems and I/O.',
        topics: [
            { name: 'Process Scheduling', description: 'Algorithms like FCFS, SJF, RR etc.' },
            { name: 'Memory Management', description: 'Paging, Segmentation, Virtual Memory.' },
            { name: 'Deadlocks', description: 'Prevention, Avoidance, Detection and Recovery.' }
        ],
        questions: [
            {
                question: 'Which scheduling algorithm assigns the CPU to the process with the highest priority?',
                options: ['FCFS', 'SJF', 'Priority Scheduling', 'Round Robin'],
                correct: 2,
                explanation: 'Priority scheduling assigns the CPU based on priority levels.',
                difficulty: 'easy'
            },
            {
                question: 'In paging, the logical address space of a process can be non-contiguous.',
                options: ['True', 'False', 'Depends on OS', 'None of these'],
                correct: 0,
                explanation: 'Paging allows the physical address space of a process to be non-contiguous.',
                difficulty: 'easy'
            },
            {
                question: 'Which problem can occur in Priority Scheduling where a low priority process waits indefinitely?',
                options: ['Deadlock', 'Starvation', 'Fragmentation', 'Thrashing'],
                correct: 1,
                explanation: 'Starvation is when a process is perpetually denied resources.',
                difficulty: 'medium'
            },
            {
                question: 'Thrashing occurs when the system spends more time in page swapping than executing processes.',
                options: ['True', 'False', 'Only in Windows', 'Only in Linux'],
                correct: 0,
                explanation: 'Thrashing is characterized by high paging activity.',
                difficulty: 'medium'
            }
        ]
    },
    {
        name: 'Algorithms',
        description: 'Searching, Sorting, Hashing, Asymptotic worst case time and space complexity.',
        topics: [
            { name: 'Greedy Algorithms', description: 'Huffman coding, MST, Dijkstra.' },
            { name: 'Dynamic Programming', description: 'LCS, Knapsack, Matrix Chain Multiplication.' },
            { name: 'Divide and Conquer', description: 'Merge Sort, Quick Sort.' }
        ],
        questions: [
            {
                question: 'What is the time complexity of Merge Sort in the worst case?',
                options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
                correct: 1,
                explanation: 'Merge Sort is O(n log n) in all cases.',
                difficulty: 'easy'
            },
            {
                question: 'Dijkstra\'s algorithm is used for finding the shortest path in a weighted graph.',
                options: ['True', 'False', 'Only for negative weights', 'None of these'],
                correct: 0,
                explanation: 'Dijkstra finds the shortest path from a single source.',
                difficulty: 'easy'
            },
            {
                question: 'Which technique is used to solve the 0/1 Knapsack problem efficiently?',
                options: ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Backtracking'],
                correct: 2,
                explanation: 'DP is required for the optimal solution to 0/1 Knapsack.',
                difficulty: 'medium'
            }
        ]
    },
    {
        name: 'Data Structures',
        description: 'Stacks, Queues, Linked Lists, Trees, Binary Search Trees, Binary Heaps, Graphs.',
        topics: [
            { name: 'Heaps', description: 'Min-heap, Max-heap operations.' },
            { name: 'Trees', description: 'Traversal, AVL Trees, B-Trees.' }
        ],
        questions: [
            {
                question: 'Which data structure follows the LIFO principle?',
                options: ['Queue', 'Linked List', 'Stack', 'Tree'],
                correct: 2,
                explanation: 'Stack is Last-In, First-Out.',
                difficulty: 'easy'
            },
            {
                question: 'A Binary Search Tree (BST) has the property that the left child is smaller than the parent.',
                options: ['True', 'False', 'Only for balanced trees', 'None of these'],
                correct: 0,
                explanation: 'This is the fundamental property of a BST.',
                difficulty: 'easy'
            }
        ]
    }
];

const seedSubjects = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for subject seeding...');

        await Subject.deleteMany({});
        await Subject.insertMany(subjects);

        console.log('Subjects seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Subject seeding failed:', error);
        process.exit(1);
    }
};

seedSubjects();
