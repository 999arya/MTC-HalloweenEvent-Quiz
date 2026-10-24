// Server-side master question bank definitions with private answer keys and evaluation criteria.
// This file is the single source of truth for all quiz content across the 4 seals.
// It is strictly server-side and must NEVER be imported or bundled into public client assets.

export const QUESTION_DEFINITIONS = [
  // ==========================================
  // SEAL 1: Tech Trivia (MCQ)
  // ==========================================
  {
    seal_number: 1,
    question_key: 's1_q1_llm_training',
    question_type: 'mcq',
    display_order: 1,
    points: 1,
    is_active: true,
    question_text: 'Which technology is commonly used to train a large language model?',
    options: ['Machine learning', 'Rasterization', 'Packet switching only', 'Disk defragmentation'],
    answer_key: {
      correctIndex: 0,
      explanation: 'Large language models learn patterns from data using machine-learning techniques.'
    }
  },
  {
    seal_number: 1,
    question_key: 's1_q2_mfa_factor',
    question_type: 'mcq',
    display_order: 2,
    points: 1,
    is_active: true,
    question_text: 'What does multi-factor authentication add to a sign-in?',
    options: ['A faster internet connection', 'A second verification factor', 'A public password', 'An extra browser tab'],
    answer_key: {
      correctIndex: 1,
      explanation: 'MFA asks for an additional factor, such as an authenticator code or security key.'
    }
  },
  {
    seal_number: 1,
    question_key: 's1_q3_html_structure',
    question_type: 'mcq',
    display_order: 3,
    points: 1,
    is_active: true,
    question_text: 'Which language provides the structure of a web page?',
    options: ['CSS', 'HTML', 'SQL', 'Bash'],
    answer_key: {
      correctIndex: 1,
      explanation: 'HTML defines the structure and content of a web page.'
    }
  },
  {
    seal_number: 1,
    question_key: 's1_q4_alu_operation',
    question_type: 'mcq',
    display_order: 4,
    points: 1,
    is_active: true,
    question_text: 'Which CPU component performs arithmetic and logical operations?',
    options: ['RAM', 'Network interface', 'ALU', 'Power supply'],
    answer_key: {
      correctIndex: 2,
      explanation: 'The arithmetic logic unit performs arithmetic calculations and logical operations.'
    }
  },

  // ==========================================
  // SEAL 2: Debug the Dead (Code Editor)
  // ==========================================
  {
    seal_number: 2,
    question_key: 's2_q1_py_scream',
    question_type: 'code',
    display_order: 1,
    points: 1,
    is_active: true,
    question_text: 'Fix the syntax error in this Python script so that it correctly prints "Boo" to stdout.',
    options: null,
    answer_key: {
      expectedCode: 'def scream():\n    print("Boo")\n\nscream()',
      explanation: 'In Python 3, print is a function and requires parentheses around its arguments: print("Boo").'
    }
  },
  {
    seal_number: 2,
    question_key: 's2_q2_js_safe_add',
    question_type: 'code',
    display_order: 2,
    points: 1,
    is_active: true,
    question_text: 'Fix the JavaScript function bug so that it calculates the correct mathematical sum of a and b (numeric addition, not string concatenation).',
    options: null,
    answer_key: {
      expectedCode: 'function addValues(a, b) {\n    return Number(a) + Number(b);\n}',
      explanation: 'Converting both operands to Number(a) + Number(b) or +a + +b ensures numeric addition instead of string concatenation.'
    }
  },
  {
    seal_number: 2,
    question_key: 's2_q3_py_containment',
    question_type: 'code',
    display_order: 3,
    points: 1,
    is_active: true,
    question_text: 'Fix the Python range and comparison bug in is_in_range so that it returns True only when x is between 1 and 10 inclusive.',
    options: null,
    answer_key: {
      expectedCode: 'def is_in_range(x):\n    return 1 <= x <= 10',
      explanation: 'Inclusive range checking in Python is written as 1 <= x <= 10 or (x >= 1 and x <= 10).'
    }
  },
  {
    seal_number: 2,
    question_key: 's2_q4_py_loop',
    question_type: 'code',
    display_order: 4,
    points: 1,
    is_active: true,
    question_text: 'Fix the broken Python loop so it iterates through every item in the items list and prints it.',
    options: null,
    answer_key: {
      expectedCode: 'def process_souls(items):\n    for item in items:\n        print(item)',
      explanation: 'A standard iteration loop in Python uses `for item in items:`.'
    }
  },

  // ==========================================
  // SEAL 3: DSA After Dark (MCQ)
  // ==========================================
  {
    seal_number: 3,
    question_key: 's3_q1_zero_index',
    question_type: 'mcq',
    display_order: 1,
    points: 1,
    is_active: true,
    question_text: 'In a zero-indexed array of length n, what is the index of its final element?',
    options: ['n', '1', 'n - 1', 'n + 1'],
    answer_key: {
      correctIndex: 2,
      explanation: 'Zero-based indexing starts at 0, so the last valid position is n - 1.'
    }
  },
  {
    seal_number: 3,
    question_key: 's3_q2_bubble_sort',
    question_type: 'mcq',
    display_order: 2,
    points: 1,
    is_active: true,
    question_text: 'Which sorting algorithm repeatedly compares and swaps adjacent out-of-order elements?',
    options: ['Binary search', 'Depth-first search', 'Hashing', 'Bubble sort'],
    answer_key: {
      correctIndex: 3,
      explanation: 'Bubble sort compares adjacent pairs and swaps them until the list is ordered.'
    }
  },
  {
    seal_number: 3,
    question_key: 's3_q3_binary_search_complexity',
    question_type: 'mcq',
    display_order: 3,
    points: 1,
    is_active: true,
    question_text: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1) in every case'],
    answer_key: {
      correctIndex: 2,
      explanation: 'Binary search halves the remaining search interval on each step.'
    }
  },
  {
    seal_number: 3,
    question_key: 's3_q4_py_slice_reverse',
    question_type: 'mcq',
    display_order: 4,
    points: 1,
    is_active: true,
    question_text: 'What does the Python string slice "crypt"[::-1] produce?',
    options: ['crypt', 'tpyrc', 'rypc', 'A syntax error'],
    answer_key: {
      correctIndex: 1,
      explanation: 'A slice step of -1 traverses the string from right to left.'
    }
  },

  // ==========================================
  // SEAL 4: Predict the Output (Terminal Input)
  // ==========================================
  {
    seal_number: 4,
    question_key: 's4_q1_c_output',
    question_type: 'predict_output',
    display_order: 1,
    points: 1,
    is_active: true,
    question_text: 'Trace the C program execution and predict the exact printed output.',
    options: null,
    answer_key: {
      expectedOutput: '7',
      explanation: 'The expression 4 + 3 evaluates to 7, which printf("%d", ...) outputs without newline.'
    }
  },
  {
    seal_number: 4,
    question_key: 's4_q2_cpp_division',
    question_type: 'predict_output',
    display_order: 2,
    points: 1,
    is_active: true,
    question_text: 'Trace the C++ integer division logic and predict the exact printed output.',
    options: null,
    answer_key: {
      expectedOutput: '2',
      explanation: 'In C++, 5 / 2 performs integer division, discarding the fractional part (.5) to output 2.'
    }
  },
  {
    seal_number: 4,
    question_key: 's4_q3_py_slice_crypt',
    question_type: 'predict_output',
    display_order: 3,
    points: 1,
    is_active: true,
    question_text: 'Trace the Python string slicing and predict the exact printed output.',
    options: null,
    answer_key: {
      expectedOutput: 'ryp',
      explanation: 'Indices 1, 2, 3 correspond to letters "r", "y", "p". The stop index 4 is excluded.'
    }
  },
  {
    seal_number: 4,
    question_key: 's4_q4_js_coercion',
    question_type: 'predict_output',
    display_order: 4,
    points: 1,
    is_active: true,
    question_text: 'Trace the JavaScript type coercion expression and predict the exact printed output.',
    options: null,
    answer_key: {
      expectedOutput: '32',
      explanation: 'Number 3 is coerced into "3", and concatenation with "2" results in "32".'
    }
  }
];

// Seal metadata for frontend structure
export const SEAL_METADATA = [
  {
    sealNumber: 1,
    title: 'Tech Trivia',
    topics: 'AI · CYBERSECURITY · WEB DEVELOPMENT · COMPUTER FUNDAMENTALS',
    briefing: "The first seal guards the knowledge firewall. To pass, you must understand the very systems the Phantom has corrupted: AI, cybersecurity, web development, and the fundamentals of computing. Let's see whether your knowledge can survive the breach.",
    whisper: 'UNKNOWN: Your firewall is only as strong as its operator.',
    type: 'mcq'
  },
  {
    sealNumber: 2,
    title: 'Debug the Dead',
    topics: 'SYNTAX ERRORS · LOGICAL BUGS · MISSING INDENTATION · CODE REPAIR',
    briefing: 'The code is dying. Lines are corrupted. Logic is broken. Something has rewritten the rules of your programs. Find the bug in the code editor, repair the program with proper syntax, and restore the dead code.',
    whisper: 'UNKNOWN: I broke one line in every script. Can your code editor fix it?',
    type: 'code_editor'
  },
  {
    sealNumber: 3,
    title: 'DSA After Dark',
    topics: 'ARRAYS · STRINGS · SORTING · TIME COMPLEXITY',
    briefing: "You have entered the Phantom's algorithmic maze. Every path looks correct until it isn't. Every decision has a consequence. Think carefully, because one wrong answer could leave you trapped in an endless loop.",
    whisper: 'UNKNOWN: The shortest path is not always the safest.',
    type: 'mcq'
  },
  {
    sealNumber: 4,
    title: 'Predict the Output',
    topics: 'OUTPUT TRACING · C · C++ · PYTHON · JAVASCRIPT',
    briefing: 'The final seal is different. You cannot fix the code. You cannot change the logic. You can only predict what happens next. Read every line. Type the exact output produced by the program into the terminal prompt.',
    whisper: 'UNKNOWN: No edits. No escape. Tell me what prints to the screen.',
    type: 'predict_output'
  }
];

// Presentation metadata for interactive fields (code editor & terminal predictor)
// Strictly non-secret frontend presentation attributes needed by the browser UI
export const QUESTION_PRESENTATION = {
  s2_q1_py_scream: {
    language: 'python',
    filename: 'spooky_print.py',
    hint: 'Check parentheses and string quoting around the print argument.',
    starterCode: 'def scream():\n    print "Boo"\n\nscream()'
  },
  s2_q2_js_safe_add: {
    language: 'javascript',
    filename: 'safe_add.js',
    hint: 'Use Number() or parseInt() to ensure numeric addition when b might be passed as a string.',
    starterCode: 'function addValues(a, b) {\n    // Bug: concatenates string instead of adding numbers\n    return a + b;\n}'
  },
  s2_q3_py_containment: {
    language: 'python',
    filename: 'containment_bounds.py',
    hint: 'Use chained comparison (1 <= x <= 10) or (x >= 1 and x <= 10).',
    starterCode: 'def is_in_range(x):\n    # Bug: incorrect operator logic\n    return 1 < x > 10'
  },
  s2_q4_py_loop: {
    language: 'python',
    filename: 'corrupted_loop.py',
    hint: 'Use a proper for ... in items: statement followed by an indented block.',
    starterCode: 'def process_souls(items):\n    # Bug: invalid loop header\n    loop items:\n        print(item)'
  },
  s4_q1_c_output: {
    language: 'c',
    codeSnippet: '#include <stdio.h>\n\nint main() {\n    int x = 4;\n    printf("%d", x + 3);\n    return 0;\n}',
    hint: 'Evaluate 4 + 3 formatted as an integer %d.'
  },
  s4_q2_cpp_division: {
    language: 'cpp',
    codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 5;\n    cout << n / 2;\n    return 0;\n}',
    hint: 'Remember: integer divided by integer in C++ truncates the decimal part.'
  },
  s4_q3_py_slice_crypt: {
    language: 'python',
    codeSnippet: 'word = "crypt"\nprint(word[1:4])',
    hint: 'Python slices are [start:stop] where start is included (1) and stop is excluded (4).'
  },
  s4_q4_js_coercion: {
    language: 'javascript',
    codeSnippet: 'const val = 3 + "2";\nconsole.log(val);',
    hint: 'When a number is added to a string with +, JavaScript converts the number to string and concatenates.'
  }
};
