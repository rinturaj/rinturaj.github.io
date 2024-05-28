document.addEventListener("DOMContentLoaded", () => {
  const terminalInput = document.getElementById("terminal-input");
  const terminal = document.getElementById("terminal");
  const terminalContent = document.getElementById("terminal-content");
  const currentInput = document.getElementById("current-input");
  console.log(terminalContent);
  terminal.addEventListener("click", () => {
    terminalInput.focus();
    console.log("terminal input focus");
  });
  terminalInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const inputText = terminalInput.value;
      terminalInput.value = "";

      if (inputText.trim() !== "") {
        const userInputLine = document.createElement("p");
        userInputLine.classList.add("line");
        userInputLine.textContent = `user@computer:~$ ${inputText}`;
        terminalContent.insertBefore(
          userInputLine,
          terminalContent.lastElementChild
        );

        const outputLine = document.createElement("p");
        outputLine.classList.add("line");
        outputLine.textContent = executeCommand(inputText);
        terminalContent.insertBefore(
          outputLine,
          terminalContent.lastElementChild
        );
      }

      currentInput.textContent = "";
    } else if (event.key === "Backspace") {
      currentInput.textContent = currentInput.textContent.slice(0, -1);
    } else if (event.key.length === 1) {
      currentInput.textContent += event.key;
    }
  });
});

function executeCommand(command) {
  switch (command) {
    case "echo 'Hello, world!'":
      return "Hello, world!";
    case "date":
      return new Date().toString();
    default:
      return `command not found: ${command}`;
  }
}
