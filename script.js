document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('testimonyForm');
    const testimonyList = document.getElementById('testimonyList');

    const quill = new Quill('#testimoni', {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'image'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }]
            ]
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const asal_instansi = document.getElementById('asal_instansi').value;
        const testimoni = quill.root.innerHTML; 
        const foto = document.getElementById('foto').value;

        if (validateData(name, email, asal_instansi, testimoni, foto)) {
            addTestimony(name, email, asal_instansi, testimoni, foto);
            form.reset();
        }
    });

    function validateData(name, email, asal_instansi, testimoni, foto) {
        return true;
    }

    function addTestimony(name, email, asal_instansi, testimoni, foto) {
        const testimonyItem = document.createElement('div');
        testimonyItem.className = 'testimony-item';
        testimonyItem.innerHTML = `
        <div class="testimony-header">
            <div class="profile-picture">
                <img src="${foto}" alt="Profile Picture">
            </div>
            <strong>${name}</strong> (${email}) - ${asal_instansi}
            <button class="delete-button">Hapus</button>
        </div>
        <div class="testimony-content">${testimoni}</div>
        `;
        testimonyList.appendChild(testimonyItem);
    }

    function deleteTestimony(testimonyItem) {
        testimonyItem.remove();
    }

     testimonyList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-button')) {
            const testimonyItem = e.target.closest('.testimony-item');
            if (testimonyItem) {
                deleteTestimony(testimonyItem);
            }
        }
    });

    async function fetchTestimonials() {
        try {
            const response = await fetch('https://6593a0461493b0116068cbfe.mockapi.io/testimoni');
            const data = await response.json();

            // Display testimonials on the page
            data.forEach(testimony => {
                addTestimony(testimony.name, testimony.email, testimony.asal_instansi, testimony.testimoni, testimony.foto);
            });
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    }

    // Fetch testimonials when the page loads
    fetchTestimonials();

});
