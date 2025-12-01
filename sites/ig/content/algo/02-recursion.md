---
draft: "true"
---

We need what is called a **base case** to make the recursion stop. Base cases are conditions at the start of recursive functions that terminate the calls.

Let's look at the [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number). The Fibonacci numbers are a sequence of numbers starting with `0, 1`. Then, each number is defined as the sum of the previous two numbers. The first few Fibonacci numbers are `0, 1, 1, 2, 3, 5, 8`. More formally, we have

Fn=Fn−1+Fn−2Fn​=Fn−1​+Fn−2​

This is called a **recurrence relation** - it's an equation that connects the terms together.