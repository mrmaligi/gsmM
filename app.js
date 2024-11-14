document.addEventListener('DOMContentLoaded', () => {
  const phoneNumberInput = document.getElementById('phoneNumber');
  const openButton = document.getElementById('openButton');
  const holdOpenButton = document.getElementById('holdOpenButton');
  const closeButton = document.getElementById('closeButton');
  const editTemplatesButton = document.getElementById('editTemplates');

  // Load saved phone number from localStorage
  phoneNumberInput.value = localStorage.getItem('gsmPhoneNumber') || '';

  // Save phone number when changed
  phoneNumberInput.addEventListener('input', () => {
    localStorage.setItem('gsmPhoneNumber', phoneNumberInput.value);
  });

  // Event listeners for action buttons
  openButton.addEventListener('click', () => {
    sendSMS('openCommand');
  });

  holdOpenButton.addEventListener('click', () => {
    sendSMS('holdOpenCommand');
  });

  closeButton.addEventListener('click', () => {
    sendSMS('closeCommand');
  });

  // Navigate to the Template Page (we'll create this inline)
  editTemplatesButton.addEventListener('click', () => {
    showTemplateEditor();
  });

  // Function to send SMS using sms: URL scheme
  function sendSMS(commandKey) {
    const phoneNumber = phoneNumberInput.value.trim();
    if (!phoneNumber) {
      alert('Please enter the GSM module phone number.');
      return;
    }

    const commandTemplate = localStorage.getItem(commandKey) || getDefaultCommand(commandKey);
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(commandTemplate)}`;
    window.location.href = smsUrl;
  }

  // Default command templates
  function getDefaultCommand(commandKey) {
    const defaultCommands = {
      openCommand: '1234GON##',
      holdOpenCommand: '1234GOT999#',
      closeCommand: '1234GOFF##'
    };
    return defaultCommands[commandKey];
  }

  // Template Editor
  function showTemplateEditor() {
    const templateEditor = document.createElement('div');
    templateEditor.innerHTML = `
      <div class="template-editor">
        <h2>Edit Command Templates</h2>
        <label for="openCommand">Open Command:</label><br>
        <input type="text" id="openCommand" value=""><br><br>

        <label for="holdOpenCommand">Hold Open Command:</label><br>
        <input type="text" id="holdOpenCommand" value=""><br><br>

        <label for="closeCommand">Close Command:</label><br>
        <input type="text" id="closeCommand" value=""><br><br>

        <button id="saveTemplates">Save Templates</button>
        <button id="closeEditor">Close</button>
      </div>
    `;
    document.body.appendChild(templateEditor);

    // Load existing templates
    document.getElementById('openCommand').value = localStorage.getItem('openCommand') || '1234GON##';
    document.getElementById('holdOpenCommand').value = localStorage.getItem('holdOpenCommand') || '1234GOT999#';
    document.getElementById('closeCommand').value = localStorage.getItem('closeCommand') || '1234GOFF##';

    // Save templates
    document.getElementById('saveTemplates').addEventListener('click', () => {
      localStorage.setItem('openCommand', document.getElementById('openCommand').value.trim());
      localStorage.setItem('holdOpenCommand', document.getElementById('holdOpenCommand').value.trim());
      localStorage.setItem('closeCommand', document.getElementById('closeCommand').value.trim());
      alert('Templates saved successfully!');
    });

    // Close editor
    document.getElementById('closeEditor').addEventListener('click', () => {
      document.body.removeChild(templateEditor);
    });
  }
});
