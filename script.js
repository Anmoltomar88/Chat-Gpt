window.onload = () => {
    const button = document.getElementById('chatButton');
    const responseContainer = document.getElementById('responseContainer');
    const userInput = document.getElementById('userInput');

    button.addEventListener('click', async () => {
        const query = userInput.value.trim();
        if (!query) {
            responseContainer.innerHTML = "Please enter a question.";
            return;
        }

        const url = 'https://chat-gpt26.p.rapidapi.com/';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '0a7db7b97cmsh8e2436207c632acp175263jsnef82737c72a1',
                'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: query
                    }
                ]
            })
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json(); 
            const content = result.choices[0].message.content;
            responseContainer.innerHTML = content;
        } catch (error) {
            console.error(error);
            responseContainer.innerHTML = `Error: ${error.message}`;
        }
    });
};
