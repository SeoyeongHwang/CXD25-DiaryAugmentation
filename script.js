document.getElementById("submitButton").addEventListener("click", analyzeDiary);

const optionButtons = document.querySelectorAll(".option-btn");
optionButtons.forEach(button => {
    button.addEventListener("click", function () {
        const parent = this.parentElement;
        const buttons = parent.querySelectorAll(".option-btn");

        buttons.forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
    });
});

async function analyzeDiary() {
    const option1 = document.querySelector("#option1 .selected");
    const option2 = document.querySelector("#option2 .selected");
    const option3 = document.querySelector("#option3 .selected");
    const entry = document.getElementById("diaryEntry").value;

    if (!option1 || !option2 || !option3 || entry.trim() === "") {
        alert("모든 옵션과 일기 입력란을 채워주세요.");
        return;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `옵션1: ${option1.dataset.value}, 옵션2: ${option2.dataset.value}, 옵션3: ${option3.dataset.value}, 일기: ${entry}`
                    }
                ]
            })
        });

        const data = await response.json();
        document.getElementById("results").innerText = data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
}
