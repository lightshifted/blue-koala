
export const scrollToBottom = () => {
  let chatWindow = document.getElementById("message_container");
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

export const handleSubmit = async (content, event) => {
  if (event) {
  console.log("submitting");
  event.preventDefault();
  }

  const message = content || document.getElementById("message-input").value;
  if (!message) {
    return;
  }

  let msg_html = '<div class="user__chat__bubble"><p class="message__text">';
  msg_html += message;
  msg_html += "</p></div>";
  document.getElementById("message_container").innerHTML += msg_html;
  scrollToBottom();
  document.getElementById("message-input").value = "";
  document.getElementById("button-submit").innerHTML =
    '<i class="fa fa-circle-o-notch fa-spin"></i> Thinking...';
  document.getElementById("button-submit").disabled = true;


  fetch("http://127.0.0.1:5000/api/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      question: message,
      api_key: localStorage.getItem("apiKey"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      msg_html = '<div class="bot__chat__bubble"><p class="message__text">';
      msg_html += data.output_text;
      msg_html += "</p></div>";
      document.getElementById("message_container").innerHTML += msg_html;
      scrollToBottom();
      document.getElementById("button-submit").innerHTML = "Send";
      document.getElementById("button-submit").disabled = false;
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log(error);
      document.getElementById("button-submit").innerHTML = "Send";
      document.getElementById("button-submit").disabled = false;
    });
};

export async function handleQuestions() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/q-gen");
    const data = await response.json();
    console.log('data', data)
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error)
    return [];
  }
}

export const handleKeyDown = (event, inputRef, breakpoint, handleSubmit) => {
  const windowWidth = window.innerWidth;

  if (event.key === 'Enter' && !event.shiftKey && windowWidth > breakpoint) {
    event.preventDefault();
    const textarea = inputRef.current;
    handleTextAreaHeight(textarea);
    handleSubmit(event);
  }
};

export const handleChange = (event) => {
  const textarea = event.target;
  handleUpdateTextareaHeight(textarea);
};

export const handlePaste = (event, inputRef) => {
  event.preventDefault();
  const pastedText = event.clipboardData.getData('text/plain');
  const trimmedText = pastedText.trim();
  const textarea = inputRef.current;
  textarea.value = textarea.value + trimmedText;
  handleChange(event);
};

export const handleSubmitTextArea = (event, onSubmit, inputRef) => {
  event.preventDefault();
  onSubmit(null, event);
  const textarea = inputRef.current;
  textarea.value = '';
  handleTextAreaHeight(textarea);
  handleChange(event);
};

export const handleTextAreaHeight = (textarea) => {
  textarea.style.height = 'auto';
};

export const handleUpdateTextareaHeight = (textarea) => {
  const lineHeight = handleGetLineHeight(textarea);
  handleTextAreaHeight(textarea);

  if (textarea.value === '') {
    textarea.style.height = `${lineHeight}px`;
  } else {
    textarea.style.height = `${textarea.scrollHeight - lineHeight}px`;
  }
};

export const handleGetLineHeight = (element) => parseFloat(window.getComputedStyle(element).getPropertyValue('line-height'));
