document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('inventory-form');
    const inventoryList = document.getElementById('inventory-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('item-name').value;
        const category = document.getElementById('item-category').value;
        const quantity = document.getElementById('item-quantity').value;

        addItem(name, category, quantity);
        form.reset();
    });

    function addItem(name, category, quantity) {
        const item = {
            name,
            category,
            quantity
        };

        const inventory = getInventory();
        inventory.push(item);
        saveInventory(inventory);
        displayInventory();
    }

    function getInventory() {
        const inventory = localStorage.getItem('inventory');
        return inventory ? JSON.parse(inventory) : [];
    }

    function saveInventory(inventory) {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    function displayInventory() {
        const inventory = getInventory();
        inventoryList.innerHTML = '';

        inventory.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.innerHTML = `
                <span>${item.name} (${item.category}) - ${item.quantity}</span>
                <button onclick="removeItem(${index})">Delete</button>
            `;
            inventoryList.appendChild(itemElement);
        });
    }

    window.removeItem = function(index) {
        const inventory = getInventory();
        inventory.splice(index, 1);
        saveInventory(inventory);
        displayInventory();
    };

    displayInventory();
});
