import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { Chart, ChartConfiguration, ChartItem, ScaleOptions } from 'chart.js';

@Component({
  selector: 'app-dashbord',
  standalone: false,
  
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements AfterViewInit{

  @ViewChild('salesChart') salesChartRef!: ElementRef;
  salesChart!: Chart;

  sidebarCollapsed = false;
  showUserDropdown = false;
  
  currentUser = {
    name: 'John Doe',
    email: 'john@example.com'
  };
  
  menuGroups = [
    {
      title: 'Main',
      items: [
        { title: 'Dashboard', link: '/admin/dashbord', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { title: 'Products', link: '/admin/adminProd', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { title: 'Categories', link: '/categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' }
      ]
    },
    {
      title: 'Sales',
      items: [
        { title: 'Orders', link: '/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { title: 'Customers', link: '/customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { title: 'Coupons', link: '/coupons', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' }
      ]
    },
    {
      title: 'Settings',
      items: [
        { title: 'Analytics', link: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { title: 'Settings', link: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
        { title: 'Support', link: '/support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' }
      ]
    }
  ];

  stats = [
    {
      label: 'Total Revenue',
      value: '$45,231',
      trendValue: '+12.5%',
      trendIcon: 'M5 10l7-7m0 0l7 7m-7-7v18',
      trendColor: 'text-green-600',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      label: 'Total Orders',
      value: '1,234',
      trendValue: '+8.2%',
      trendIcon: 'M5 10l7-7m0 0l7 7m-7-7v18',
      trendColor: 'text-green-600',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Products Sold',
      value: '5,678',
      trendValue: '+3.1%',
      trendIcon: 'M5 10l7-7m0 0l7 7m-7-7v18',
      trendColor: 'text-green-600',
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      label: 'Avg. Order Value',
      value: '$36.72',
      trendValue: '-1.8%',
      trendIcon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
      trendColor: 'text-red-600',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    }
  ];

  timePeriods = ['Today', 'Week', 'Month', 'Year'];
  selectedPeriod = 'Month';

  recentOrders = [
    { id: 'ORD-1234', date: new Date('2023-05-15'), amount: 249.99, status: 'Completed' },
    { id: 'ORD-1233', date: new Date('2023-05-14'), amount: 129.99, status: 'Processing' },
    { id: 'ORD-1232', date: new Date('2023-05-14'), amount: 89.99, status: 'Shipped' },
    { id: 'ORD-1231', date: new Date('2023-05-13'), amount: 199.99, status: 'Completed' },
    { id: 'ORD-1230', date: new Date('2023-05-12'), amount: 59.99, status: 'Completed' }
  ];

  topProducts = [
    { 
      name: 'Ultra HD Smart TV', 
      brand: 'Samsung', 
      category: 'Televisions', 
      price: 1299.99, 
      sold: 124, 
      revenue: 161198.76, 
      rating: 4.8, 
      reviews: 86,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Wireless Earbuds Pro', 
      brand: 'Apple', 
      category: 'Audio', 
      price: 249.99, 
      sold: 342, 
      revenue: 85496.58, 
      rating: 4.9, 
      reviews: 215,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Gaming Laptop', 
      brand: 'ASUS', 
      category: 'Computers', 
      price: 1799.99, 
      sold: 78, 
      revenue: 140399.22, 
      rating: 4.7, 
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Smartphone Pro', 
      brand: 'OnePlus', 
      category: 'Phones', 
      price: 899.99, 
      sold: 156, 
      revenue: 140398.44, 
      rating: 4.6, 
      reviews: 93,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Smart Watch 4', 
      brand: 'Xiaomi', 
      category: 'Wearables', 
      price: 199.99, 
      sold: 231, 
      revenue: 46197.69, 
      rating: 4.5, 
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize any data fetching here
  }

  ngAfterViewInit(): void {
    this.initSalesChart();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
  }

  getUserInitials(): string {
    return this.currentUser.name.split(' ').map(n => n[0]).join('');
  }

  selectPeriod(period: string): void {
    this.selectedPeriod = period;
    // In a real app, you would update the chart data here
    this.updateChartData();
  }

  initSalesChart(): void {
    const ctx = this.salesChartRef.nativeElement.getContext('2d') as ChartItem;
    
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales 2023',
          data: [6500, 5900, 8000, 8100, 5600, 5500],
          borderColor: '#6366F1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              //drawBorder: false,
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: (value) => '$' + value
            }
          },
          x: {
            grid: {
              display: false,
              //drawBorder: false
            }
          }
        }
      }
    };

    this.salesChart = new Chart(ctx, config);
  }

  updateChartData(): void {
    // In a real app, this would fetch new data based on the selected period
    if (this.salesChart) {
      // Example of updating data
      const newData = this.selectedPeriod === 'Week' 
        ? [1200, 1900, 1500, 2000, 1800, 2100, 2400]
        : this.selectedPeriod === 'Today'
        ? [100, 150, 200, 180, 220, 250, 300, 350, 400, 450, 500, 550]
        : [6500, 5900, 8000, 8100, 5600, 5500, 4000, 6200, 7800, 8200, 9100, 9500];
      
      this.salesChart.data.datasets[0].data = newData;
      this.salesChart.update();
    }
  }

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  isDashboardRoute(): boolean {
    return this.router.url === '/' || this.router.url === '/dashbord';
  }
}
