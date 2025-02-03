const { body } = document;
const newCommandDialog = body.querySelector('dialog#new-command');
const newCommandForm = newCommandDialog.querySelector('form');
const codeContainer = body.querySelector('#lines-of-code');

window.onclick = handleClickOnEmpty;
newCommandForm.onsubmit = handleSubmitNewCommand;

function handleSubmitNewCommand(e) {
  const btn = e.submitter;
  
  if (btn.value === "add") {
    const newCommandDescriptor = getData(newCommandForm);

    addCommand(newCommandDescriptor);
  }
}

function handleClickOnEmpty(e) {
  if (isOnHtmlBody(e)) {
    showNewCommandDialog();
  }
}

function addCommand(descriptor) {
  const commandPiece = makeCommandPiece(descriptor);
  const lineOfCode = makeLineOfCode(commandPiece);
  
  codeContainer.append(lineOfCode);
}

function makeLineOfCode(commandPiece) {
  const lineOfCode = document.createElement('li');

  lineOfCode.className = 'line';
  lineOfCode.append(commandPiece);

  return lineOfCode;
}

function makeCommandPiece(descriptor) {
  const codeElement = document.createElement('code');

  preFill(codeElement, descriptor);
  
  return codeElement;
}

function preFill(codeElement, descriptor) {
  const { command } = descriptor;

  switch (command) {
    case "number":
      Object.assign(codeElement, {
        title: 'Number literal',
        className: 'number',
        textContent: "0",
      });
      break;
    case "string":
      Object.assign(codeElement, {
        title: 'String literal',
        className: 'string',
        textContent: '""',
      });
      break;
  }
}

function getData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

function showNewCommandDialog() {
  newCommandDialog.showModal();
}

function isOnHtmlBody(e) {
  return ["HTML", "BODY"].includes(e.target.tagName);
}
