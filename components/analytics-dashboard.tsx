"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Package,
  ShoppingCart,
  UserCheck,
  UserX,
  Target,
  Clock,
} from "lucide-react"

// Mock analytics data
const salesData = [
  { month: "Jan", sales: 12000, orders: 145 },
  { month: "Feb", sales: 15000, orders: 178 },
  { month: "Mar", sales: 18000, orders: 210 },
  { month: "Apr", sales: 22000, orders: 245 },
  { month: "May", sales: 25000, orders: 289 },
  { month: "Jun", sales: 28000, orders: 312 },
]

const topProducts = [
  { name: "Wireless Headphones", sales: 1250, revenue: 249875 },
  { name: "Smart Watch", sales: 890, revenue: 266910 },
  { name: "Coffee Maker", sales: 567, revenue: 85005 },
  { name: "Office Chair", sales: 234, revenue: 93566 },
  { name: "Power Bank", sales: 445, revenue: 22225 },
]

const customerSegments = [
  { name: "New Customers", value: 35, color: "#3B82F6" },
  { name: "Returning Customers", value: 45, color: "#10B981" },
  { name: "VIP Customers", value: 20, color: "#F59E0B" },
]

const retentionData = [
  { period: "Week 1", retention: 100 },
  { period: "Week 2", retention: 75 },
  { period: "Week 3", retention: 60 },
  { period: "Week 4", retention: 45 },
  { period: "Month 2", retention: 35 },
  { period: "Month 3", retention: 28 },
]

export function AnalyticsDashboard() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "$128,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: "1,379",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: "2,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Avg Order Value",
      value: "$93.20",
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "text-orange-600",
    },
    {
      title: "Customer Retention",
      value: "68.5%",
      change: "+5.7%",
      trend: "up",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Churn Rate",
      value: "4.2%",
      change: "-1.3%",
      trend: "down",
      icon: UserX,
      color: "text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your business performance and customer insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>{kpi.change}</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
            <CardDescription>Revenue and order volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution of customer types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                  <span className="text-sm text-gray-600">
                    {segment.name} ({segment.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products by sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Retention */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Retention Rate</CardTitle>
            <CardDescription>Customer retention over time periods</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="retention" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Lifetime Value Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
          <CardDescription>Advanced customer analytics and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">$245.80</h3>
              <p className="text-sm text-gray-600">Average Customer LTV</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">18.5 days</h3>
              <p className="text-sm text-gray-600">Avg. Time Between Orders</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">127</h3>
              <p className="text-sm text-gray-600">At-Risk Customers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
