function uploadImage() {
  const fileInput = document.getElementById('uploadInput');
  const file = fileInput.files[0];
  
  if (!file) {
    console.error('No file selected.');
    return;
  }

  // Display file preview
  const imagePreview = document.getElementById('imagePreview');
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = document.createElement('img');
    img.src = event.target.result;
    img.style.maxWidth = '100%';
    imagePreview.innerHTML = '';
    imagePreview.appendChild(img);
  };
  reader.readAsDataURL(file);

  const formData = new FormData();
  formData.append('image', file);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to upload file.');
    }
    return response.text();
  })
  .then(filename => {
    console.log('File uploaded successfully:', filename);
  })
  .catch(error => console.error('Error uploading image:', error));
}
