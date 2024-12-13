document.addEventListener('DOMContentLoaded', () => {
    fetch('spaces.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#spaces-table tbody');
            data.forEach(space => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="${space.url}" target="_blank">${space.url}</a></td>
                    <td>${space.title}</td>
                    <td>${space.author}</td>
                    <td>${space.likes}</td>
                    <td>${space.current_hardware}</td>
                    <td>${space.shortDescription}</td>
                `;
                tableBody.appendChild(row);
            });

            // Initialize DataTables
            $('#spaces-table').DataTable({
                "order": [[1, "asc"]], // Order by title in ascending order
                "pageLength": 25, // Number of entries per page
                "lengthMenu": [10, 25, 50, 100], // Options for number of entries per page
                "searching": true, // Enable search functionality
                "paging": true, // Enable pagination
                "info": true, // Show pagination information
                "autoWidth": false // Disable automatic column width calculation
            });
        })
        .catch(error => {
            console.error('Error fetching spaces.json:', error);
            const tableBody = document.querySelector('#spaces-table tbody');
            tableBody.innerHTML = '<tr><td colspan="6">Failed to load spaces. Please try again later.</td></tr>';
        });
});