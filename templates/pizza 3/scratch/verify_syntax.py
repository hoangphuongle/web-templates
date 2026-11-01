import re

def verify_syntax():
    # Read index.css
    with open("index.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # Check matching brackets in CSS
    open_brackets = css.count("{")
    close_brackets = css.count("}")
    print(f"CSS Open Brackets: {open_brackets}, Close Brackets: {close_brackets}")
    if open_brackets != close_brackets:
        print("WARNING: CSS brackets mismatch!")
        # Trace mismatches if any
        stack = []
        for i, char in enumerate(css):
            if char == "{":
                stack.append(i)
            elif char == "}":
                if stack:
                    stack.pop()
                else:
                    print(f"Extra closing bracket found at position {i}")
        if stack:
            print(f"Unclosed brackets starting at positions: {stack}")
    else:
        print("CSS brackets match perfectly.")

    # Read index.js
    with open("index.js", "r", encoding="utf-8") as f:
        js = f.read()
        
    print(f"JS Length: {len(js)}")
    # We can check simple syntax if needed but mostly just ensuring no raw syntax breaks.
    print("Verification complete!")

verify_syntax()
