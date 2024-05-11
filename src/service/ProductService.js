export const ProductService = {
    getProductsWithOrdersSmall: () => {
        return new Promise((resolve) => {
            const products = [
                {
                    id: 1000,
                    name: 'Product 1',
                    price: 100,
                    category: 'Category 1',
                    rating: 4,
                    inventoryStatus: 'INSTOCK',
                    image: 'product1.jpg',
                    orders: [
                        { id: 1, customer: 'Customer 1', date: '2024-05-01', amount: 120, status: 'DELIVERED' },
                        { id: 2, customer: 'Customer 2', date: '2024-05-02', amount: 150, status: 'CANCELLED' },
                    ],
                },
                {
                    id: 1001,
                    name: 'Product 2',
                    price: 150,
                    category: 'Category 2',
                    rating: 3,
                    inventoryStatus: 'LOWSTOCK',
                    image: 'product2.jpg',
                    orders: [
                        { id: 3, customer: 'Customer 3', date: '2024-05-03', amount: 100, status: 'PENDING' },
                    ],
                },
                {
                    id: 1002,
                    name: 'Product 3',
                    price: 200,
                    category: 'Category 1',
                    rating: 5,
                    inventoryStatus: 'OUTOFSTOCK',
                    image: 'product3.jpg',
                    orders: [],
                },
            ];
            resolve(products);
        });
    },
};
