---
draft: "true"
---

The computational complexity of an algorithm is split into two parts: time complexity and space complexity. The time complexity of an algorithm is the amount of time the algorithm needs to run relative to the input size. The space complexity of an algorithm is the amount of memory allocated by the algorithm when run relative to the input size.

When written, the function is wrapped by a capital O. Here are some example complexities:

- O(n)O(n)
- O(n2)O(n2)
- O(2n)O(2n)
- O(log⁡n)O(logn)
- O(n⋅m)O(n⋅m)

For example, you would say "The time complexity of my algorithm is O(n)" or "The space complexity of my algorithm is O(n^2)".

Time complexity is not meant to be an **exact** representation of the number of operations. For example, we needed to initialize `maxNum = 0` and we also needed to output `maxNum` at the end. Thus, you could argue that for an array of length `10`, we need `12` operations. This **is not the point** of time complexity.

There are a few rules when it comes to calculating complexity. First, **we ignore constants**. That means O(9999999n)=O(8n)=O(n)=O(n500)O(9999999n)=O(8n)=O(n)=O(500n​).  Why do we do this? Remember: the point of complexity is to analyze the algorithm **as the input changes**.

The second rule is that we consider the complexity as the variables **tend to infinity**. When we have addition/subtraction between terms of the **same** variable, we ignore all terms except the most powerful one. For example: $$O(2^n+n^2−500n)=O(2^n)$$ . Why? Because as n tends to infinity, $2^n$ becomes so large that the other two terms are effectively zero in comparison.

The best complexity possible is O(1)O(1), called "constant time" or "constant space".