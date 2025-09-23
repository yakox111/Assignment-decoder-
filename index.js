async function decodeAssignment() {
            const apiKeyInput = '4dacf853e725437480c68706e48efa20.diMWyeE8L2Ahtcdm';
            const assignmentInput = document.getElementById('assignment');
            const resultSection = document.getElementById('result');
            const resultContent = document.getElementById('resultContent');
            const loading = document.getElementById('loading');
            const error = document.getElementById('error');

            // Reset UI
            resultSection.style.display = 'none';
            error.style.display = 'none';
            loading.style.display = 'block';

            // Get inputs
            const apiKey = apiKeyInput.trim();
            const assignmentText = assignmentInput.value.trim();

            if (!apiKey) {
                showError('Please enter your GLM-4.5 API key');
                return;
            }

            if (!assignmentText) {
                showError('Please enter an assignment to decode');
                return;
            }

            // Create the prompt
            const prompt = `You are "Assignment Decoder," an AI that transforms confusing educational assignments into clear, step-by-step guides. When given an assignment description:

1. Break it into 5 actionable steps (simplify vague terms like "analyze," "discuss," or "explore" into concrete actions)
2. Create a completion checklist based on the steps
3. Suggest 2-3 relevant resources (use these exact formats):
   - For math: "Khan Academy: [topic] (https://www.khanacademy.org/math/[topic])"
   - For writing: "Purdue OWL: [skill] (https://owl.purdue.edu/owl/general_writing/[skill].html)"
   - For science: "PhET Simulations: [concept] (https://phet.colorado.edu/en/simulation/[simulation])"
   - General: "Crash Course [subject] (YouTube)"

Format your response exactly like this:

**STEPS:**
1. [First clear action]
2. [Second clear action]
3. [Third clear action]
4. [Fourth clear action]
5. [Fifth clear action]

**CHECKLIST:**
- [ ] [Item 1]
- [ ] [Item 2]
- [ ] [Item 3]
- [ ] [Item 4]
- [ ] [Item 5]

**RESOURCES:**
- [Resource 1 with link]
- [Resource 2 with link]

Now decode this assignment: "${assignmentText}"`;

            try {
                // Call GLM-4.5 API with correct endpoint and headers
                const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKeyInput}`,
                        'Content-Type': 'application/json',
                        'Accept-Language': 'en-US,en'
                    },
                    body: JSON.stringify({
                        model: 'glm-4.5-flash',
                        messages: [
                            { role: 'system', content: 'You are a helpful assistant that decodes educational assignments.' },
                            { role: 'user', content: prompt }
                        ],
                        temperature: 0.6,
                        max_tokens: 1024
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Display result
                    resultContent.textContent = data.choices[0].message.content;
                    resultSection.style.display = 'block';
                } else {
                    // Display error
                    showError(data.error?.message || 'Failed to decode assignment');
                }
            } catch (err) {
                showError('Network error. Please check your API key and try again.');
                console.error('Error:', err);
            } finally {
                loading.style.display = 'none';
            }
        }

        function showError(message) {
            const errorElement = document.getElementById('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        // Allow Enter key to trigger decode
        document.getElementById('assignment').addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'Enter') {
                decodeAssignment();
            }
        });
            document.getElementsByClassName("button-container").addEventListener("click",event=>{
                    document.getElementsByClassName("result-section").style.display="block"
            })
                document.getElementsByClassName("button-container").addEventListener("click",event=>{
                    document.getElementsByClassName("loading").style.display="block"
            })
