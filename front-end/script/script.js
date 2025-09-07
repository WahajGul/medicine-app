


function renderOrders(orders) {
	const tbody = document.querySelector('#orders-table tbody');
	if (!tbody) return;
	tbody.innerHTML = '';
	orders.forEach(order => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${order.orderId}</td>
			<td>${order.customerId}</td>
			<td>${order.customerName}</td>
			<td>${order.amount}</td>
			<td>${order.payment}</td>
		`;
		tbody.appendChild(tr);
	});
}


function renderCustomers(list) {
	const tbody = document.querySelector('#customer-table tbody');
	if (!tbody) return;
	tbody.innerHTML = '';
	list.forEach(cust => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${cust.id}</td>
			<td>${cust.name}</td>
			<td>${cust.address}</td>
			<td>${cust.phone}</td>
			<td>${cust.email}</td>
			<td>
				<button class="edit-btn">Edit</button>
				<button class="delete-btn">Delete</button>
			</td>
		`;
		tbody.appendChild(tr);
	});
}

// Sample Data
const orders = [
	{ orderId: 101, customerId: 1, customerName: 'Ali', amount: 500, payment: 'Paid' },
	{ orderId: 102, customerId: 2, customerName: 'Sara', amount: 300, payment: 'Pending' },
	{ orderId: 103, customerId: 3, customerName: 'Wahaj', amount: 300, payment: 'Pending' },
];

const customers = [
	{ id: 1, name: 'Ali', address: 'Karachi', phone: '03001234567', email: 'ali@email.com' },
	{ id: 2, name: 'Sara', address: 'Lahore', phone: '03007654321', email: 'sara@email.com' },
];

window.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('#orders-table')) {
		renderOrders(orders);
	}
	if (document.querySelector('#customer-table')) {
		renderCustomers(customers);
	}
});
