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
                "Authorization": `Bearer sk-proj-33P6pdaYUY5DStoBLTCBT3BlbkFJ2avQLMTCD2ilzahGDOhD`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: (
                            "Read the user's diary and, based on their attitudes and values, find things to be positive about or grateful for in the diary." +
                            "Semantically reflect your findings and cover up the diary using the user's preferred language. Maintain a first-person perspective." +
                            "Make it natural and authentic." +
                            "Provide only the augmented diary content in Korean. The diary content is as follows\n\n" +
                            `Attitude: ${option1.dataset.value}, Value: ${option2.dataset.value}, Language: ${option3.dataset.value}, Diary: ${entry}`
                        )
                    }
                ],
                temperature: 0.8
            })
        });

        const data = await response.json();
        document.getElementById("results").innerText = data.choices[0].message.content;
        document.getElementById("results").classList.remove("hidden");
    } catch (error) {
        console.error("Error:", error);
        alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
}
