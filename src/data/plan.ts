import type { Day } from '@/types';

export const dsaPlan: Day[] = [
  {
    day: 1,
    title: 'Arrays & Strings I',
    isReviewDay: false,
    topics: [
      {
        name: 'Arrays: Static & Dynamic',
        patterns: ['Basic operations (access, insert, delete)', 'In-place operations'],
        practice: ['Contains Duplicate', 'Single Number', 'Plus One'],
      },
      {
        name: 'Strings: Immutability & Manipulation',
        patterns: ['String building', 'Common methods', 'Character manipulation'],
        practice: ['Valid Anagram', 'Valid Palindrome', 'First Unique Character in a String'],
      },
    ],
  },
  {
    day: 2,
    title: 'Hashing Techniques',
    isReviewDay: false,
    topics: [
      {
        name: 'HashSet & Dictionary',
        patterns: ['Frequency counting', 'Checking for existence', 'Storing key-value pairs'],
        practice: ['Two Sum', 'Group Anagrams', 'Longest Substring Without Repeating Characters'],
      },
    ],
    notes: 'Focus on understanding the O(1) average time complexity for lookups, insertions, and deletions.',
  },
  {
    day: 3,
    title: 'Two Pointers I',
    isReviewDay: false,
    topics: [
      {
        name: 'Two Pointers (Opposite Ends)',
        patterns: ['Converging pointers', 'Works on sorted data'],
        practice: ['Two Sum II - Input Array Is Sorted', 'Valid Palindrome', '3Sum'],
      },
    ],
  },
  { day: 4, title: 'Review Day', isReviewDay: true, topics: [] },
  {
    day: 5,
    title: 'Stacks & Queues',
    isReviewDay: false,
    topics: [
      {
        name: 'Stack (LIFO)',
        patterns: ['Parentheses matching', 'Monotonic stack', 'Backtracking simulation'],
        practice: ['Valid Parentheses', 'Min Stack', 'Daily Temperatures'],
      },
      {
        name: 'Queue (FIFO)',
        patterns: ['Level-order traversal', 'Shortest path in unweighted graphs'],
        practice: ['Implement Queue using Stacks', 'Number of Islands'],
      },
    ],
  },
  {
    day: 6,
    title: 'Linked Lists I',
    isReviewDay: false,
    topics: [
      {
        name: 'Singly Linked List',
        patterns: ['Fast & Slow pointers (cycle detection, middle element)', 'Reversing a list'],
        practice: ['Reverse Linked List', 'Merge Two Sorted Lists', 'Linked List Cycle'],
      },
    ],
  },
  {
    day: 7,
    title: 'Sliding Window',
    isReviewDay: false,
    topics: [
      {
        name: 'Sliding Window Technique',
        patterns: ['Dynamic window size', 'Fixed window size', 'Frequency counting within window'],
        practice: ['Best Time to Buy and Sell Stock', 'Longest Substring Without Repeating Characters', 'Minimum Size Subarray Sum'],
      },
    ],
  },
  { day: 8, title: 'Review Day', isReviewDay: true, topics: [] },
  {
    day: 9,
    title: 'Trees I: Traversal & Recursion',
    isReviewDay: false,
    topics: [
      {
        name: 'Binary Tree Traversal',
        patterns: ['Pre-order (DFS)', 'In-order (DFS)', 'Post-order (DFS)', 'Level-order (BFS)'],
        practice: ['Binary Tree Inorder Traversal', 'Maximum Depth of Binary Tree', 'Same Tree'],
      },
    ],
  },
  {
    day: 10,
    title: 'Trees II: Properties',
    isReviewDay: false,
    topics: [
      {
        name: 'Tree Properties',
        patterns: ['Symmetric trees', 'Balanced trees', 'Subtrees'],
        practice: ['Symmetric Tree', 'Balanced Binary Tree', 'Subtree of Another Tree'],
      },
    ],
  },
  {
    day: 11,
    title: 'Binary Search Trees (BST)',
    isReviewDay: false,
    topics: [
      {
        name: 'BST Properties & Operations',
        patterns: ['Validation', 'Search', 'Lowest Common Ancestor'],
        practice: ['Validate Binary Search Tree', 'Lowest Common Ancestor of a BST', 'Kth Smallest Element in a BST'],
      },
    ],
  },
  { day: 12, title: 'Review Day', isReviewDay: true, topics: [] },
  {
    day: 13,
    title: 'Heaps / Priority Queues',
    isReviewDay: false,
    topics: [
      {
        name: 'PriorityQueue in C#',
        patterns: ['Top K elements', 'Finding the median', 'Merging sorted streams'],
        practice: ['Kth Largest Element in an Array', 'Find Median from Data Stream', 'Merge K Sorted Lists'],
      },
    ],
    notes: 'In C#, PriorityQueue is the primary implementation. Understand how to use it for min-heaps and max-heaps (with custom comparers).',
  },
  {
    day: 14,
    title: 'Graphs I: Representation & Traversal',
    isReviewDay: false,
    topics: [
      {
        name: 'Graph Traversal',
        patterns: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)'],
        practice: ['Number of Islands', 'Clone Graph', 'Course Schedule'],
      },
    ],
    notes: 'Understand adjacency lists vs. adjacency matrices. Adjacency lists are most common in interviews.',
  },
  {
    day: 15,
    title: 'Backtracking',
    isReviewDay: false,
    topics: [
      {
        name: 'Backtracking Template',
        patterns: ['Choose, Explore, Unchoose', 'Permutations', 'Subsets', 'Combinations'],
        practice: ['Subsets', 'Combination Sum', 'Permutations', 'Word Search'],
      },
    ],
  },
  { day: 16, title: 'Review Day', isReviewDay: true, topics: [] },
  {
    day: 17,
    title: 'Dynamic Programming I',
    isReviewDay: false,
    topics: [
      {
        name: '1D Dynamic Programming',
        patterns: ['Memoization (Top-Down)', 'Tabulation (Bottom-Up)', 'Fibonacci-style problems'],
        practice: ['Climbing Stairs', 'Coin Change', 'House Robber'],
      },
    ],
  },
  {
    day: 18,
    title: 'Dynamic Programming II',
    isReviewDay: false,
    topics: [
      {
        name: '2D Dynamic Programming',
        patterns: ['Grid traversal', 'State transitions based on two variables'],
        practice: ['Unique Paths', 'Longest Common Subsequence', 'Edit Distance'],
      },
    ],
  },
  {
    day: 19,
    title: 'Greedy Algorithms',
    isReviewDay: false,
    topics: [
      {
        name: 'Greedy Approach',
        patterns: ['Making locally optimal choices', 'Sorting as a prerequisite'],
        practice: ['Jump Game', 'Gas Station', 'Merge Intervals'],
      },
    ],
  },
  { day: 20, title: 'Review Day', isReviewDay: true, topics: [] },
  {
    day: 21,
    title: 'Tries (Prefix Trees)',
    isReviewDay: false,
    topics: [
      {
        name: 'Trie Implementation & Use Cases',
        patterns: ['Prefix matching', 'Autocomplete', 'Word search'],
        practice: ['Implement Trie (Prefix Tree)', 'Design Add and Search Words Data Structure', 'Word Search II'],
      },
    ],
  },
  {
    day: 22,
    title: 'Graphs II: Advanced Algorithms',
    isReviewDay: false,
    topics: [
      {
        name: 'Advanced Graph Algorithms',
        patterns: ["Dijkstra's (Shortest Path)", "Topological Sort"],
        practice: ['Course Schedule II', 'Network Delay Time', 'Alien Dictionary'],
      },
    ],
  },
  {
    day: 23,
    title: 'Bit Manipulation',
    isReviewDay: false,
    topics: [
      {
        name: 'Bitwise Operators',
        patterns: ['AND, OR, XOR, NOT', 'Bit shifting', 'Counting bits'],
        practice: ['Counting Bits', 'Reverse Bits', 'Missing Number', 'Sum of Two Integers'],
      },
    ],
  },
  { day: 24, title: 'Comprehensive Review I', isReviewDay: true, topics: [] },
  { day: 25, title: 'Comprehensive Review II', isReviewDay: true, topics: [] },
  {
    day: 26,
    title: 'System Design: Basics',
    isReviewDay: false,
    topics: [
      {
        name: 'Core Concepts',
        patterns: ['Scalability (Vertical vs. Horizontal)', 'Load Balancing', 'Caching', 'Database Sharding'],
        practice: ['Design TinyURL', 'Design a URL shortener'],
      },
    ],
  },
  {
    day: 27,
    title: 'System Design: Case Study',
    isReviewDay: false,
    topics: [
      {
        name: 'Design a Social Media Feed',
        patterns: ['API Design (REST)', 'Data Modeling', 'Feed Generation (Push vs. Pull)'],
        practice: ['Design Twitter', 'Design Instagram feed'],
      },
    ],
  },
  { day: 28, title: 'Behavioral Interview Prep', isReviewDay: true, topics: [], notes: 'Prepare stories for common questions: "Tell me about a time...", "Why this company?", "Strengths/Weaknesses". Use the STAR method.' },
  { day: 29, title: 'Mock Interview (Self)', isReviewDay: true, topics: [], notes: 'Pick 2-3 problems from different topics and solve them on a whiteboard or text editor under timed conditions. Explain your thought process out loud.' },
  { day: 30, title: 'Full Mock Interview', isReviewDay: true, topics: [], notes: 'Use a platform like Pramp or find a peer to conduct a full mock interview, including behavioral and technical sections. Relax and review your journey.' },
];
