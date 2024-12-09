const form = document.getElementById("offerForm");


form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default submission

    const formData = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
      };
    
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          alert('Data saved successfully!');
        } else {
          alert('Failed to save data.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
  });
  