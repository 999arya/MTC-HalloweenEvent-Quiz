// Replace these preview questions with the approved event question bank.
// correctAnswer is the zero-based index of the correct option.
window.QUIZ_LEVELS = [
  {
    title: 'Tech Trivia',
    topics: 'AI · CYBERSECURITY · WEB DEVELOPMENT · COMPUTER FUNDAMENTALS',
    briefing: "The first seal guards the knowledge firewall. To pass, you must understand the very systems the Phantom has corrupted. AI, cybersecurity, web development, and the fundamentals of computing. Let's see whether your knowledge can survive the breach.",
    whisper: 'UNKNOWN: Your firewall is only as strong as its operator.',
    questions: [
      { question: 'Which technology is commonly used to train a large language model?', options: ['Machine learning', 'Rasterization', 'Packet switching only', 'Disk defragmentation'], correctAnswer: 0, explanation: 'Large language models learn patterns from data using machine-learning techniques.' },
      { question: 'What does multi-factor authentication add to a sign-in?', options: ['A faster internet connection', 'A second verification factor', 'A public password', 'An extra browser tab'], correctAnswer: 1, explanation: 'MFA asks for an additional factor, such as an authenticator code or security key.' },
      { question: 'Which language provides the structure of a web page?', options: ['CSS', 'HTML', 'SQL', 'Bash'], correctAnswer: 1, explanation: 'HTML defines the structure and content of a web page.' },
      { question: 'Which CPU component performs arithmetic and logical operations?', options: ['RAM', 'Network interface', 'ALU', 'Power supply'], correctAnswer: 2, explanation: 'The arithmetic logic unit performs arithmetic calculations and logical operations.' }
    ]
  },
  {
    title: 'Debug the Dead',
    topics: 'SYNTAX ERRORS · LOGICAL MISTAKES · MISSING LINES',
    briefing: 'The code is dying. Lines are missing. Logic is broken. Something has rewritten the rules of your programs. Find the errors, repair the damage, and bring the code back to life. Welcome to Debug the Dead.',
    whisper: 'UNKNOWN: I changed one line. Can you find which one?',
    questions: [
      { question: 'Which Python line correctly prints the word "Boo"?', options: ['print "Boo")', 'echo("Boo")', 'print("Boo")', 'printf("Boo"'], correctAnswer: 2, explanation: 'Python function calls use parentheses around their arguments.' },
      { question: 'What is the result of this JavaScript expression: 3 + "2"?', options: ['5', '32', 'NaN', '"32"'], correctAnswer: 3, explanation: 'When one operand is a string, JavaScript converts the number to a string and concatenates.' },
      { question: 'Which condition correctly checks that x is between 1 and 10 inclusive in Python?', options: ['1 < x > 10', 'x = 1..10', 'x >= 1 or x <= 10', '1 <= x <= 10'], correctAnswer: 3, explanation: 'Python supports chained comparisons to express inclusive bounds.' },
      { question: 'Which missing line loops through every value in a Python list named items?', options: ['print items', 'for item in items:', 'if item in items:', 'while items:'], correctAnswer: 1, explanation: 'A for loop iterates once for each item in the list.' }
    ]
  },
  {
    title: 'DSA After Dark',
    topics: 'ARRAYS · STRINGS · SORTING · TIME COMPLEXITY',
    briefing: "You have entered the Phantom's algorithmic maze. Every path looks correct until it isn't. Every decision has a consequence. Think carefully, because one wrong answer could leave you trapped in an endless loop.",
    whisper: 'UNKNOWN: The shortest path is not always the safest.',
    questions: [
      { question: 'In a zero-indexed array of length n, what is the index of its final element?', options: ['n', '1', 'n - 1', 'n + 1'], correctAnswer: 2, explanation: 'Zero-based indexing starts at 0, so the last valid position is n - 1.' },
      { question: 'Which sorting algorithm repeatedly compares and swaps adjacent out-of-order elements?', options: ['Binary search', 'Depth-first search', 'Hashing', 'Bubble sort'], correctAnswer: 3, explanation: 'Bubble sort compares adjacent pairs and swaps them until the list is ordered.' },
      { question: 'What is the time complexity of binary search on a sorted array?', options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1) in every case'], correctAnswer: 2, explanation: 'Binary search halves the remaining search interval on each step.' },
      { question: 'What does the Python string slice "crypt"[::-1] produce?', options: ['crypt', 'tpyrc', 'rypc', 'A syntax error'], correctAnswer: 1, explanation: 'A slice step of -1 traverses the string from right to left.' }
    ]
  },
  {
    title: 'Predict the Output',
    topics: 'OUTPUT TRACING · C · C++ · PYTHON',
    briefing: 'The final seal is different. You cannot fix the code. You cannot change the logic. You can only predict what happens next. Read every line. Trust your reasoning. Because the final output determines whether the portal opens.',
    whisper: 'UNKNOWN: No edits. No escape. Tell me what happens next.',
    questions: [
      { question: 'C: What does this print?  int x = 4; printf("%d", x + 3);', options: ['43', '4', 'Compilation error', '7'], correctAnswer: 3, explanation: 'The expression adds 3 to x, so the integer printed is 7.' },
      { question: 'C++: What is printed?  int n = 5; cout << n / 2;', options: ['2.5', '3', '5', '2'], correctAnswer: 3, explanation: 'Both operands are integers, so integer division truncates 2.5 to 2.' },
      { question: 'Python: What is printed?  word = "crypt"; print(word[1:4])', options: ['cry', 'ryp', 'rypt', 'r y p'], correctAnswer: 1, explanation: 'The slice includes indices 1, 2, and 3, and excludes index 4.' }
    ]
  }
];
