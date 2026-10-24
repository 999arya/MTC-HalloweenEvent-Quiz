// Safe public question definitions for offline development & fallback.
// NOTICE: Private answer keys, expected code, expected output, and explanations
// have been removed to protect the integrity of the live quiz.
// In production, questions are delivered dynamically via /api/quiz/questions.

window.QUIZ_LEVELS = [
  {
    title: 'Tech Trivia',
    topics: 'AI · CYBERSECURITY · WEB DEVELOPMENT · COMPUTER FUNDAMENTALS',
    briefing: "The first seal guards the knowledge firewall. To pass, you must understand the very systems the Phantom has corrupted: AI, cybersecurity, web development, and the fundamentals of computing. Let's see whether your knowledge can survive the breach.",
    whisper: 'UNKNOWN: Your firewall is only as strong as its operator.',
    type: 'mcq',
    questions: [
      {
        questionKey: 's1_q1_llm_training',
        question: 'Which technology is commonly used to train a large language model?',
        options: ['Machine learning', 'Rasterization', 'Packet switching only', 'Disk defragmentation']
      },
      {
        questionKey: 's1_q2_mfa_factor',
        question: 'What does multi-factor authentication add to a sign-in?',
        options: ['A faster internet connection', 'A second verification factor', 'A public password', 'An extra browser tab']
      },
      {
        questionKey: 's1_q3_html_structure',
        question: 'Which language provides the structure of a web page?',
        options: ['CSS', 'HTML', 'SQL', 'Bash']
      },
      {
        questionKey: 's1_q4_alu_operation',
        question: 'Which CPU component performs arithmetic and logical operations?',
        options: ['RAM', 'Network interface', 'ALU', 'Power supply']
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
        questionKey: 's2_q1_py_scream',
        question: 'Fix the syntax error in this Python script so that it correctly prints "Boo" to stdout.',
        language: 'python',
        filename: 'spooky_print.py',
        hint: 'Check parentheses and string quoting around the print argument.',
        starterCode: 'def scream():\n    print "Boo"\n\nscream()'
      },
      {
        questionKey: 's2_q2_js_safe_add',
        question: 'Fix the JavaScript function bug so that it calculates the correct mathematical sum of a and b (numeric addition, not string concatenation).',
        language: 'javascript',
        filename: 'safe_add.js',
        hint: 'Use Number() or parseInt() to ensure numeric addition when b might be passed as a string.',
        starterCode: 'function addValues(a, b) {\n    // Bug: concatenates string instead of adding numbers\n    return a + b;\n}'
      },
      {
        questionKey: 's2_q3_py_containment',
        question: 'Fix the Python range and comparison bug in is_in_range so that it returns True only when x is between 1 and 10 inclusive.',
        language: 'python',
        filename: 'containment_bounds.py',
        hint: 'Use chained comparison (1 <= x <= 10) or (x >= 1 and x <= 10).',
        starterCode: 'def is_in_range(x):\n    # Bug: incorrect operator logic\n    return 1 < x > 10'
      },
      {
        questionKey: 's2_q4_py_loop',
        question: 'Fix the broken Python loop so it iterates through every item in the items list and prints it.',
        language: 'python',
        filename: 'corrupted_loop.py',
        hint: 'Use a proper for ... in items: statement followed by an indented block.',
        starterCode: 'def process_souls(items):\n    # Bug: invalid loop header\n    loop items:\n        print(item)'
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
        questionKey: 's3_q1_zero_index',
        question: 'In a zero-indexed array of length n, what is the index of its final element?',
        options: ['n', '1', 'n - 1', 'n + 1']
      },
      {
        questionKey: 's3_q2_bubble_sort',
        question: 'Which sorting algorithm repeatedly compares and swaps adjacent out-of-order elements?',
        options: ['Binary search', 'Depth-first search', 'Hashing', 'Bubble sort']
      },
      {
        questionKey: 's3_q3_binary_search_complexity',
        question: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1) in every case']
      },
      {
        questionKey: 's3_q4_py_slice_reverse',
        question: 'What does the Python string slice "crypt"[::-1] produce?',
        options: ['crypt', 'tpyrc', 'rypc', 'A syntax error']
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
        questionKey: 's4_q1_c_output',
        question: 'Trace the C program execution and predict the exact printed output.',
        language: 'c',
        codeSnippet: '#include <stdio.h>\n\nint main() {\n    int x = 4;\n    printf("%d", x + 3);\n    return 0;\n}',
        hint: 'Evaluate 4 + 3 formatted as an integer %d.'
      },
      {
        questionKey: 's4_q2_cpp_division',
        question: 'Trace the C++ integer division logic and predict the exact printed output.',
        language: 'cpp',
        codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 5;\n    cout << n / 2;\n    return 0;\n}',
        hint: 'Remember: integer divided by integer in C++ truncates the decimal part.'
      },
      {
        questionKey: 's4_q3_py_slice_crypt',
        question: 'Trace the Python string slicing and predict the exact printed output.',
        language: 'python',
        codeSnippet: 'word = "crypt"\nprint(word[1:4])',
        hint: 'Python slices are [start:stop] where start is included (1) and stop is excluded (4).'
      },
      {
        questionKey: 's4_q4_js_coercion',
        question: 'Trace the JavaScript type coercion expression and predict the exact printed output.',
        language: 'javascript',
        codeSnippet: 'const val = 3 + "2";\nconsole.log(val);',
        hint: 'When a number is added to a string with +, JavaScript converts the number to string and concatenates.'
      }
    ]
  }
];
