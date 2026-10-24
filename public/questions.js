// Question bank for MTC Crypt Trials - Phantom Protocol
// Seal 1: Tech Trivia (MCQ)
// Seal 2: Debug the Dead (Code Editor with starterCode & fixed code verification)
// Seal 3: DSA After Dark (MCQ)
// Seal 4: Predict the Output (Terminal text input prediction)

window.QUIZ_LEVELS = [
  {
    title: 'Tech Trivia',
    topics: 'AI · CYBERSECURITY · WEB DEVELOPMENT · COMPUTER FUNDAMENTALS',
    briefing: "The first seal guards the knowledge firewall. To pass, you must understand the very systems the Phantom has corrupted: AI, cybersecurity, web development, and the fundamentals of computing. Let's see whether your knowledge can survive the breach.",
    whisper: 'UNKNOWN: Your firewall is only as strong as its operator.',
    type: 'mcq',
    questions: [
      {
        question: 'Which technology is commonly used to train a large language model?',
        options: ['Machine learning', 'Rasterization', 'Packet switching only', 'Disk defragmentation'],
        correctAnswer: 0,
        explanation: 'Large language models learn patterns from data using machine-learning techniques.'
      },
      {
        question: 'What does multi-factor authentication add to a sign-in?',
        options: ['A faster internet connection', 'A second verification factor', 'A public password', 'An extra browser tab'],
        correctAnswer: 1,
        explanation: 'MFA asks for an additional factor, such as an authenticator code or security key.'
      },
      {
        question: 'Which language provides the structure of a web page?',
        options: ['CSS', 'HTML', 'SQL', 'Bash'],
        correctAnswer: 1,
        explanation: 'HTML defines the structure and content of a web page.'
      },
      {
        question: 'Which CPU component performs arithmetic and logical operations?',
        options: ['RAM', 'Network interface', 'ALU', 'Power supply'],
        correctAnswer: 2,
        explanation: 'The arithmetic logic unit performs arithmetic calculations and logical operations.'
      }
    ]
  },
  {
    title: 'Debug the Dead',
    topics: 'SYNTAX ERRORS · LOGICAL BUGS · MISSING INDENTATION · CODE REPAIR',
    briefing: 'The code is dying. Lines are corrupted. Logic is broken. Something has rewritten the rules of your programs. Find the bug in the code editor, repair the program with proper syntax, and restore the dead code.',
    whisper: 'UNKNOWN: I broke one line in every script. Can your code editor fix it?',
    type: 'code_editor',
    questions: [
      {
        question: 'Fix the syntax error in this Python script so that it correctly prints "Boo" to stdout.',
        language: 'python',
        filename: 'spooky_print.py',
        hint: 'Check parentheses and string quoting around the print argument.',
        starterCode: 'def scream():\n    print "Boo"\n\nscream()',
        expectedCode: 'def scream():\n    print("Boo")\n\nscream()',
        explanation: 'In Python 3, print is a function and requires parentheses around its arguments: print("Boo").'
      },
      {
        question: 'Fix the JavaScript function bug so that it calculates the correct mathematical sum of a and b (numeric addition, not string concatenation).',
        language: 'javascript',
        filename: 'safe_add.js',
        hint: 'Use Number() or parseInt() to ensure numeric addition when b might be passed as a string.',
        starterCode: 'function addValues(a, b) {\n    // Bug: concatenates string instead of adding numbers\n    return a + b;\n}',
        expectedCode: 'function addValues(a, b) {\n    return Number(a) + Number(b);\n}',
        explanation: 'Converting both operands to Number(a) + Number(b) or +a + +b ensures numeric addition instead of string concatenation.'
      },
      {
        question: 'Fix the Python range and comparison bug in is_in_range so that it returns True only when x is between 1 and 10 inclusive.',
        language: 'python',
        filename: 'containment_bounds.py',
        hint: 'Use chained comparison (1 <= x <= 10) or (x >= 1 and x <= 10).',
        starterCode: 'def is_in_range(x):\n    # Bug: incorrect operator logic\n    return 1 < x > 10',
        expectedCode: 'def is_in_range(x):\n    return 1 <= x <= 10',
        explanation: 'Inclusive range checking in Python is written as 1 <= x <= 10 or (x >= 1 and x <= 10).'
      },
      {
        question: 'Fix the broken Python loop so it iterates through every item in the items list and prints it.',
        language: 'python',
        filename: 'corrupted_loop.py',
        hint: 'Use a proper for ... in items: statement followed by an indented block.',
        starterCode: 'def process_souls(items):\n    # Bug: invalid loop header\n    loop items:\n        print(item)',
        expectedCode: 'def process_souls(items):\n    for item in items:\n        print(item)',
        explanation: 'A standard iteration loop in Python uses `for item in items:`.'
      }
    ]
  },
  {
    title: 'DSA After Dark',
    topics: 'ARRAYS · STRINGS · SORTING · TIME COMPLEXITY',
    briefing: "You have entered the Phantom's algorithmic maze. Every path looks correct until it isn't. Every decision has a consequence. Think carefully, because one wrong answer could leave you trapped in an endless loop.",
    whisper: 'UNKNOWN: The shortest path is not always the safest.',
    type: 'mcq',
    questions: [
      {
        question: 'In a zero-indexed array of length n, what is the index of its final element?',
        options: ['n', '1', 'n - 1', 'n + 1'],
        correctAnswer: 2,
        explanation: 'Zero-based indexing starts at 0, so the last valid position is n - 1.'
      },
      {
        question: 'Which sorting algorithm repeatedly compares and swaps adjacent out-of-order elements?',
        options: ['Binary search', 'Depth-first search', 'Hashing', 'Bubble sort'],
        correctAnswer: 3,
        explanation: 'Bubble sort compares adjacent pairs and swaps them until the list is ordered.'
      },
      {
        question: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1) in every case'],
        correctAnswer: 2,
        explanation: 'Binary search halves the remaining search interval on each step.'
      },
      {
        question: 'What does the Python string slice "crypt"[::-1] produce?',
        options: ['crypt', 'tpyrc', 'rypc', 'A syntax error'],
        correctAnswer: 1,
        explanation: 'A slice step of -1 traverses the string from right to left.'
      }
    ]
  },
  {
    title: 'Predict the Output',
    topics: 'OUTPUT TRACING · C · C++ · PYTHON · JAVASCRIPT',
    briefing: 'The final seal is different. You cannot fix the code. You cannot change the logic. You can only predict what happens next. Read every line. Type the exact output produced by the program into the terminal prompt.',
    whisper: 'UNKNOWN: No edits. No escape. Tell me what prints to the screen.',
    type: 'predict_output',
    questions: [
      {
        question: 'Trace the C program execution and predict the exact printed output.',
        language: 'c',
        codeSnippet: '#include <stdio.h>\n\nint main() {\n    int x = 4;\n    printf("%d", x + 3);\n    return 0;\n}',
        expectedOutput: '7',
        hint: 'Evaluate 4 + 3 formatted as an integer %d.',
        explanation: 'The expression 4 + 3 evaluates to 7, which printf("%d", ...) outputs without newline.'
      },
      {
        question: 'Trace the C++ integer division logic and predict the exact printed output.',
        language: 'cpp',
        codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 5;\n    cout << n / 2;\n    return 0;\n}',
        expectedOutput: '2',
        hint: 'Remember: integer divided by integer in C++ truncates the decimal part.',
        explanation: 'In C++, 5 / 2 performs integer division, discarding the fractional part (.5) to output 2.'
      },
      {
        question: 'Trace the Python string slicing and predict the exact printed output.',
        language: 'python',
        codeSnippet: 'word = "crypt"\nprint(word[1:4])',
        expectedOutput: 'ryp',
        hint: 'Python slices are [start:stop] where start is included (1) and stop is excluded (4).',
        explanation: 'Indices 1, 2, 3 correspond to letters "r", "y", "p". The stop index 4 is excluded.'
      },
      {
        question: 'Trace the JavaScript type coercion expression and predict the exact printed output.',
        language: 'javascript',
        codeSnippet: 'const val = 3 + "2";\nconsole.log(val);',
        expectedOutput: '32',
        hint: 'When a number is added to a string with +, JavaScript converts the number to string and concatenates.',
        explanation: 'Number 3 is coerced into "3", and concatenation with "2" results in "32".'
      }
    ]
  }
];
