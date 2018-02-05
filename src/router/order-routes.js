import OrdersPage from '../views/Orders.vue'

/**
 * Components
 */
import OrdersDashboard from '../components/Admin/Orders/Dashboard.vue';
import OrderPaymentLogger from '../components/Admin/Orders/PaymentLogger.vue';
import OrderPackedLogger from '../components/Admin/Orders/PackedLogger.vue';
import OrderShippedLogger from '../components/Admin/Orders/ShippedLogger.vue';
import OrderCancellationLogger from '../components/Admin/Orders/OrderCanceller.vue';


export default {
    path: '/orders',
    component: OrdersPage,
    children: [
        {
            path: '',
            name: 'Orders',
            component: OrdersDashboard,
        },
        {
            path: ':id/payment',
            name: 'OrderPaymentLogger',
            component: OrderPaymentLogger,
        },
        {
            path: ':id/packed',
            name: 'OrderPackedLogger',
            component: OrderPackedLogger,
        },
        {
            path: ':id/shipped',
            name: 'OrderShippedLogger',
            component: OrderShippedLogger,
        },
        {
            path: ':id/cancellation',
            name: 'OrderCancellationLogger',
            component: OrderCancellationLogger,
        }
    ]
};