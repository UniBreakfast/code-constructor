const { body } = document;
const newCommandDialog = body.querySelector('dialog#new-command');
const newCommandForm = newCommandDialog.querySelector('form');
const codeContainer = body.querySelector('#lines-of-code');
const editCommandDialog = body.querySelector('dialog#edit-command');
const editCommandForm = editCommandDialog.querySelector('form');

let thatCodeElement;

const defaults = {
  'number': {
    title: 'Number literal',
    className: 'number',
    textContent: "0",
  },
  'string': {
    title: 'String literal',
    className: 'string',
    textContent: '""',
  },
}

window.onclick = handleClickOnPage;
newCommandForm.onsubmit = handleSubmitNewCommand;
editCommandForm.onsubmit = handleSubmitEditCommand;

function handleClickOnPage(e) {
  if (isOnHtmlBody(e)) {
    showNewCommandDialog();

  } else if (isOnCommandPiece(e)) {
    const codeElement = e.target.closest('code');

    showEditCommandDialog(codeElement);
  }
}

function handleSubmitNewCommand(e) {
  const btn = e.submitter;
  
  if (btn.value === "add") {
    const descriptor = getData(newCommandForm);

    addCommand(descriptor);
  }
}

function handleSubmitEditCommand(e) {
  const btn = e.submitter;

  if (btn.value === 'save') {
    const descriptor = getData(editCommandForm);

    fillAccordingly(thatCodeElement, descriptor);

  } else if (btn.value === 'remove') {
    const lineOfCode = thatCodeElement.closest('li');

    lineOfCode.remove();
  }
}

function isOnCommandPiece(e) {
  return e.target.tagName === "CODE";
}

function showEditCommandDialog(codeElement) {
  thatCodeElement = codeElement;
  editCommandForm.value.value = codeElement.textContent;
  editCommandDialog.showModal();
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

  fillAccordingly(codeElement, descriptor);
  
  return codeElement;
}

function fillAccordingly(codeElement, descriptor) {
  const { command, value } = descriptor;

  Object.assign(codeElement, defaults[command]);

  if (value) codeElement.textContent = value;
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
